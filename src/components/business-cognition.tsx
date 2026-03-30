'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const tabsData: TabData[] = [
  {
    id: 'ai-cognition',
    label: 'AI认知',
    icon: <Brain className="w-5 h-5" />,
    title: 'AI的本质与价值',
    description: 'AI不只是工具，而是新一轮财富分配',
  },
  {
    id: 'ai-business',
    label: 'AI商业',
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'AI时代的商业策略',
    description: '掌握AI时代的竞争法则与核心竞争力',
  },
  {
    id: 'ai-application',
    label: 'AI应用',
    icon: <Zap className="w-5 h-5" />,
    title: 'AI应用方法论',
    description: 'AI双轨理论：替代低效与赋能高效',
  },
];

// Tab 视频配置（支持多个视频）
const tabVideos: Record<string, string[]> = {
  'ai-cognition': [
    '//player.bilibili.com/player.html?isOutside=true&aid=116032886800867&bvid=BV1ZjFfz1E9j&cid=35903570119&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116044614141445&bvid=BV1vHFmzCEQv&cid=35953705842&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116032886931612&bvid=BV1BjFfz2E2f&cid=35903506243&p=1',
  ],
  'ai-business': [
    '//player.bilibili.com/player.html?isOutside=true&aid=116032786138923&bvid=BV1c7FbzeEVv&cid=35903045730&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116055351494795&bvid=BV1B9chz6EUh&cid=36001156639&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116055351494370&bvid=BV1z9chz6ELi&cid=36001220113&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116044899288751&bvid=BV1XGFDzjEBK&cid=35955410278&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116044966397690&bvid=BV1TrFSzBEZ2&cid=35955868675&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116032886869788&bvid=BV17jFfz2Eza&cid=35903047627&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116032769360575&bvid=BV1FJFbzAEr1&cid=35902980301&p=1',
  ],
  'ai-application': [
    '//player.bilibili.com/player.html?isOutside=true&aid=116028910600347&bvid=BV1APFszoE1P&cid=35888762345&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116044983305824&bvid=BV1QeFSzVEee&cid=35955871183&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116028893826127&bvid=BV1NFFsz8Ech&cid=35888628952&p=1',
    '//player.bilibili.com/player.html?isOutside=true&aid=116044899354650&bvid=BV1GGFDz7E6X&cid=35955343639&p=1',
  ],
};

export function BusinessCognition() {
  const [activeTab, setActiveTab] = useState('ai-cognition');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const activeVideoUrls = tabVideos[activeTab] || [];

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? activeVideoUrls.length - 1 : prev - 1));
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === activeVideoUrls.length - 1 ? 0 : prev + 1));
  };

  const activeData = tabsData.find(tab => tab.id === activeTab);

  return (
    <section id="cognition" className="py-16 lg:py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区域 - 统一方案1：图标+标签+左右分隔线 */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-px bg-gray-500/50"
            />
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm sm:text-base font-medium text-purple-400 whitespace-nowrap">【AI能力建设】</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-px bg-purple-500/50"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 tracking-widest -mt-[15px] mb-2">AI Capability Building</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight sm:leading-normal">
            AI不只是工具，是全新认知
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
            掌握AI时代的商业认知框架，构建企业AI应用能力
          </p>
        </div>

        {/* Tab 导航 */}
        <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Tab 导航 */}
            <div className="lg:col-span-1 mb-8 lg:mb-0">
            {/* 移动端横向Tab */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2">
                {tabsData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentVideoIndex(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <span className="w-0.5 h-4 bg-purple-500 rounded-full" />
                    )}
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {/* 桌面端竖向Tab */}
            <div className="hidden lg:flex flex-col gap-2">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentVideoIndex(0);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {activeTab === tab.id && (
                    <span className="w-0.5 h-4 bg-purple-500 rounded-full" />
                  )}
                  {tab.icon}
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111] rounded-xl p-4 sm:p-6 lg:p-8"
              >
                {activeData && (
                  <>
                    {/* 标题和描述 */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">
                        {activeData.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {activeData.description}
                      </p>
                    </div>

                    {/* 视频模块 */}
                    <div className="relative w-full bg-[#1a1a1a] rounded-xl">
                      {/* Bilibili 视频容器 - 移动端足够高度显示完整播放器 */}
                      <div className="relative w-full h-[400px] sm:h-[400px] lg:h-auto lg:aspect-video">
                        <iframe
                          key={currentVideoIndex}
                          src={`${activeVideoUrls[currentVideoIndex]}&autoplay=0&muted=0`}
                          scrolling="no"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>

                      {/* 视频切换按钮（仅当有多个视频时显示） */}
                      {activeVideoUrls.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevVideo}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 hover:bg-gray-500/70 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                            title="上一个视频"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleNextVideo}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 hover:bg-gray-500/70 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                            title="下一个视频"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          {/* 视频指示器 */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {activeVideoUrls.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentVideoIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  currentVideoIndex === index
                                    ? 'bg-gray-400 w-5'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
