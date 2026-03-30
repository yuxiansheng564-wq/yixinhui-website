'use client';

import { motion } from 'framer-motion';
import { X, Check, MessageSquare, Target, Database, Brain, FileCheck, Scale } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

export function ToyVsWeapon() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          icon={Scale}
          label="【玩具 vs 武器】"
          enLabel="Toy vs Weapon"
          title="为什么别人用AI拿结果，而对你来说却是'聊天玩具'？"
          description="只有聊天框，没有业务流。这是'裸用'大模型的必然结局。"
        />

        {/* 对比卡片 */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* 玩具模式 - 弱势侧，全灰色系（降低视觉权重） */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border-2 border-gray-800 rounded-2xl p-8 lg:p-10 relative"
          >
            {/* 左侧灰色指示条 */}
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-400">玩具模式</h3>
                <p className="text-sm text-gray-600">Toy Mode</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-gray-800 pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-400">交互</span>
                </div>
                <p className="text-gray-600">漫无目的的 Chat (聊天)</p>
              </div>

              <div className="border-l-2 border-gray-800 pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-400">内核</span>
                </div>
                <p className="text-gray-600">通用大模型 (什么都懂一点，什么都不精)</p>
              </div>

              <div className="border-l-2 border-gray-800 pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-400">结果</span>
                </div>
                <p className="text-gray-600">生成一堆正确的废话，无法落地</p>
              </div>
            </div>
          </motion.div>

          {/* 武器模式 - 优势侧，紫色系高亮（品牌强化） */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border-2 border-purple-500/40 rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            {/* 左侧紫色指示条 */}
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r" />
            
            {/* 背景光效 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">生产力模式</h3>
                  <p className="text-sm text-purple-400">Productivity Mode</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-purple-500/40 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold text-white">交互</span>
                  </div>
                  <p className="text-gray-300">目标明确的专家SOP (执行)</p>
                </div>

                <div className="border-l-2 border-purple-500/40 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold text-white">内核</span>
                  </div>
                  <p className="text-gray-300">三层智慧内核 (懂理论、懂实战、懂你)</p>
                </div>

                <div className="border-l-2 border-purple-500/40 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold text-white">结果</span>
                  </div>
                  <p className="text-gray-300">输出符合业务标准的方案，直接交付</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
