"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Users, Dumbbell, Award, Target } from 'lucide-react'
// import AnimatedCounter from '@/components/AnimatedCounter'

const blog = () => {

  type CounterProps = {
    end: number
    duration?: number
    suffix?: string
  }

  function AnimatedCounter({ end, duration = 2000, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0)
    const [hasPlayed, setHasPlayed] = useState(false)      // <- fire only once
    const ref = useRef<HTMLSpanElement | null>(null)

    /* Observe visibility ---------------------------------------------------- */
    useEffect(() => {
      const node = ref.current
      if (!node) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasPlayed(true)      // trigger the animation
            obs.disconnect()        // stop observing once fired
          }
        },
        { threshold: 0.5 }          // play when 50 % of element is visible
      )

      obs.observe(node)
      return () => obs.disconnect()
    }, [])                          // run once on mount

    /* Run the counter ------------------------------------------------------- */
    useEffect(() => {
      if (!hasPlayed) return        // don’t animate until visible

      let startTime: number
      let frameId: number

      const animate = (t: number) => {
        if (startTime === undefined) startTime = t
        const progress = Math.min((t - startTime) / duration, 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) frameId = requestAnimationFrame(animate)
      }

      frameId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frameId)
    }, [hasPlayed, end, duration])

    return (
      <span ref={ref} className="inline-block">
        {count.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <div>
      <section id="blog" className="py-20 bg-slate-950 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4 text-white animate-slide-in-up">Fitness Tips & Articles</h2>
            <div className="w-24 h-1 bg-[#3bc1cd] mx-auto mb-4 animate-expand"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
              Stay informed with the latest fitness trends, nutrition advice, and workout tips
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "10 Effective Post-Workout Recovery Strategies",
                excerpt:
                  "Learn the best ways to help your body recover faster and get better results from your training sessions.",
                image: "/landing/artical2.jpg",
                category: "Recovery",
                date: "June 2, 2023",
              },
              {
                title: "Nutrition Myths Debunked by Science",
                excerpt: "We separate fact from fiction when it comes to popular nutrition claims and diet trends.",
                image: "/landing/artical3.jpg",
                category: "Nutrition",
                date: "May 15, 2023",
              },
              {
                title: "Building Mental Strength Through Physical Training",
                excerpt:
                  "Discover how your fitness journey can transform not just your body, but your mind and emotional wellbeing.",
                image: "/landing/artical1.jpg",
                category: "Mindset",
                date: "April 28, 2023",
              },
            ].map((article, index) => (
              <div key={index} className="group animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden rounded-xl mb-4 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4">
                    <Button className="transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-100 bg-[#3bc1cd] hover:bg-[#3bc1cd] text-white">
                      Read More
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#3bc1cd] text-white text-xs font-bold px-2 py-1 rounded transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                    {article.category}
                  </div>
                  <div className="absolute inset-0 border-2 border-[#3bc1cd]/0 group-hover:border-[#3bc1cd]/30 rounded-xl transition-all duration-500"></div>
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-xl transition-all duration-500"
                  />
                </div>
                <p className="text-slate-500 text-sm mb-2 group-hover:text-slate-400 transition-colors duration-300">
                  {article.date}
                </p>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#3bc1cd] transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-950 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4 text-white animate-slide-in-up">Our Impact</h2>
            <div className="w-24 h-1 bg-[#3bc1cd] mx-auto mb-4 animate-expand"></div>
            <p className="text-xl text-slate-400 animate-slide-in-up animate-delay-200">
              Numbers that speak for our commitment to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 50000, suffix: "+", label: "Happy Members", icon: <Users className="h-12 w-12" /> },
              { number: 1000, suffix: "+", label: "Workouts Completed", icon: <Dumbbell className="h-12 w-12" /> },
              { number: 150, suffix: "+", label: "Expert Trainers", icon: <Award className="h-12 w-12" /> },
              { number: 98, suffix: "%", label: "Success Rate", icon: <Target className="h-12 w-12" /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-[#3bc1cd] transition-all duration-500 animate-on-scroll group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto mb-4 text-[#3bc1cd] transition-all duration-500">
                  <div className="relative">
                    {stat.icon}
                    <div className="absolute inset-0 bg-[#3bc1cd]/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 blur-md"></div>
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-white group-hover:text-[#3bc1cd] transition-colors duration-300">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-lg group-hover:text-slate-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default blog
