'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SearchBoxProps {
  onOpen?: () => void;
  onBookingClick?: () => void;
}

export function SearchBox({ onOpen, onBookingClick }: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* 点击直接打开对话框 */}
        <div 
          onClick={() => onOpen?.()}
          className="relative flex items-center bg-[#2f2f2f] rounded-full px-4 py-3 shadow-sm cursor-pointer hover:bg-[#3a3a3a] transition-colors"
        >
          <span className="flex-1 text-gray-400 text-sm sm:text-base">
            咨询业务？和小意聊聊吧
          </span>
          <div className="p-2 rounded-full bg-[#252525] text-gray-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 入口链接 */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
          <Link
            href="#scenarios"
            className="whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm"
          >
            探索产品矩阵
          </Link>
          <Link
            href="/cases-and-team"
            className="whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm"
          >
            查看行业案例
          </Link>
          <button
            onClick={onBookingClick}
            className="whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm"
          >
            预约专家诊断
          </button>
        </div>
      </motion.div>
    </div>
  );
}
