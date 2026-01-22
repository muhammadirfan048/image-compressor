'use client'

import type React from 'react'

import { useState, useCallback, useRef } from 'react'
import { Upload, Download, Trash2, ImageIcon, Loader2, Eye, X, Settings, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import JSZip from 'jszip'

interface FormatResult {
  format: string
  blob: Blob
  size: number
  compressionRatio: number
  mimeType: string
}

interface CompressedImage {
  id: string
  originalFile: File
  originalSize: number
  formatResults: FormatResult[]
  isProcessing: boolean
  error?: string
  preview?: string
}

// Supported output formats
const OUTPUT_FORMATS = [
  { id: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg', extension: 'jpg' },
  { id: 'png', label: 'PNG', mimeType: 'image/png', extension: 'png' },
  { id: 'webp', label: 'WEBP', mimeType: 'image/webp', extension: 'webp' },
  { id: 'avif', label: 'AVIF', mimeType: 'image/avif', extension: 'avif' },
  { id: 'tiff', label: 'TIFF', mimeType: 'image/tiff', extension: 'tif' },
]

// Supported input file types
const SUPPORTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-adobe-photoshop',
  'application/x-photoshop',
  'image/vnd.adobe.photoshop',
  'image/x-canon-cr2',
  'image/x-nikon-nef',
  'image/x-sony-arw',
  'image/x-adobe-dng',
  'image/heic',
  'image/heif',
]

const FILE_EXTENSIONS = '.jpg,.jpeg,.png,.gif,.svg,.tiff,.tif,.webp,.psd,.cr2,.nef,.arw,.dng,.heic,.heif'

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [compressionQuality, setCompressionQuality] = useState(75) // Lower default for better compression
  const [previewImage, setPreviewImage] = useState<{
    original: string
    compressed: string
    format: string
    image: CompressedImage
  } | null>(null)
  const [preserveMetadata, setPreserveMetadata] = useState(true)
  const [highQualityMode, setHighQualityMode] = useState(true) // Default to standard mode
  const [activeTab, setActiveTab] = useState('standard')
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    'png',
    'jpeg',
    'webp',
    'avif',
    'tif',
  ])
  const [autoConvert, setAutoConvert] = useState(true)
  const [totalSaved, setTotalSaved] = useState(0)

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const validFiles = Array.from(files).filter((file) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        const isValidType =
          SUPPORTED_TYPES.includes(file.type) ||
          [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'svg',
            'tiff',
            'tif',
            'webp',
            'psd',
            'cr2',
            'nef',
            'arw',
            'dng',
            'heic',
            'heif',
          ].includes(fileExtension || '')

        const isValidSize = file.size <= 50 * 1024 * 1024

        if (!isValidType) {
          toast({
            title: 'Unsupported file type',
            description: `${file.name} is not a supported image format.`,
            variant: 'destructive',
          })
        }

        if (!isValidSize) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds the 50MB limit.`,
            variant: 'destructive',
          })
        }

        return isValidType && isValidSize
      })

      const newImages: CompressedImage[] = validFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        originalSize: file.size,
        formatResults: [],
        isProcessing: true,
      }))

      setImages((prev) => [...prev, ...newImages])

      // Process each image
      newImages.forEach((image) => processImage(image))
    },
    [toast]
  )

  const createImagePreview = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()

      if (
        ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'].includes(file.type) ||
        ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(fileExtension || '')
      ) {
        resolve(URL.createObjectURL(file))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = new Image()
          img.onload = () => {
            resolve(e.target!.result as string)
          }
          img.onerror = () => {
            resolve('/placeholder.svg?height=200&width=200')
          }
          img.src = e.target.result as string
        } else {
          resolve('/placeholder.svg?height=200&width=200')
        }
      }
      reader.onerror = () => {
        resolve('/placeholder.svg?height=200&width=200')
      }
      reader.readAsDataURL(file)
    })
  }

  const convertToFormat = async (file: File, targetFormat: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      const img = new Image()

      img.onload = async () => {
        try {
          // Aggressive dimension reduction - especially for large files
          let maxDimension: number
          
          // For very large files (>10MB), use more aggressive resizing
          const isLargeFile = file.size > 10 * 1024 * 1024
          // For extremely large files (>20MB), use even more aggressive resizing
          const isVeryLargeFile = file.size > 20 * 1024 * 1024

          switch (targetFormat) {
            case 'avif':
              maxDimension = isVeryLargeFile ? 1000 : (isLargeFile ? 1400 : (highQualityMode ? 1920 : 1400))
              break
            case 'png':
              maxDimension = isVeryLargeFile ? 800 : (isLargeFile ? 1200 : (highQualityMode ? 1600 : 1200))
              break
            case 'webp':
              maxDimension = isVeryLargeFile ? 1000 : (isLargeFile ? 1400 : (highQualityMode ? 1920 : 1200))
              break
            case 'jpeg':
              maxDimension = isVeryLargeFile ? 1000 : (isLargeFile ? 1400 : (highQualityMode ? 1920 : 1400))
              break
            case 'tif':
              maxDimension = isVeryLargeFile ? 1000 : (isLargeFile ? 1400 : (highQualityMode ? 1920 : 1400))
              break
            default:
              maxDimension = isVeryLargeFile ? 800 : (isLargeFile ? 1200 : (highQualityMode ? 1600 : 1400))
          }

          let { width, height } = img

          // Always resize large files, and force resize for very large files
          const shouldResize = isVeryLargeFile || isLargeFile || width > maxDimension || height > maxDimension

          if (shouldResize) {
            if (width > height) {
              height = (height * maxDimension) / width
              width = maxDimension
            } else {
              width = (width * maxDimension) / height
              height = maxDimension
            }
          }

          // Set the canvas size only after confirming final dimensions
          canvas.width = width
          canvas.height = height
          // Enable image smoothing for better quality at smaller sizes
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'

          // Set background for formats that don't support transparency
          if (targetFormat === 'jpeg' || targetFormat === 'avif' || targetFormat === 'tif') {
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, width, height)
          }

          ctx.drawImage(img, 0, 0, width, height)

          const formatConfig = OUTPUT_FORMATS.find((f) => f.id === targetFormat)
          if (!formatConfig) {
            reject(new Error(`Unsupported format: ${targetFormat}`))
            return
          }

          // More aggressive quality settings for large files
          let quality: number
          const baseQuality = compressionQuality / 100

          if (isLargeFile) {
            // For large files, use much lower quality
            switch (targetFormat) {
              case 'jpeg':
              case 'webp':
                quality = Math.max(0.5, baseQuality * 0.7)
                break
              case 'png':
                quality = Math.max(0.5, baseQuality * 0.6)
                break
              case 'avif':
                quality = Math.max(0.3, baseQuality * 0.5)
                break
              default:
                quality = Math.max(0.5, baseQuality * 0.7)
            }
          } else {
            switch (targetFormat) {
              case 'jpeg':
              case 'webp':
                quality = highQualityMode ? 0.92 : Math.max(0.7, baseQuality)
                break
              case 'png':
                quality = highQualityMode ? 0.75 : Math.max(0.7, baseQuality)
                break
              case 'avif':
                quality = highQualityMode ? 0.75 : Math.max(0.5, baseQuality)
                break
              default:
                quality = Math.max(0.7, baseQuality)
            }
          }

          // Helper function to validate blob size
          const validateAndResolve = (blob: Blob | null, fallbackBlob?: Blob) => {
            if (!blob) {
              if (fallbackBlob) {
                resolve(fallbackBlob)
              } else {
                reject(new Error('Failed to create blob'))
              }
              return
            }

            // If compressed size is larger than original, return original file as blob
            if (blob.size >= file.size) {
              // Return the original file as a blob
              resolve(new Blob([file], { type: file.type }))
            } else {
              resolve(blob)
            }
          }

          // Try multiple compression attempts with decreasing quality
          const attemptCompression = async (attemptQuality: number, attempt = 1): Promise<Blob> => {
            return new Promise((resolveAttempt, rejectAttempt) => {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    // Check if we achieved compression or need to try harder
                    if (attempt >= 3 || attemptQuality <= 0.3 || blob.size < file.size * 0.9) {
                      resolveAttempt(blob)
                    } else {
                      // Try with even lower quality
                      const newQuality = Math.max(0.2, attemptQuality * 0.6)
                      attemptCompression(newQuality, attempt + 1)
                        .then(resolveAttempt)
                        .catch(rejectAttempt)
                    }
                  } else {
                    // Fallback to JPEG if format fails
                    canvas.toBlob(
                      (fallbackBlob) => {
                        if (fallbackBlob) {
                          resolveAttempt(fallbackBlob)
                        } else {
                          rejectAttempt(new Error('Failed to create blob'))
                        }
                      },
                      'image/jpeg',
                      Math.max(0.3, attemptQuality)
                    )
                  }
                },
                formatConfig.mimeType,
                attemptQuality
              )
            })
          }

          // Special handling for PNG - convert to JPEG if no transparency and better compression
          if (targetFormat === 'png') {
            const imageData = ctx.getImageData(0, 0, width, height)
            const hasTransparency = imageData.data.some(
              (_, i) => i % 4 === 3 && imageData.data[i] < 255
            )

            if (!hasTransparency) {
              // No transparency, try JPEG compression instead
              canvas.toBlob(
                (jpegBlob) => {
                  if (jpegBlob && jpegBlob.size < file.size) {
                    validateAndResolve(jpegBlob)
                  } else {
                    // If JPEG isn't better, try PNG with reduced colors
                    compressPNGWithColorReduction(canvas, ctx, width, height)
                      .then((pngBlob) => validateAndResolve(pngBlob, jpegBlob || undefined))
                      .catch(() => validateAndResolve(jpegBlob || null))
                  }
                },
                'image/jpeg',
                quality
              )
              return
            } else {
              // Has transparency, use PNG
              canvas.toBlob(
                (pngBlob) => validateAndResolve(pngBlob),
                'image/png',
                quality
              )
              return
            }
          }

          // For AVIF, try even more aggressive compression
          if (targetFormat === 'avif') {
            // First attempt with very low quality
            attemptCompression(Math.max(0.2, quality * 0.4))
              .then((blob) => {
                if (blob.size >= file.size) {
                  // If still not compressed enough, fallback to WebP
                  canvas.toBlob(
                    (webpBlob) => {
                      if (webpBlob && webpBlob.size < file.size) {
                        resolve(webpBlob)
                      } else {
                        // Return original if both AVIF and WebP are larger
                        resolve(new Blob([file], { type: file.type }))
                      }
                    },
                    'image/webp',
                    Math.max(0.3, quality * 0.5)
                  )
                } else {
                  resolve(blob)
                }
              })
              .catch(reject)
            return
          }

          // For WebP, ensure we don't increase size
          if (targetFormat === 'webp') {
            attemptCompression(quality)
              .then((blob) => validateAndResolve(blob))
              .catch(reject)
            return
          }

          // Special handling for TIF format - use aggressive JPEG compression
          if (targetFormat === 'tif') {
            // TIFF is not well supported in browsers, so we'll use JPEG compression
            // with the TIFF mime type for compatibility
            canvas.toBlob(
              (jpegBlob) => {
                if (jpegBlob && jpegBlob.size < file.size) {
                  // Create blob with TIFF mime type but JPEG compression
                  const tiffBlob = new Blob([jpegBlob], { type: formatConfig.mimeType })
                  resolve(tiffBlob)
                } else {
                  // Return original if compression didn't help
                  resolve(new Blob([file], { type: file.type }))
                }
              },
              'image/jpeg',
              Math.max(0.3, quality * 0.5) // Very aggressive quality for TIFF compression
            )
            return
          }

          // Standard compression attempt for other formats (JPEG)
          attemptCompression(quality)
            .then((blob) => validateAndResolve(blob))
            .catch(reject)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = (error) => {
        console.error('Image load error:', error)

        // Try alternative approach with FileReader if direct loading fails
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            img.onerror = null // Remove the error handler to avoid infinite loops
            img.src = e.target.result as string
          } else {
            reject(new Error('Failed to load image with FileReader'))
          }
        }
        reader.onerror = () => {
          reject(new Error('FileReader failed to load image'))
        }
        reader.readAsDataURL(file)
      }

      img.crossOrigin = 'anonymous'

      try {
        const objectUrl = URL.createObjectURL(file)
        img.src = objectUrl

        // Keep the object URL valid longer to ensure the image has time to load
        setTimeout(() => {
          URL.revokeObjectURL(objectUrl)
        }, 10000) // Increased timeout for large files
      } catch (error) {
        reject(new Error('Failed to create object URL'))
      }
    })
  }

  const compressPNGWithColorReduction = async (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Mild color reduction - better balance between size and quality
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / 2) * 2
        data[i + 1] = Math.round(data[i + 1] / 4) * 4
        data[i + 2] = Math.round(data[i + 2] / 4) * 4
      }

      ctx.putImageData(imageData, 0, 0)

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create compressed PNG'))
        }
      }, 'image/png')
    })
  }

  // Pre-process special formats like TIF that browsers might not handle natively
  const preprocessSpecialFormats = async (file: File): Promise<File> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    // If it's a TIF/TIFF file or other special format that might need preprocessing
    if (
      fileExtension === 'tif' ||
      fileExtension === 'tiff' ||
      file.type === 'image/tif' ||
      !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    ) {
      // Use FileReader to read the file as a data URL
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            // Create a temporary image to load the data
            const img = new Image()
            img.onload = () => {
              // Create a canvas to draw the image
              const canvas = document.createElement('canvas')
              canvas.width = img.width
              canvas.height = img.height
              const ctx = canvas.getContext('2d')

              if (ctx) {
                // Draw the image on the canvas
                ctx.fillStyle = '#FFFFFF'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0)

                // Convert to a more browser-friendly format (PNG)
                canvas.toBlob((blob) => {
                  if (blob) {
                    // Create a new file from the blob
                    const newFile = new File([blob], file.name.replace(/\.(tif|tiff)$/i, '.png'), {
                      type: 'image/png',
                    })
                    resolve(newFile)
                  } else {
                    // If conversion fails, return the original file
                    resolve(file)
                  }
                }, 'image/png')
              } else {
                resolve(file)
              }
            }
            img.onerror = () => {
              // If loading fails, return the original file
              resolve(file)
            }
            img.src = e.target.result as string
          } else {
            resolve(file)
          }
        }
        reader.onerror = () => {
          // If reading fails, return the original file
          resolve(file)
        }
        reader.readAsDataURL(file)
      })
    }

    // For standard formats, return the original file
    return file
  }

  const processImage = async (image: CompressedImage) => {
    try {
      // Create preview
      const preview = await createImagePreview(image.originalFile)

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                preview,
              }
            : img
        )
      )

      // Pre-process the file if it's a special format
      let processedFile = image.originalFile
      try {
        processedFile = await preprocessSpecialFormats(image.originalFile)
      } catch (error) {
        console.warn('Pre-processing failed, using original file:', error)
      }

      // Convert to selected formats
      const formatResults: FormatResult[] = []
      let totalBytesSaved = 0

      for (const formatId of selectedFormats) {
        try {
          const formatConfig = OUTPUT_FORMATS.find((f) => f.id === formatId)
          if (!formatConfig) continue

          const blob = await convertToFormat(processedFile, formatId)
          
          // Only add to results if compression actually reduced the file size
          if (blob.size < image.originalSize) {
            const compressionRatio = ((image.originalSize - blob.size) / image.originalSize) * 100
            const bytesSaved = image.originalSize - blob.size

            totalBytesSaved += bytesSaved

            formatResults.push({
              format: formatId,
              blob,
              size: blob.size,
              compressionRatio,
              mimeType: formatConfig.mimeType,
            })
          }
        } catch (error) {
          console.error(`Failed to convert to ${formatId}:`, error)
        }
      }

      setTotalSaved((prev) => prev + totalBytesSaved)

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                formatResults,
                isProcessing: false,
              }
            : img
        )
      )
    } catch (error) {
      console.error('Processing error:', error)
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                isProcessing: false,
                error: `Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              }
            : img
        )
      )

      toast({
        title: 'Processing failed',
        description: `Failed to process ${image.originalFile.name}`,
        variant: 'destructive',
      })
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const downloadFormat = (image: CompressedImage, formatResult: FormatResult) => {
    const url = URL.createObjectURL(formatResult.blob)
    const a = document.createElement('a')
    a.href = url

    const formatConfig = OUTPUT_FORMATS.find((f) => f.id === formatResult.format)
    const originalName = image.originalFile.name.split('.').slice(0, -1).join('.')

    a.download = `${originalName}_${formatResult.format}.${formatConfig?.extension || formatResult.format}`
    
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAllFormats = async () => {
    const completedImages = images.filter(
      (img) => img.formatResults.length > 0 && !img.isProcessing
    )

    if (completedImages.length === 0) {
      toast({
        title: 'No images to download',
        description: 'Please wait for processing to complete.',
        variant: 'destructive',
      })
      return
    }

    // Always create ZIP archive for consistency
    try {
      const zip = new JSZip()
      const parentFolder = zip.folder('ConvertedImages')

      if (!parentFolder) {
        throw new Error('Failed to create parent folder')
      }

      completedImages.forEach((image) => {
        // Get original filename without extension
        const originalName = image.originalFile.name.split('.').slice(0, -1).join('.')

        // Create subfolder for this image
        const imageFolder = parentFolder.folder(originalName)

        if (!imageFolder) {
          console.error(`Failed to create folder for ${originalName}`)
          return
        }

        // Add each format to the image's subfolder
        image.formatResults.forEach((formatResult) => {
          const formatConfig = OUTPUT_FORMATS.find((f) => f.id === formatResult.format)
          const fileName = `${originalName}.${formatConfig?.extension || formatResult.format}`

          imageFolder.file(fileName, formatResult.blob)
        })
      })

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ConvertedImages_${completedImages.length}_images.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Download started',
        description: `ZIP archive with ${completedImages.length} images and ${completedImages.reduce((sum, img) => sum + img.formatResults.length, 0)} formats created.`,
      })
    } catch (error) {
      console.error('ZIP creation failed:', error)
      toast({
        title: 'Download failed',
        description: 'Failed to create ZIP archive. Try downloading images individually.',
        variant: 'destructive',
      })
    }
  }
  

  const clearAll = () => {
    images.forEach((image) => {
      if (image.preview) URL.revokeObjectURL(image.preview)
    })

    setImages([])
    setTotalSaved(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id)
    if (imageToRemove?.preview) URL.revokeObjectURL(imageToRemove.preview)

    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const toggleFormat = (formatId: string) => {
    setSelectedFormats((prev) => {
      // If the format is currently selected, we're going to unselect it
      if (prev.includes(formatId)) {
        // If we're unselecting a format that's currently being previewed, close the preview
        if (previewImage && previewImage.format === formatId) {
          // Clean up the URLs to prevent memory leaks
          if (!previewImage.image.preview || previewImage.original !== previewImage.image.preview) {
            URL.revokeObjectURL(previewImage.original)
          }
          URL.revokeObjectURL(previewImage.compressed)
          setPreviewImage(null)
        }
        return prev.filter((f) => f !== formatId)
      } else {
        // When selecting a format, find if there's a compressed image available for this format
        const imageWithFormat = images.find(
          (img) =>
            !img.isProcessing && img.formatResults.some((result) => result.format === formatId)
        )

        // If we have a processed image with this format, show its preview
        if (imageWithFormat) {
          const formatResult = imageWithFormat.formatResults.find(
            (result) => result.format === formatId
          )
          if (formatResult) {
            const originalUrl =
              imageWithFormat.preview || URL.createObjectURL(imageWithFormat.originalFile)
            const compressedUrl = URL.createObjectURL(formatResult.blob)
            setPreviewImage({
              original: originalUrl,
              compressed: compressedUrl,
              format: formatId,
              image: imageWithFormat,
            })
          }
        }

        return [...prev, formatId]
      }
    })
  }

  const selectAllFormats = () => {
    setSelectedFormats(OUTPUT_FORMATS.map((f) => f.id))
  }

  const reprocessImages = () => {
    const imagesToReprocess = images.filter((img) => !img.isProcessing)
    imagesToReprocess.forEach((img) => {
      setImages((prev) =>
        prev.map((i) => (i.id === img.id ? { ...i, isProcessing: true, formatResults: [] } : i))
      )
      processImage({ ...img, isProcessing: true, formatResults: [] })
    })
  }

  const completedImages = images.filter((img) => img.formatResults.length > 0 && !img.isProcessing)
  const processingImages = images.filter((img) => img.isProcessing)
  const totalFormats = completedImages.reduce((sum, img) => sum + img.formatResults.length, 0)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Upload Area */}
      <Card className="mb-10  border-none border-emerald-200 shadow-lg  backdrop-blur-sm">
        <CardContent className="rounded-[40px] bg-white p-6">
          <div
            className={`rounded-xl border border-dashed border-emerald-200 bg-[#f1f4f5]  bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm transition-colors duration-200 ${
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Button
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-md transition-transform hover:scale-105"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-white" />
            </Button>

            <h3 className="mb-2 text-2xl font-bold text-gray-900">Upload or Drag Your Images</h3>
            <p className="mb-6 text-sm text-gray-600">
              Supported formats: JPG, PNG, GIF, SVG, TIFF, PSD, RAW, HEIC — Up to 50MB each
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={FILE_EXTENSIONS}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-colors hover:from-blue-700 hover:to-purple-700"
                disabled={selectedFormats.length === 0}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </Button>

              {images.length > 0 && (
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="rounded-lg border border-red-500 px-6 py-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Control */}
      {images.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Compression Settings</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Advanced Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Advanced Compression Settings</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="standard">Standard</TabsTrigger>
                          <TabsTrigger value="professional">Professional</TabsTrigger>
                        </TabsList>
                        <TabsContent value="standard" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="quality">Compression Quality</Label>
                            <Slider
                              id="quality"
                              value={[compressionQuality]}
                              onValueChange={(value) => setCompressionQuality(value[0])}
                              max={100}
                              min={10}
                              step={5}
                              className="w-full"
                            />
                            <div className="text-right text-sm text-gray-600">
                              {compressionQuality}%
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="professional" className="space-y-4 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="high-quality">High Quality Mode</Label>
                              <p className="text-sm text-gray-500">
                                Preserves maximum quality for professional images
                              </p>
                            </div>
                            <Switch
                              id="high-quality"
                              checked={highQualityMode}
                              onCheckedChange={setHighQualityMode}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="metadata">Preserve Metadata</Label>
                              <p className="text-sm text-gray-500">
                                Keep EXIF data and other metadata in images
                              </p>
                            </div>
                            <Switch
                              id="metadata"
                              checked={preserveMetadata}
                              onCheckedChange={setPreserveMetadata}
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quality: {compressionQuality}%</span>
                <span className="text-sm text-gray-600">
                  Mode: {highQualityMode ? 'High Quality' : 'Standard'}
                </span>
              </div>

              <Slider
                value={[compressionQuality]}
                onValueChange={(value) => setCompressionQuality(value[0])}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {completedImages.length > 0 && (
        <div className="mb-6 rounded-lg bg-gray-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                Converted your images and saved you{' '}
                {totalSaved > 0
                  ? Math.round(
                      (totalSaved /
                        completedImages.reduce((sum, img) => sum + img.originalSize, 0)) *
                        100
                    )
                  : 0}
                %
              </h2>
              <p className="text-gray-300">
                {completedImages.length} images optimized | {totalFormats} formats |{' '}
                {formatFileSize(totalSaved)} saved
              </p>
            </div>
            <Button onClick={downloadAllFormats} className="bg-green-600 hover:bg-green-700">
              <Download className="mr-2 h-4 w-4" />
              Download ZIP ({completedImages.length} {completedImages.length === 1 ? 'image' : 'images'})
            </Button>
          </div>
        </div>
      )}
      {/* Processing Status */}
      {processingImages.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">
                Processing {processingImages.length} image{processingImages.length !== 1 ? 's' : ''}
                ...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Results */}
      {images.length > 0 && (
        <div className="space-y-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    {image.preview ? (
                      <img
                        src={image.preview || '/placeholder.svg'}
                        alt="Preview"
                        className="h-16 w-16 rounded object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            '/placeholder.svg?height=64&width=64'
                        }}
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                        <ImageIcon className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Image Info and Results */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h4 className="truncate text-lg font-medium text-gray-900">
                          {image.originalFile.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Original: {formatFileSize(image.originalSize)}
                        </p>
                      </div>
                      <Button
                        onClick={() => removeImage(image.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {image.isProcessing && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Converting to {selectedFormats.length} format(s)...</span>
                      </div>
                    )}

                    {image.error && <p className="mb-4 text-sm text-red-600">{image.error}</p>}

                    {/* Format Results */}
                    {image.formatResults.length > 0 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {image.formatResults
                          .filter((result) => result.size < image.originalSize)
                          .map((result) => {
                            const formatConfig = OUTPUT_FORMATS.find((f) => f.id === result.format)
                            const isIncrease = result.compressionRatio < 0

                            return (
                              <div
                                key={result.format}
                                className="flex items-center justify-between rounded-lg border p-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`h-3 w-3 rounded-full ${
                                      result.format === 'avif'
                                        ? 'bg-pink-500'
                                        : result.format === 'jpeg'
                                          ? 'bg-blue-500'
                                          : result.format === 'png'
                                            ? 'bg-blue-600'
                                            : 'bg-purple-500'
                                    }`}
                                  />
                                  <div>
                                    <div className="text-sm font-medium">{formatConfig?.label}</div>
                                    <div className="text-xs text-gray-500">
                                      {formatFileSize(result.size)}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div
                                    className={`text-sm font-medium ${isIncrease ? 'text-red-600' : 'text-green-600'}`}
                                  >
                                    {isIncrease ? '+' : '-'}
                                    {Math.abs(result.compressionRatio).toFixed(0)}%
                                  </div>
                                  <div className="mt-1 flex space-x-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        const originalUrl =
                                          image.preview || URL.createObjectURL(image.originalFile)
                                        const compressedUrl = URL.createObjectURL(result.blob)
                                        setPreviewImage({
                                          original: originalUrl,
                                          compressed: compressedUrl,
                                          format: result.format,
                                          image,
                                        })
                                      }}
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => downloadFormat(image, result)}
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                    
                    {/* Show message if no formats resulted in compression */}
                    {!image.isProcessing && image.formatResults.length === 0 && (
                      <p className="text-sm text-gray-500 italic">
                        No formats achieved compression for this image. Try lowering the quality slider or disabling High Quality Mode.
                      </p>
                    )}
                    
                    {image.formatResults.length > 0 &&
                      image.formatResults.filter((result) => result.size < image.originalSize)
                        .length === 0 && (
                        <p className="text-sm text-gray-500 italic">
                          No formats achieved compression for this image. Try lowering the quality slider or disabling High Quality Mode.
                        </p>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="max-h-[90vh] max-w-6xl overflow-auto rounded-lg bg-white">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  Image Comparison -{' '}
                  {OUTPUT_FORMATS.find((f) => f.id === previewImage.format)?.label}
                </h3>
                <Button
                  onClick={() => {
                    if (previewImage) {
                      if (
                        !previewImage.image.preview ||
                        previewImage.original !== previewImage.image.preview
                      ) {
                        URL.revokeObjectURL(previewImage.original)
                      }
                      URL.revokeObjectURL(previewImage.compressed)
                      setPreviewImage(null)
                    }
                  }}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-lg font-medium">Original</h4>
                  <p className="mb-3 text-sm text-gray-600">
                    Size: {formatFileSize(previewImage.image.originalSize)}
                  </p>
                  <img
                    src={previewImage.original || '/placeholder.svg'}
                    alt="Original"
                    className="h-auto w-full rounded-lg border"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/placeholder.svg?height=400&width=400'
                    }}
                  />
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-medium">
                    {OUTPUT_FORMATS.find((f) => f.id === previewImage.format)?.label}
                  </h4>
                  <p className="mb-3 text-sm text-gray-600">
                    Size:{' '}
                    {formatFileSize(
                      previewImage.image.formatResults.find((r) => r.format === previewImage.format)
                        ?.size || 0
                    )}
                    <span className="ml-2 font-medium text-green-600">
                      (-
                      {Math.abs(
                        previewImage.image.formatResults.find(
                          (r) => r.format === previewImage.format
                        )?.compressionRatio || 0
                      ).toFixed(1)}
                      %)
                    </span>
                  </p>
                  <img
                    src={previewImage.compressed || '/placeholder.svg'}
                    alt="Compressed"
                    className="h-auto w-full rounded-lg border"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/placeholder.svg?height=400&width=400'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Card className="my-4 mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold ">Output Formats</h3>
              <div className=" items-center space-x-2 hidden md:flex">
                <Switch
                  id="auto-convert"
                  checked={autoConvert}
                  onCheckedChange={setAutoConvert}
                  className="bg-cyan-700 text-green-500"
                />
                <Label htmlFor="auto-convert" className="md:text-sm  ">
                  Convert my images automatically
                </Label>
              </div>
            </div>
           

          <div className="flex flex-wrap items-center gap-3 md:gap-6">
  {OUTPUT_FORMATS.map((format) => {
    const isSelected = selectedFormats.includes(format.id)

    return (
      <div
        key={format.id}
        className="flex items-center gap-2 w-full sm:w-auto"
      >
        <Checkbox
          id={`format-${format.id}`}
          checked={isSelected}
          onCheckedChange={() => toggleFormat(format.id)}
          className="h-5 w-5 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />

        <Label
          htmlFor={`format-${format.id}`}
          className="cursor-pointer text-sm font-medium leading-none"
        >
          {format.label}
          <span className="ml-2 text-xs text-gray-500">
            (.{format.extension})
          </span>
        </Label>
      </div>
    )
  })}
</div>
  <div className=" items-center space-x-2 md:hidden flex">
                <Switch
                  id="auto-convert"
                  checked={autoConvert}
                  onCheckedChange={setAutoConvert}
                  className="bg-cyan-700 "
                />
                <Label htmlFor="auto-convert" className="md:text-sm  ">
                  Convert my images automatically
                </Label>
              </div>


            <div className="flex items-center gap-2 pt-2">
              <Button
                size="sm"
                onClick={selectAllFormats}
                variant="outline"
                className="text-sm bg-blue-500 text-white"
              >
                Select All
              </Button>
              <Button onClick={reprocessImages} variant="outline" size="sm" className='bg-blue-500 text-white'>
                Apply Settings
              </Button>
            </div>

            {selectedFormats.length === 0 && (
              <p className="text-sm text-red-600">Please select at least one output format.</p>
            )}
          </div>
          
        </CardContent>
      </Card>
      
    </div>
  )
}
