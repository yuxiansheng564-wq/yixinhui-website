'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, BookOpen, Users, User, Cpu } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

interface LayerData {
  id: string;
  title: string;
  label: string;
  description: string;
  analogy: string;
  icon: React.ReactNode;
  gradient: string;      // 图标渐变色
  borderHover: string;   // hover边框色
  borderActive: string;  // active边框色
  bgActive: string;      // active背景色
  accentColor: string;   // 强调色（边框、文字）
}

// 层级配色：内层深紫 → 中层紫蓝 → 外层蓝色（从核心到扩展）
const layersData: LayerData[] = [
  {
    id: 'inner',
    title: '经典理论工程化',
    label: '内置方法论',
    description: '我们将金字塔原理、SPIN 销售法、定位理论等经过时间验证的商业逻辑，直接写入 AI 的底层 Prompt 链中。',
    analogy: '"原来这 AI 懂专业理论，不是瞎聊。"',
    icon: <BookOpen className="w-8 h-8" />,
    gradient: 'from-purple-600 to-purple-500',
    borderHover: 'hover:border-purple-500/50',
    borderActive: 'border-purple-500',
    bgActive: 'bg-purple-500/5',
    accentColor: 'border-purple-500',
  },
  {
    id: 'middle',
    title: '行业专家经验库',
    label: '隐性直觉代码化',
    description: '融合意心团队多年实战沉淀，并联合行业大 V专家，将他们"只可意会不可言传"的经验与直觉，封装成标准算法。',
    analogy: '"这相当于雇了个专家在后台帮我盯着。"',
    icon: <Users className="w-8 h-8" />,
    gradient: 'from-purple-500 to-blue-500',
    borderHover: 'hover:border-purple-400/50',
    borderActive: 'border-purple-400',
    bgActive: 'bg-purple-400/5',
    accentColor: 'border-purple-400',
  },
  {
    id: 'outer',
    title: '您的业务 DNA',
    label: '让AI了解你和你的业务',
    description: '深度学习您的私有数据、业务流与语言风格，让 AI 越用越像你，越用越懂你。',
    analogy: '"这是我独有的，AI是了解我的。"',
    icon: <User className="w-8 h-8" />,
    gradient: 'from-blue-500 to-blue-400',
    borderHover: 'hover:border-blue-500/50',
    borderActive: 'border-blue-500',
    bgActive: 'bg-blue-500/5',
    accentColor: 'border-blue-500',
  },
];

export function ThreeLayerCore() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          icon={Cpu}
          label="【ASOP基座】"
          enLabel="ASOP Foundation"
          title="ASOP 应用基座，让 AI 出厂即专家"
          description="我们在大模型基础上预置了三层内核，让 AI 从'玩具'变成'生产力工具'"
        />

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* 同心圆可视化 - 从内到外：深紫 → 紫蓝 → 蓝色 */}
          <div className="relative w-full aspect-square max-w-lg mx-auto mb-12 lg:mb-0">
            {/* 最外层 - 蓝色（业务DNA） */}
            <motion.div
              className="absolute inset-0 border-4 border-blue-500/30 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* 中间层 - 紫蓝渐变（专家经验） */}
            <motion.div
              className="absolute inset-[15%] border-4 border-purple-500/40 rounded-full"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-full"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* 最内层 - 深紫色（经典理论）核心 */}
            <motion.div
              className="absolute inset-[30%] border-4 border-purple-500/60 rounded-full bg-gradient-to-br from-purple-500/25 to-purple-600/25 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-center">
                <Layers className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                <span className="text-sm font-semibold text-white">三层内核</span>
              </div>
            </motion.div>

            {/* 层级标签 - 对应颜色 */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-xs text-blue-400 font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded">
              业务 DNA
            </div>
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 text-xs text-purple-300 font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded">
              专家经验
            </div>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 text-xs text-purple-200 font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded">
              经典理论
            </div>
          </div>

          {/* 层级详情卡片 - 颜色与同心圆对应 */}
          <div className="space-y-6">
            {layersData.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`bg-gray-900/50 border-2 border-gray-800 ${layer.borderHover} rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeLayer === layer.id ? `${layer.borderActive} ${layer.bgActive}` : ''
                }`}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${layer.gradient} rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{layer.title}</h3>
                    <p className="text-sm text-gray-500">{layer.label}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {(activeLayer === layer.id || index === 0) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <p className="text-gray-400 leading-relaxed">{layer.description}</p>
                      <div className={`bg-gray-800/50 rounded-lg p-3 border-l-4 ${layer.accentColor}`}>
                        <p className="text-sm text-gray-500 italic">{layer.analogy}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
