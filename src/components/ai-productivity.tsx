'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Wrench, BookOpen, Users, Target, Code2, BarChart3, Zap, ArrowRight, ChevronDown, Crown, Lightbulb, TrendingUp, Package } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }[];
  ctaText: string;
  color: string;
  service?: string; // 添加服务类型
}

const serviceCards: ServiceCard[] = [
  {
    id: 'academy',
    title: '意心·学院',
    subtitle: 'AI 能力建设',
    description: '商业咨询与培训',
    icon: <GraduationCap className="w-6 h-6" />,
    service: '意心·学院',
    features: [
      {
        icon: <Crown className="w-5 h-5" />,
        title: 'AI提效工作坊（年度会员）',
        desc: '6大模块实操（内容运营/业务咨询/销售管理/人力资源/个人成长/企业战略）+ 3场战略闭门会 + 全年专属社群陪伴'
      },
      {
        icon: <Lightbulb className="w-5 h-5" />,
        title: '老板AI法身工程（工作坊）',
        desc: '为创始人打造专属AI法身。复制老板的思想体系、模拟决策逻辑、还原语言风格、提炼做事的方法论和做人的价值观；让更高维度的自己促进老板自我成长'
      },
      {
        icon: <TrendingUp className="w-5 h-5" />,
        title: '企业AI化改造服务（训练营）',
        desc: '覆盖营销获客、销售转化、交付服务、管理决策等核心场景；搭建企业信息中台，让企业在经营过程中的一系列资料沉淀为组织的资产，系统性提高企业的经营效率'
      },
    ],
    ctaText: '探索学院课程',
    color: 'purple',
  },
  {
    id: 'manufacturing',
    title: '意心·智造',
    subtitle: 'AI 商业应用',
    description: '应用技术服务',
    icon: <Wrench className="w-6 h-6" />,
    service: '意心·智造',
    features: [
      {
        icon: <BarChart3 className="w-5 h-5" />,
        title: '场景数字员工',
        desc: '为销售、客服、咨询等核心业务场景提供智能化AI助手，提升业务效率'
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: '应用商业化封装',
        desc: '将AI智能体转化为可售卖的SaaS应用，支持品牌定制、多级代理分发'
      },
      {
        icon: <Code2 className="w-5 h-5" />,
        title: '业务AI化应用定制',
        desc: '从0到1打造符合您业务场景的AI应用，实现业务流程的智能化升级'
      },
    ],
    ctaText: '咨询智造方案',
    color: 'blue',
  },
];

interface AIProductivityProps {
  onBookingClick?: (service?: string) => void;
}

export function AIProductivity({ onBookingClick }: AIProductivityProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set()); // 默认全部折叠

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="productivity" className="py-10 sm:py-12 lg:py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={Package}
          label="【产品体系】"
          enLabel="Product System"
          title="交付AI工具，更赋予AI落地能力"
          description="融合能力建设和商业应用的AI赋能服务新范式"
        />

        {/* 卡片区域 */}
        <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
          <div className="grid md:grid-cols-2 gap-4 items-stretch">
          {serviceCards.map((card, index) => {
            const isExpanded = expandedCards.has(card.id);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col relative overflow-hidden bg-[#111] rounded-xl hover:bg-[#1a1a1a] transition-all duration-300"
              >
                {/* 顶部图标和标题 - 可点击折叠 */}
                <button
                  onClick={() => toggleCard(card.id)}
                  className="p-5 lg:p-6 text-left active:scale-[0.99] transition-all duration-300 relative cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`inline-flex w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? card.color === 'purple' ? 'bg-purple-500' : 'bg-blue-500'
                          : card.color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                      }`}
                      animate={{
                        scale: isExpanded ? 1 : [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: isExpanded ? 0 : Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className={`transition-colors ${
                        isExpanded ? 'text-white' : card.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                      }`}>
                        {card.icon}
                      </span>
                    </motion.div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        card.color === 'purple' ? 'text-purple-300/90' : 'text-blue-300/90'
                      }`}>
                        {card.subtitle}
                      </p>
                      <h3 className="text-xs text-gray-500">
                        {card.title} | {card.description}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? card.color === 'purple' ? 'bg-purple-500' : 'bg-blue-500'
                          : 'bg-gray-800'
                      }`}
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors ${
                        isExpanded ? 'text-white' : 'text-gray-400'
                      }`} />
                    </motion.div>
                  </div>
                  {!isExpanded && (
                    <motion.span
                      className={`absolute top-5 right-16 text-xs font-medium px-2 py-1 rounded-full ${
                        card.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                      }`}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      点击展开
                    </motion.span>
                  )}
                </button>

                {/* 可折叠内容 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 lg:px-6 pb-5">
                        {/* 特性列表 */}
                        <div className="space-y-3 mb-5">
                          {card.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start gap-3"
                            >
                              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                card.color === 'purple'
                                  ? 'bg-purple-500/10'
                                  : 'bg-blue-500/10'
                              }`}>
                                <span className={card.color === 'purple' ? 'text-purple-400/60' : 'text-blue-400/60'}>
                                  {feature.icon}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-gray-300 font-medium text-sm mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                  {feature.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA 按钮 - 统一蓝色 */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (card.id === 'manufacturing' && onBookingClick) {
                              // 意心·智造 - 打开预约模态框
                              onBookingClick(card.service);
                            } else if (card.id === 'academy') {
                              // 意心·学院 - 跳转到预约页面
                              window.location.href = '/booking';
                            }
                          }}
                          className="w-full group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          {card.ctaText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
