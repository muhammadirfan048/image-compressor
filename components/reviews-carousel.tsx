'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Review {
  id: string
  name: string
  username: string
  avatar: string
  rating: number
  title: string
  content: string
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahj_design',
    avatar: '/placeholder.svg?height=40&width=40&text=SJ',
    rating: 5,
    title: 'Best customer service!',
    content:
      'Not only does this company provide amazing tools, their support is also great! Everything is simple and smooth because of the very responsive and super supportive staff. Thank you so much.',
  },
  {
    id: '2',
    name: 'Carlos Azuaje',
    username: '@carlosazuaje',
    avatar: '/placeholder.svg?height=40&width=40&text=CA',
    rating: 5,
    title: 'Amazingly good from start to finish',
    content:
      'I would personally put 5 stars for the support I got for the questions and problems I encountered when setting up the plugin. I have not used this plugin for a long time so I am not able to give a detailed review.',
  },
  {
    id: '3',
    name: 'Alex Chen',
    username: '@datechmaster',
    avatar: '/placeholder.svg?height=40&width=40&text=AC',
    rating: 5,
    title: 'The best image optimizer ',
    content:
      'We use this on all clients websites because of how user friendly it is. The pro version is worth it because it is inexpensive and the quality of compression is exceptional. The amount of time it saves us is incredible.',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    username: '@emilydev',
    avatar: '/placeholder.svg?height=40&width=40&text=ER',
    rating: 5,
    title: 'Incredible outcomes with compression.',
    content:
      'This tool improves our workflow greatly. The image quality is still superb, yet file sizes are much smaller. E-commerce sites will love it!',
  },
  {
    id: '5',
    name: 'Michael Thompson',
    username: '@mikethompson',
    avatar: '/placeholder.svg?height=40&width=40&text=MT',
    rating: 5,
    title: 'Reliable and fast',
    content:
      'Our photography business has greatly benefited from the bulk processing feature. The results are always consistent, along with the ultra-fast compression speeds. Highly recommended!',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    username: '@lisawang_photo',
    avatar: '/placeholder.svg?height=40&width=40&text=LW',
    rating: 5,
    title: 'Perfect for photographers',
    content:
      'This compressor is ideal for photographers who expect not only to maintain image quality, but also to meet stringent file size limits. It exceeds all expectations!',
  },
  {
    id: '7',
    name: 'David Miller',
    username: '@davidmiller',
    avatar: '/placeholder.svg?height=40&width=40&text=DM',
    rating: 5,
    title: 'Very impressive',
    content:
      'For a developer, these tools are a must. The time savings are impressive with numerous hours of manual effort eliminated. One click batch processing is incredibly seamless with consistent quality.',
  },
  {
    id: '8',
    name: 'Jessica Brown',
    username: '@jessicabrown',
    avatar: '/placeholder.svg?height=40&width=40&text=JB',
    rating: 5,
    title: 'Outstanding quality',
    content:
      'It is exceptional how well the files can be compressed. I can reduce the size of files by up to 80% and the quality will not be affected in any noticeable way. This has greatly improved our website speed!',
  },
  {
    id: '9',
    name: 'Ryan Taylor',
    username: '@ryantaylor',
    avatar: '/placeholder.svg?height=40&width=40&text=RT',
    rating: 5,
    title: 'Game changer for our business',
    content:
      'Ever since I started using this particular compressor, my website loads three times faster. Customer engagement has greatly improved and so has our SEO rank position. Absolutely amazing!',
  },
]

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [cardsPerSlide, setCardsPerSlide] = useState(3)

  // Handle responsiveness
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 640) {
        setCardsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2)
      } else {
        setCardsPerSlide(3)
      }
    }

    updateCardsPerSlide()
    window.addEventListener('resize', updateCardsPerSlide)
    return () => window.removeEventListener('resize', updateCardsPerSlide)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex, cardsPerSlide])

  const totalSlides = Math.ceil(reviews.length / cardsPerSlide)

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const getVisibleReviews = () => {
    const start = currentIndex * cardsPerSlide
    return reviews.slice(start, start + cardsPerSlide)
  }

  return (
    <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
            Effective image compression makes users happy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Join the community of thousands who trust our image compression technology.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 z-10 translate-x-4 -translate-y-1/2 border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Reviews */}
          <div className="overflow-hidden">
            <div
              className={`grid gap-8 transition-all duration-700 ease-in-out ${
                cardsPerSlide === 1
                  ? 'grid-cols-1'
                  : cardsPerSlide === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
              } ${isTransitioning ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'}`}
            >
              {getVisibleReviews().map((review, index) => (
                <Card
                  key={review.id}
                  className="p-6 border border-blue-100 bg-white shadow-md transition hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-cyan-500 fill-current" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{review.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-4">{review.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {review.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.username}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-blue-500'
                    : 'w-3 bg-blue-200 hover:w-5 hover:bg-blue-300'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

