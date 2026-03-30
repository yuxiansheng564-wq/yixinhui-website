'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ServiceProcessProps {
  onBookingClick?: (service?: string) => void;
}

export function ServiceProcess({ onBookingClick }: ServiceProcessProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <section id="process" className="py-10 sm:py-12 lg:py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 lg:mb-8"
        >
          <div className="flex items-center justify-center gap-3 overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-px bg-purple-500/50"
            />
            <ArrowDown className="w-5 h-5 text-purple-400" />
            <span className="text-sm sm:text-base font-medium text-purple-400 whitespace-nowrap">【服务流程】</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-px bg-purple-500/50"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 tracking-widest -mt-[15px] mb-2">Service Process</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight sm:leading-normal">
            如何开启AI进化之旅？
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            从诊断到落地，为您匹配最合适的解决方案
          </p>
        </motion.div>

        {/* 流程步骤 */}
        <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
          <div className="space-y-3">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#111] rounded-xl p-3 lg:p-4"
            >
              <div className="flex items-start gap-2 sm:gap-4">
                <span className="text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">step 1</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 sm:gap-4 mb-0.5">
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">业务诊断</h3>
                    <span className="text-purple-400 text-xs sm:text-sm leading-tight flex-shrink-0 whitespace-nowrap mt-0.5 sm:mt-1">→ 输出评估报告</span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                    深度访谈，明确您的需求类型和AI应用场景
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`rounded-xl transition-all duration-300 ${
                expandedStep === 'step2' ? 'bg-[#181818]' : 'bg-[#111]'
              }`}
            >
              <button
                onClick={() => toggleStep('step2')}
                className="w-full p-3 lg:p-4 text-left relative"
              >
                <div className="flex items-start gap-2 sm:gap-4">
                  <span className="text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">step 2</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-0.5">
                      <h3 className="text-white font-semibold text-base sm:text-lg">方案匹配</h3>
                      <motion.div
                        animate={{ rotate: expandedStep === 'step2' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 bg-[#252525] rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </div>
                    {expandedStep === 'step2' ? (
                      <p className="text-gray-500 text-xs sm:text-sm">
                        基于诊断结果，为您匹配最合适的路径
                      </p>
                    ) : (
                      <p className="text-gray-500 text-xs sm:text-sm">
                        为您匹配的解决方案路径
                      </p>
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedStep === 'step2' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-4 lg:px-5 lg:pb-5 space-y-2">
                      {/* 路径1 */}
                      <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">场景数字员工</h4>
                          <p className="text-gray-600 text-xs">有明确业务场景，现成AI应用即买即用</p>
                        </div>
                        <Link
                          href="#scenarios"
                          className="px-4 py-2 bg-white text-black rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          查看产品
                        </Link>
                      </div>

                      {/* 路径2 */}
                      <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">AI能力建设</h4>
                          <p className="text-gray-600 text-xs">培养团队AI能力，从认知到实操</p>
                        </div>
                        <button
                          onClick={() => onBookingClick?.('AI能力建设课程')}
                          className="px-4 py-2 bg-white text-black rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          了解课程
                        </button>
                      </div>

                      {/* 路径3 */}
                      <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">全流程技术支持</h4>
                          <p className="text-gray-600 text-xs">复杂场景定制，专家全程护航</p>
                        </div>
                        <button
                          onClick={() => onBookingClick?.('全流程技术支持服务')}
                          className="px-4 py-2 bg-white text-black rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          了解服务
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#111] rounded-xl p-3 lg:p-4"
            >
              <div className="flex items-start gap-2 sm:gap-4">
                <span className="text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">step 3</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 sm:gap-4 mb-0.5">
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">落地交付</h3>
                    <span className="text-purple-400 text-xs sm:text-sm leading-tight flex-shrink-0 whitespace-nowrap mt-0.5 sm:mt-1">→ 确保AI用起来</span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                    产品部署/课程交付 + 使用培训 + 持续优化支持
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
