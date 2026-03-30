'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

// 自定义事件名称
export const OPEN_XIAOYI_EVENT = 'openXiaoyiModal';

export default function FloatingChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // 用户关闭后隐藏

  // 滚动监听：只在离开 hero 区域后显示
  useEffect(() => {
    const handleScroll = () => {
      if (isHidden) return; // 用户关闭后不再显示
      
      const scrollY = window.scrollY;
      // 当滚动超过 500px 时显示悬浮搜索框
      setIsVisible(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHidden]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(OPEN_XIAOYI_EVENT));
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsHidden(true); // 用户关闭后不再自动显示
  };

  return (
    <>
      {/* 悬浮搜索框 - 条状入口 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
            onClick={handleClick}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#2f2f2f] border border-white/10 rounded-full px-5 py-3 cursor-pointer shadow-lg flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm whitespace-nowrap">咨询业务？和小意聊聊</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 右下角固定按钮 - 悬浮搜索框不显示时才显示 */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-4 right-4 w-12 h-12 bg-[#2f2f2f] rounded-full flex items-center justify-center shadow-lg border border-white/10 hover:bg-[#3a3a3a] transition-colors z-50"
            aria-label="咨询业务"
          >
            <Bot className="w-6 h-6 text-gray-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
