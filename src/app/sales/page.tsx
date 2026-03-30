'use client';

import { Trophy, Handshake, ArrowRight, Code, BookOpen, Lightbulb, Play, ChevronDown, ChevronUp, Check } from 'lucide-react';
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
  video?: {
    src: string;
  };
}

const salesTools: ToolCard[] = [
  {
    icon: <Trophy className="w-10 h-10" />,
    name: '销售大宗师',
    englishName: 'The Sales Grandmaster',
    slogan: '复制你的销冠基因',
    position: '你专属的金牌销售教练与军师。',
    abilities: [
      { name: '深挖需求', description: '基于 SPIN 提问法，透过现象挖掘客户背后的隐性痛点。' },
      { name: '真伪判断', description: '自动分析客户意向度，快速识别"白嫖党"与"准客户"。' },
      { name: '话术导航', description: '遇到刁钻问题，实时给出高情商回复话术。' },
      { name: '技能复刻', description: '将顶级销售的经验固化为流程，让小白也能像销冠一样销售。' },
    ],
    knowledgeBase: [
      'SPIN销售法',
      '麦肯锡咨询方法论',
      '顾问式销售',
      '大客户开发',
    ],
    hiddenSkills: [
      '识别客户潜台词',
      '判断成交时机',
      '处理反对意见的50+技巧',
      '建立信任的心理学技巧',
    ],
    color: 'from-purple-500 to-purple-600',
    video: {
      src: 'https://player.bilibili.com/player.html?isOutside=true&aid=116028893826127&bvid=BV1NFFsz8Ech&cid=35888628952&p=1&auto_play=0&high_quality=1&danmaku=0&as_wide=1&muted=0',
    },
  },
  {
    icon: <Handshake className="w-10 h-10" />,
    name: '商务谈判大师',
    englishName: 'The Negotiation Master',
    slogan: '智能博弈，无往不利',
    position: '你随身携带的法律顾问与谈判专家。',
    abilities: [
      { name: '会议觉察', description: '实时分析谈判会议中的关键信息，捕捉对方态度变化和潜在利益点。' },
      { name: '文书生成', description: '自动生成专业的合同条款、协议草案和商务文档，确保法律条款严谨。' },
      { name: '博弈策略', description: '基于博弈论分析谈判局势，制定最优谈判路径和让步策略。' },
    ],
    knowledgeBase: [
      '哈佛谈判理论',
      '合同法实务',
      '商务礼仪',
      '风险管理',
    ],
    hiddenSkills: [
      '识别对方底牌',
      '制造谈判筹码',
      '双赢方案设计',
      '危机化解技巧',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function SalesPage() {
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
        initialService="AI销售"
      />

      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 via-black to-black">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">首页</Link>
              <span>/</span>
              <span className="text-purple-400">AI销售</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              AI销售
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              提升成交率，让销售团队稳定发挥
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
            <h2 className="text-3xl font-bold text-white mb-12">AI销售数字员工</h2>
          </FadeInUp>

          <div className="space-y-6">
            {salesTools.map((tool, index) => {
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
                          <p className="text-purple-400 font-semibold text-lg">{tool.slogan}</p>
                          <p className="text-gray-300">{tool.position}</p>

                          {/* 视频区域 */}
                          {tool.video && (
                            <div className="aspect-video rounded-xl overflow-hidden border border-gray-700 min-h-[200px] sm:min-h-[250px]">
                              <iframe
                                src={tool.video.src}
                                className="w-full h-full"
                                scrolling="no"
                                frameBorder="0"
                                allow="clipboard-write; encrypted-media; fullscreen"
                                allowFullScreen
                              />
                            </div>
                          )}

                          {/* 能力列表 */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Code className="w-5 h-5 text-purple-400" />
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
                              隐性销售技巧
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
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
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
