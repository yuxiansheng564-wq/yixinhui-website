'use client';

import { GraduationCap, Target, ArrowRight, Code, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { BookingModal } from '@/components/booking-modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

interface Ability {
  name: string;
  description: string;
}

interface ToolCard {
  icon: React.ReactNode;
  name: string;
  englishName: string;
  slogan: string;
  position: string;
  abilities: Ability[];
  knowledgeBase: string[];
  hiddenSkills: string[];
  color: string;
}

const consultingTools: ToolCard[] = [
  {
    icon: <GraduationCap className="w-10 h-10" />,
    name: 'AI 课程助教',
    englishName: 'The AI Teaching Assistant',
    slogan: '24/7 专业课程助手',
    position: '你专属的课程运营专家。',
    abilities: [
      { name: '课程辅导', description: '为学员提供24/7的智能辅导，解答学习疑问。' },
      { name: '作业批改', description: '自动批改作业和练习，提供个性化反馈。' },
      { name: '学习路径', description: '根据学员进度智能推荐学习内容和路径。' },
    ],
    knowledgeBase: [
      '教育心理学',
      '课程设计',
      '教学方法',
      '学习评估',
    ],
    hiddenSkills: [
      '学习动机激发',
      '个性化学习',
      '进度追踪',
      '学习效果优化',
    ],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Target className="w-10 h-10" />,
    name: '咨询专家助手',
    englishName: 'The Expert Consultant Assistant',
    slogan: '专业咨询支持',
    position: '你智能的咨询业务助理。',
    abilities: [
      { name: '需求分析', description: '快速理解客户需求，提供初步方案建议。' },
      { name: '方案生成', description: '基于客户需求自动生成咨询方案框架。' },
      { name: '知识检索', description: '快速检索专业知识库，支持复杂问题解答。' },
    ],
    knowledgeBase: [
      '咨询方法论',
      '行业知识',
      '案例分析',
      '最佳实践',
    ],
    hiddenSkills: [
      '客户洞察',
      '问题诊断',
      '方案优化',
      '价值评估',
    ],
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function ConsultingPage() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleTool = (toolName: string) => {
    setExpandedTool(expandedTool === toolName ? null : toolName);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService="专业服务 AI 化"
      />

      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-cyan-900/20 via-black to-black">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">首页</Link>
              <span>/</span>
              <span className="text-blue-400">专业服务 AI 化</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              专业服务 AI 化
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              规模化交付专业服务，让业务不再依赖专家个人
            </p>

            <Button
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
              className="h-14 px-8 text-base rounded-full bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30"
            >
              💬 预约咨询，了解详情
            </Button>
          </FadeInUp>
        </div>
      </section>

      {/* 工具卡片区域 */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp delay={100}>
            <h2 className="text-3xl font-bold text-white mb-12">专业服务 AI 化数字员工</h2>
          </FadeInUp>

          <div className="space-y-6">
            {consultingTools.map((tool, index) => {
              const isExpanded = expandedTool === tool.name;
              // 生成锚点ID：将工具名称转换为小写并替换空格，保留中文
              const anchorId = tool.name.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-\u4e00-\u9fa5]/g, '');

              return (
                <div key={index} id={anchorId}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-800 rounded-2xl overflow-hidden"
                  >
                  {/* 工具卡片标题 */}
                  <button
                    onClick={() => toggleTool(tool.name)}
                    className="w-full p-6 bg-gradient-to-r from-gray-900/50 to-gray-900/30 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}>
                          {tool.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                          <p className="text-sm text-gray-400">{tool.englishName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{tool.slogan}</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                  </button>

                  {/* 工具详细内容 */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gray-800"
                      >
                        <div className="p-6 space-y-6">
                          <p className="text-blue-400 font-semibold text-lg">{tool.slogan}</p>
                          <p className="text-gray-300">{tool.position}</p>

                          {/* 能力列表 */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Code className="w-5 h-5 text-blue-400" />
                              核心能力
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {tool.abilities.map((ability, idx) => (
                                <div key={idx} className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                                  <div className="font-semibold text-white mb-1">{ability.name}</div>
                                  <div className="text-sm text-gray-400">{ability.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 知识库 */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-blue-400" />
                              知识库
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {tool.knowledgeBase.map((item, idx) => (
                                <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-sm rounded-full border border-blue-500/20">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 隐性技能 */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-yellow-400" />
                              专业服务心得
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {tool.hiddenSkills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-yellow-500/10 text-yellow-300 text-sm rounded-full border border-yellow-500/20">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            申请体验
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 返回首页 */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            返回首页
          </Link>
        </div>
      </section>
    </div>
  );
}
