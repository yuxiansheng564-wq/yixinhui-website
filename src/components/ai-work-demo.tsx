'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronDown, ChevronUp, Lightbulb, Calendar } from 'lucide-react';
import { BookingModal } from './booking-modal';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  videoUrl: string;
  type?: 'local' | 'bilibili'; // 视频类型：本地视频或B站视频
  embedCode?: string; // B站嵌入代码
}

interface VideoCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  videos: Video[];
}

const videoCategories: VideoCategory[] = [
  {
    id: 'weekly-tips',
    name: '本周AI-tips',
    icon: <Lightbulb className="w-5 h-5" />,
    videos: [
      {
        id: 'tip-1',
        title: '狼哥数字人演示',
        description: '演示数字人如何在实际工作中应用',
        duration: '5:30',
        thumbnail: '/videos/AI开放日/数字人/狼哥数字人封面.jpg',
        videoUrl: '/videos/狼哥数字人.mp4'
      },
      {
        id: 'tip-5',
        title: 'AI销售管理如何做？',
        description: '内训偷拍，从第一性原理出发：销售的核心是信任交换，而非简单的话术模板',
        duration: '5:00',
        videoUrl: '',
        type: 'bilibili',
        embedCode: '//player.bilibili.com/player.html?isOutside=true&aid=116020874382329&bvid=BV14JFqzNESv&cid=35850619539&p=1'
      },
      {
        id: 'tip-2',
        title: 'AI辅助海报设计',
        description: '使用AI工具快速完成海报设计与排版',
        duration: '3:15',
        thumbnail: '/thumbnails/tip-2.jpg',
        videoUrl: '/videos/tip-2.mp4'
      },
      {
        id: 'tip-3',
        title: 'AI自动化工作流',
        description: '演示AI如何自动化日常重复性工作',
        duration: '3:30',
        thumbnail: '/thumbnails/tip-3.jpg',
        videoUrl: '/videos/tip-3.mp4'
      },
      {
        id: 'tip-4',
        title: 'AI数据分析',
        description: '使用AI快速分析和可视化业务数据',
        duration: '2:50',
        thumbnail: '/thumbnails/tip-4.jpg',
        videoUrl: '/videos/tip-4.mp4'
      }
    ]
  }
];

export function AIWorkDemo() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['weekly-tips']));
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            眼见为实，来看看我们如何使用AI工作
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            每周开放日，现场参观一家AI公司如何使用AI工作
          </p>
        </motion.div>

        {/* 视频分类 */}
        <div className="space-y-4">
          {videoCategories.map((category, index) => {
            const isExpanded = expandedCategories.has(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                {/* 分类标题栏 */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isExpanded ? 'bg-purple-500' : 'bg-purple-500/20 group-hover:bg-purple-500/30'
                    }`}>
                      <span className={isExpanded ? 'text-white' : 'text-purple-400 transition-colors'}>
                        {category.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl lg:text-2xl font-semibold transition-colors ${
                        isExpanded ? 'text-white' : 'text-gray-300'
                      }`}>
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {category.videos.length} 个演示视频
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                  </motion.div>
                </button>

                {/* 视频列表 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <div className="pt-6 border-t border-gray-800">
                        <div className="grid md:grid-cols-2 gap-6">
                          {category.videos.map((video, videoIndex) => (
                            <motion.div
                              key={video.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: videoIndex * 0.1 }}
                              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
                            >
                              {/* 视频区域 */}
                              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 min-h-[200px] sm:min-h-[250px]">
                                {playingVideo === video.id ? (
                                  // 播放中：根据类型显示不同的播放器
                                  video.type === 'bilibili' && video.embedCode ? (
                                    // B站视频：显示iframe
                                    <iframe
                                      src={`https:${video.embedCode}`}
                                      scrolling="no"
                                      frameBorder="0"
                                      allowFullScreen={true}
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    // 本地视频：显示video标签
                                    <video
                                      controls
                                      className="w-full h-full object-cover"
                                    >
                                      <source src={video.videoUrl} type="video/mp4" />
                                      您的浏览器不支持视频播放
                                    </video>
                                  )
                                ) : (
                                  // 未播放：显示缩略图和播放按钮
                                  <>
                                    {/* 缩略图 */}
                                    {video.thumbnail ? (
                                      <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      // 默认占位图
                                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                                        <Play className="w-16 h-16 text-purple-400/50" />
                                      </div>
                                    )}

                                    {/* 播放按钮 */}
                                    <button
                                      onClick={() => handlePlayVideo(video.id)}
                                      className="absolute inset-0 flex items-center justify-center transition-all duration-300 group"
                                    >
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                          type: "spring",
                                          stiffness: 400,
                                          damping: 20
                                        }}
                                        className="w-20 h-20 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center border border-white/50 group-hover:border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300"
                                      >
                                        <Play className="w-9 h-9 text-white ml-1" />
                                      </motion.div>
                                    </button>

                                    {/* 时长标签 */}
                                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                                      {video.duration}
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* 视频信息 */}
                              <div className="p-5">
                                <h4 className="text-white font-semibold mb-2">{video.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{video.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* 提示信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">
            💡 点击播放按钮直接在卡片内观看演示视频
          </p>
          
          {/* 预约按钮 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBookingModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            <Calendar className="w-5 h-5" />
            预约现场参观
          </motion.button>
        </motion.div>
      </div>

      {/* 预约模态框 */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService="现场参观预约"
      />
    </section>
  );
}
