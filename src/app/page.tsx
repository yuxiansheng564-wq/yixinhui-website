'use client';

import { useState, useEffect } from 'react';
import { Navbar, OPEN_YIXIN_EVENT } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { HeroCarousel } from '@/components/hero-carousel';
import { AICapabilities } from '@/components/ai-capabilities';
import { AIProductivity } from '@/components/ai-productivity';
import { AIApplicationPlatform } from '@/components/ai-application-platform';
import { ASOPScenarios, LatestNews } from '@/components/asop-scenarios';
import { ServiceProcess } from '@/components/service-process';
import { SearchBox } from '@/components/search-box';
import { SearchModal } from '@/components/search-modal';
import { XiaoyiModal } from '@/components/xiaoyi-modal';
import { BookingModal } from '@/components/booking-modal';
import { BusinessCognition } from '@/components/business-cognition';
import FloatingChatWidget, { OPEN_XIAOYI_EVENT } from '@/components/floating-chat-widget';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, Target, Zap } from 'lucide-react';

export default function Home() {
  const [isYixinModalOpen, setIsYixinModalOpen] = useState(false);
  const [isXiaoyiModalOpen, setIsXiaoyiModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // 监听意心之镜的打开事件
  useEffect(() => {
    const handleOpenYixin = () => {
      setIsYixinModalOpen(true);
    };
    
    window.addEventListener(OPEN_YIXIN_EVENT, handleOpenYixin);
    return () => window.removeEventListener(OPEN_YIXIN_EVENT, handleOpenYixin);
  }, []);

  // 监听小意的打开事件
  useEffect(() => {
    const handleOpenXiaoyi = () => {
      setIsXiaoyiModalOpen(true);
    };
    
    window.addEventListener(OPEN_XIAOYI_EVENT, handleOpenXiaoyi);
    return () => window.removeEventListener(OPEN_XIAOYI_EVENT, handleOpenXiaoyi);
  }, []);

  const handleSearch = () => {
    setIsXiaoyiModalOpen(true);
  };

  const handleBookingClick = (service?: string) => {
    setSelectedService(service || '');
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* 意心之镜对话框 */}
      <SearchModal
        isOpen={isYixinModalOpen}
        onClose={() => setIsYixinModalOpen(false)}
      />
      
      {/* 小意对话框 */}
      <XiaoyiModal
        isOpen={isXiaoyiModalOpen}
        onClose={() => setIsXiaoyiModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-48 lg:pb-24">
          <FadeInUp>
            <HeroCarousel />
          </FadeInUp>

          {/* Search Box */}
          <div className="max-w-7xl mx-auto px-6 pt-1 sm:pt-2">
            <FadeInUp delay={100}>
              <SearchBox onOpen={handleSearch} onBookingClick={() => handleBookingClick('专家诊断预约')} />
            </FadeInUp>
          </div>
      </section>

      {/* Latest News / 最新产品 Section */}
      <LatestNews onBookingClick={handleBookingClick} />

      {/* AI Capabilities Section */}
      <AICapabilities />

      {/* ASOP Scenarios Section */}
      <ASOPScenarios onBookingClick={handleBookingClick} />

      {/* Business Cognition Section */}
      <BusinessCognition />

      {/* AI Productivity Section */}
      <AIProductivity onBookingClick={handleBookingClick} />

      {/* Service Process Section */}
      <ServiceProcess onBookingClick={handleBookingClick} />

      {/* AI Application Platform Section */}
      <AIApplicationPlatform onBookingClick={handleBookingClick} />

      {/* CTA Section */}
      <section className="py-16 lg:py-32 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6 leading-tight sm:leading-normal max-w-3xl mx-auto">
              2026年，你不在AI的餐桌上，<br className="sm:hidden" />就在AI的菜单里
            </h2>

            {/* 行动按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/employees">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base rounded-full border-gray-600 text-white hover:bg-gray-800 hover:border-purple-500 transition-all"
                >
                  🚀 我要试用产品
                </Button>
              </Link>
              <Button
                size="lg"
                onClick={() => handleBookingClick('顾问咨询')}
                className="h-14 px-8 text-base rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
              >
                💬 和顾问聊聊我的痛点
              </Button>
            </div>

            {/* 联系方式 */}
            <div className="flex justify-center items-center text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-purple-400">📍</span>
                <span>地址：重庆市渝北区金山意库8栋2-8</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-500">
              <span>© 2026 意心会. All rights reserved.</span>
              <a 
                href="https://beian.miit.gov.cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                渝ICP备2026003734号-1
              </a>
            </div>
            <div className="flex gap-8">
              <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">
                联系我们
              </Link>
              <Link href="/zhizao" className="text-gray-500 hover:text-white transition-colors">
                意心智造
              </Link>
              <Link href="/xueyuan" className="text-gray-500 hover:text-white transition-colors">
                意心学院
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 预约模态框 */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={selectedService}
      />

      {/* 底部智能体聊天浮窗 */}
      <FloatingChatWidget />
    </div>
  );
}
