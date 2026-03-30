'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Smartphone, Cpu, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionTitle } from '@/components/section-title';

interface AIApplicationPlatformProps {
  onBookingClick?: (service?: string) => void;
}

export function AIApplicationPlatform({ onBookingClick }: AIApplicationPlatformProps) {
  return (
    <section id="platform" className="py-16 lg:py-24 bg-gradient-to-b from-black via-gray-900/30 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={TrendingUp}
          label="【代理与合作】"
          enLabel="Partnership"
          title="连接ASOP，让资源再次变现"
          description="让每一个个体和组织都拥有自己的AI应用"
        />

        {/* 内容区域 */}
        <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
          <div className="space-y-6">
          {/* 痛点对比 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* 普通智能体 - 弱势侧，全灰色系 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#111] rounded-xl p-5 hover:bg-[#1a1a1a] transition-all duration-300 relative"
              >
                {/* 左侧灰色指示条 */}
                <div className="absolute left-0 top-5 bottom-5 w-1 bg-gray-700 rounded-r" />
                
                <div className="flex items-start gap-3 mb-3 pl-2">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-400 mb-1">普通智能体 (Agent)</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      依赖平台账号，无法独立售卖，数据不安全，功能受限于对话框
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm pl-14">✗ 这就只是个强化版的聊天工具</p>
              </motion.div>

              {/* ASOP 应用 - 优势侧，紫色系高亮 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#111] rounded-xl p-5 hover:bg-[#1a1a1a] transition-all duration-300 relative"
              >
                {/* 左侧紫色指示条 */}
                <div className="absolute left-0 top-5 bottom-5 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r" />
                
                <div className="flex items-start gap-3 mb-3 pl-2">
                  <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-1">ASOP商业应用基座</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      独立封装、功能增强、商业闭环，将你的商业idea真正变成能分发行销的产品
                    </p>
                  </div>
                </div>
                <p className="text-purple-300 text-sm pl-14 mb-4">✓ 真正能售卖的SaaS应用</p>
                <div className="space-y-2 pl-12">
                  <div className="flex items-start gap-2">
                    <Smartphone className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">独立封装</p>
                      <p className="text-gray-400 text-xs">拥有独立界面和品牌</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">功能增强</p>
                      <p className="text-gray-400 text-xs">挂载复杂工作流，能干活</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">商业闭环</p>
                      <p className="text-gray-400 text-xs">支持售卖和发展代理</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 引导按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-3"
          >
            <Link href="/asop">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-5 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                获取ASOP应用技术支持
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <motion.button
              onClick={() => onBookingClick?.('代理合作咨询')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-5 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 hover:border-purple-500/50 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              咨询代理合作
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
