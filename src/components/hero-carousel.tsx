'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  title: string;
  subtitle: string;
  hasHighlight?: boolean;
}

const carouselItems: CarouselItem[] = [
  {
    title: '你希望<span class="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">AI</span>为你和组织带来什么改变？',
    subtitle: '想要拥抱<span class="text-purple-400">AI</span>，却不知道从哪里入手？告别"低效探索"，我们帮您找到业务增长的最佳<span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">"AI切入点"</span>。',
    hasHighlight: true,
  },
  {
    title: '想拥抱<span class="text-purple-400">AI</span>却不知道从哪里开始？',
    subtitle: '想要拥抱<span class="text-purple-400">AI</span>，却不知道从哪里入手？告别"低效探索"，我们帮您找到业务增长的最佳<span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">"AI切入点"</span>。',
    hasHighlight: true,
  },
  {
    title: '您有行业认知，但缺少变现的<span class="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">载体</span>？',
    subtitle: '你不需要更多<span className="text-purple-400">AI技术知识</span>，我们为你将"想法"封装为<span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">"商业级AI应用"</span>，助您实现商业转型。',
    hasHighlight: true,
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 自动播放逻辑
  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying]);

  // 停止自动播放
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goToPrevious = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const goToSlide = (index: number) => {
    stopAutoPlay();
    setCurrentIndex(index);
  };

  return (
    <div
      className="text-center w-full mx-auto min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] relative px-6 sm:px-12 lg:px-20 mb-0 sm:mb-3 flex flex-col justify-center"
      onClick={() => goToNext()}
    >
      {/* 背景光晕效果 */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center pt-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight sm:leading-normal">
            <span
              dangerouslySetInnerHTML={{ __html: carouselItems[currentIndex].title }}
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            />
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-5xl mx-auto">
            <span dangerouslySetInnerHTML={{ __html: carouselItems[currentIndex].subtitle }} />
          </p>

          {/* 底部轻量指示器 */}
          <div className="flex justify-center items-center gap-2 mt-[62px] sm:mt-[70px]">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-purple-500 w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
