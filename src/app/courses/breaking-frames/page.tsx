'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/booking-modal';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function BreakingFramesCoursePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const images = [
    { src: '/courses/breaking-frames/screen_01.jpg', alt: 'AI变现破框课' },
    { src: '/courses/breaking-frames/screen_02.jpg', alt: '课程主线' },
    { src: '/courses/breaking-frames/screen_03.jpg', alt: '破框六法 01-03' },
    { src: '/courses/breaking-frames/screen_04.jpg', alt: '破框六法 04-06' },
    { src: '/courses/breaking-frames/screen_05.jpg', alt: '一人公司×AI原生组织' },
    { src: '/courses/breaking-frames/screen_06.jpg', alt: 'Claude Code 实战' },
    { src: '/courses/breaking-frames/screen_07.jpg', alt: '三天后你带走什么' },
    { src: '/courses/breaking-frames/screen_08.jpg', alt: '讲师 狼格拉底' },
    { src: '/courses/breaking-frames/screen_09.jpg', alt: '报名咨询' },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8 sm:py-12">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>

        {/* 图片列表 */}
        <div className="space-y-6">
          {images.map((image, index) => (
            <FadeInUp key={index} delay={index * 0.05}>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  priority={index === 0}
                />
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* 预约咨询按钮 */}
        <FadeInUp delay={0.5}>
          <div className="text-center mt-12">
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium px-8 py-3 rounded-full"
            >
              预约咨询
            </Button>
          </div>
        </FadeInUp>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService="AI变现破框课"
      />
    </main>
  );
}
