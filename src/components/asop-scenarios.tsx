'use client';

import { Trophy, Handshake, Beaker, Building2, Smartphone, GraduationCap, ArrowRight, Zap, Target, AlertTriangle, ChevronDown, ChevronUp, Bot, Cpu, Sparkles, Users, Plus, Minus, Briefcase } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/section-title';

// 员工名称到ID的映射
const employeeIdMap: Record<string, string> = {
  '销售大宗师': 'sales-grandmaster',
  '商务谈判大师': 'negotiation-master',
  '内容炼金术士': 'content-alchemist',
  'IP内容复刻大师': 'ip-replicator',
  '爆款战术小队': 'viral-squad',
  'AI 课程助教': 'teaching-assistant',
  '咨询专家助手': 'consultant-assistant',
  'AI全域同城榜': 'city-ranking',
};

interface Category {
  title: string;
  slogan?: string; // 场景副标题
  problems: string[];
  tools: {
    icon: React.ReactNode;
    name: string;
    description?: string;
  }[];
  cityRankingTools?: {
    icon: React.ReactNode;
    name: string;
  }[];
}

const categoriesData: Category[] = [
  {
    title: 'AI销售',
    slogan: '提升成交率，让销售团队稳定发挥',
    problems: [
      '老销售离职，带走客户和经验',
      '新人培训3个月，转化率仍不及格',
      '同样话术，不同销售效果差10倍',
      '优秀销售经验无法标准化复制',
      '团队转化率忽高忽低，不稳定'
    ],
    tools: [
      { icon: <Trophy className="w-6 h-6" />, name: '销售大宗师', description: '将顶级销售经验数字化，让团队转化率稳定提升' },
      { icon: <Handshake className="w-6 h-6" />, name: '商务谈判大师', description: '智能辅助商务谈判，掌握主动权，提升成交率' },
    ],
  },
  {
    title: 'AI获客',
    slogan: '打造获客引擎，让客户源源不断',
    problems: [
      '天天加班写内容，产能还是跟不上',
      'IP风格不统一，品牌形象模糊',
      '内容质量参差不齐，平台不推荐',
      '发了一堆内容，用户看都不看',
      '私域流量活跃度低，转化困难',
      '不懂平台算法，内容没有曝光'
    ],
    tools: [
      { icon: <Beaker className="w-6 h-6" />, name: '内容炼金术士', description: '将日常沟通录音炼成爆款文案，让创作再无瓶颈' },
      { icon: <Building2 className="w-6 h-6" />, name: 'IP内容复刻大师', description: '复刻对标IP的内容精髓，用你的语言风格重新表达，打造差异化个人品牌' },
      { icon: <Smartphone className="w-6 h-6" />, name: '爆款战术小队', description: '精通小红书和朋友圈平台玩法，让内容快速获得流量和转化' },
    ],
    cityRankingTools: [
      { icon: <Target className="w-6 h-6" />, name: 'AI全域同城榜' },
    ],
  },
  {
    title: '专业服务 AI 化',
    slogan: '规模化交付专业服务，让业务不再依赖专家个人',
    problems: [
      '专业服务依赖专家个人，无法规模化',
      '法律、心理咨询、教育咨询等需要洞悉人性、需要专业知识的行业难以AI化'
    ],
    tools: [
      { icon: <GraduationCap className="w-6 h-6" />, name: 'AI 课程助教', description: '7×24小时陪伴式辅导，提升学习效果和课程完成率' },
      { icon: <Target className="w-6 h-6" />, name: '咨询专家助手', description: '提升专业服务效率，实现规模化交付' },
    ],
  },
];

interface ASOPScenariosProps {
  onBookingClick?: (service?: string) => void;
}

export function ASOPScenarios({ onBookingClick }: ASOPScenariosProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set()); // 默认全部折叠
  const [expandedTrafficScene, setExpandedTrafficScene] = useState(false); // 流量获取场景默认折叠
  const [expandedContentScene, setExpandedContentScene] = useState(false); // 内容生产场景默认折叠

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };

  // 生成锚点ID的辅助函数
  const getAnchorId = (name: string) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u4e00-\u9fa5]/g, ''); // 保留中文（u4e00-u9fa5是Unicode中文范围）
  };

  return (
    <section id="scenarios" className="py-10 sm:py-16 lg:py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={Briefcase}
          label="【产品·AI员工】"
          enLabel="AI Employees"
          title="专注成交场景的AI数字员工"
          description="忘掉那些玩具，我们为你提供生产力级别的AI数字员工"
        />

        {/* 内容区域 - 所有产品 */}
        <div className="space-y-8">
          {/* 所有产品板块 */}
          <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
              {/* 所有产品标题 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  所有产品
                </h3>
                <button
                  onClick={() => onBookingClick?.()}
                  className="text-sm lg:text-base text-purple-400 hover:text-purple-300 transition-colors"
                >
                  预约咨询
                </button>
              </div>

              {/* AI产品板块 - 统一风格 */}
              <div className="space-y-4">
                {categoriesData.map((category, index) => {
                  const categoryParam = index === 0 ? 'sales' : index === 1 ? 'customer' : 'consulting';
                  const route = `/employees?category=${categoryParam}`;
                  const isExpanded = expandedCategories.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] rounded-[20px] overflow-hidden"
              >
                {/* 标题栏 - 简洁风格，去掉图标 */}
                <button
                  onClick={() => toggleCategory(index)}
                  className="w-full px-6 py-4 hover:bg-[#111] active:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-medium text-gray-300">{category.title}</h3>
                    {category.slogan && (
                      <p className="text-sm text-gray-500 mt-0.5">{category.slogan}</p>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                {/* 内容区域 - 可折叠 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-6">
                        {/* AI获客 - 两个独立板块 */}
                        {index === 1 ? (
                          <div className="space-y-4">
                            {/* 流量获取板块 */}
                            <div>
                              <button
                                onClick={() => setExpandedTrafficScene(!expandedTrafficScene)}
                                className="w-full py-3 hover:bg-[#111] transition-all duration-300 flex items-center justify-between cursor-pointer"
                              >
                                <span className="text-base font-medium text-gray-300 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                                  流量获取
                                </span>
                                <motion.div
                                  animate={{ rotate: expandedTrafficScene ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {expandedTrafficScene && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-4">
                                      {/* 流量痛点 */}
                                      <div className="py-3">
                                        <div className="flex items-center gap-2 mb-3">
                                          <AlertTriangle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                          <span className="text-sm font-semibold text-gray-200">场景痛点</span>
                                        </div>
                                        <div className="space-y-2 pl-2">
                                          {category.problems.slice(3, 6).map((problem, idx) => (
                                            <motion.div
                                              key={idx}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: idx * 0.1 }}
                                              className="flex items-center gap-3"
                                            >
                                              <div className="w-px h-4 bg-gray-700 flex-shrink-0" />
                                              <span className="text-gray-300 text-sm leading-relaxed">{problem}</span>
                                            </motion.div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* 解决方案 */}
                                      {category.cityRankingTools && category.cityRankingTools.length > 0 && (
                                        <div className="py-3">
                                          <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold text-gray-200">数字员工</span>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {category.cityRankingTools.map((tool, toolIndex) => {
                                              const employeeId = employeeIdMap[tool.name];
                                              const href = employeeId ? `/employees/${employeeId}` : `${route}#${getAnchorId(tool.name)}`;
                                              return (
                                                <Link
                                                  key={`city-${toolIndex}`}
                                                  href={href}
                                                  className="block group"
                                                >
                                                  <div className="bg-[#111] rounded-xl p-4 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer">
                                                    <div className="flex items-center gap-3 mb-1">
                                                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400">
                                                        {tool.icon}
                                                      </div>
                                                      <div className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">{tool.name}</div>
                                                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                                                    </div>
                                                    <p className="text-xs text-gray-500 leading-relaxed pl-10">
                                                      帮你抢占全网搜索排名
                                                    </p>
                                                  </div>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* 内容生产板块 */}
                            <div>
                              <button
                                onClick={() => setExpandedContentScene(!expandedContentScene)}
                                className="w-full py-3 hover:bg-[#111] transition-all duration-300 flex items-center justify-between cursor-pointer"
                              >
                                <span className="text-base font-medium text-gray-300 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                                  内容生产
                                </span>
                                <motion.div
                                  animate={{ rotate: expandedContentScene ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {expandedContentScene && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-4">
                                      {/* 内容生产痛点 */}
                                      <div className="py-3">
                                        <div className="flex items-center gap-2 mb-3">
                                          <AlertTriangle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                          <span className="text-sm font-semibold text-gray-200">场景痛点</span>
                                        </div>
                                        <div className="space-y-2 pl-2">
                                          {category.problems.slice(0, 3).map((problem, idx) => (
                                            <motion.div
                                              key={idx}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: idx * 0.1 }}
                                              className="flex items-center gap-3"
                                            >
                                              <div className="w-px h-4 bg-gray-700 flex-shrink-0" />
                                              <span className="text-gray-300 text-sm leading-relaxed">{problem}</span>
                                            </motion.div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* 数字员工 */}
                                      <div className="py-3">
                                        <div className="flex items-center gap-2 mb-3">
                                          <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                          <span className="text-sm font-semibold text-gray-200">数字员工</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {category.tools.map((tool, toolIndex) => {
                                            const employeeId = employeeIdMap[tool.name];
                                            const href = employeeId ? `/employees/${employeeId}` : `${route}#${getAnchorId(tool.name)}`;
                                            return (
                                              <Link
                                                key={toolIndex}
                                                href={href}
                                                className="block group"
                                              >
                                                <div className="bg-[#111] rounded-xl p-4 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer">
                                                  <div className="flex items-center gap-3 mb-1">
                                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400">
                                                      {tool.icon}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">{tool.name}</div>
                                                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                                                  </div>
                                                  {tool.description && (
                                                    <p className="text-xs text-gray-500 leading-relaxed pl-10">{tool.description}</p>
                                                  )}
                                                </div>
                                              </Link>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        ) : (
                          // 其他分类 - 简洁样式
                          <>
                            {/* 场景痛点 - 作为独立区块 */}
                            <div className="py-5">
                              <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <span className="text-sm font-semibold text-gray-200">场景痛点</span>
                              </div>
                              <div className="space-y-2 pl-2">
                                {category.problems.map((problem, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="w-px h-4 bg-gray-700 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm leading-relaxed">{problem}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* 数字员工 - 作为独立区块 */}
                            <div className="py-5">
                              <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <span className="text-sm font-semibold text-gray-200">数字员工</span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {category.tools.map((tool, toolIndex) => {
                                  const employeeId = employeeIdMap[tool.name];
                                  const href = employeeId ? `/employees/${employeeId}` : `${route}#${getAnchorId(tool.name)}`;
                                  return (
                                    <Link
                                      key={toolIndex}
                                      href={href}
                                      className="block group"
                                    >
                                      <div className="bg-[#111] rounded-xl p-4 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer">
                                        <div className="flex items-center gap-3 mb-1">
                                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400">
                                            {tool.icon}
                                          </div>
                                          <div className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">{tool.name}</div>
                                          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                                        </div>
                                        {tool.description && (
                                          <p className="text-xs text-gray-500 leading-relaxed pl-10">{tool.description}</p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        )}
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
      </div>
    </section>
  );
}

// 最新产品板块组件（导出供首页使用）
export interface NewsItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  imageGradient: string;
  imageContent: React.ReactNode;
  employeeId?: string; // 可选：跳转到员工详情页
  courseId?: string; // 可选：跳转到课程详情页
}

const newsItems: NewsItem[] = [
  {
    id: 'news-0',
    title: '从公司获客、销售到交付的全流程AI闭环｜3 天线下课',
    tag: 'AI 能力建设',
    date: '2026年4月8日',
    courseId: 'breaking-frames',
    imageGradient: 'linear-gradient(135deg, #7dd3fc 0%, #fde68a 100%)',
    imageContent: (
      <span className="text-white text-sm sm:text-base font-medium text-center leading-relaxed px-3">
        AI变现破框课
      </span>
    ),
  },
  {
    id: 'news-1',
    title: '让你的品牌成为AI搜索第一答案',
    tag: 'AI 获客',
    date: '2026年3月10日',
    employeeId: 'city-ranking',
    imageGradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    imageContent: (
      <span className="text-white text-sm sm:text-base font-medium text-center leading-relaxed px-3">
        GEO-AI同城榜
      </span>
    ),
  },
  {
    id: 'news-2',
    title: '用销售大宗师复刻销冠，让团队转化率稳定提升',
    tag: 'AI 销售',
    date: '2026年3月6日',
    employeeId: 'sales-grandmaster',
    imageGradient: 'linear-gradient(135deg, #1e40af 0%, #93c5fd 100%)',
    imageContent: (
      <span className="text-white text-sm sm:text-base font-medium text-center leading-relaxed px-3">
        销售大宗师
      </span>
    ),
  },
];

interface LatestNewsProps {
  onBookingClick?: (service?: string) => void;
}

export function LatestNews({ onBookingClick }: LatestNewsProps) {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* 标题区域 - 参考 OpenAI 风格 */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            最新动态
          </h3>
          <Link 
            href="/news"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            查看更多
          </Link>
        </div>

        {/* 动态卡片列表 - 垂直排列 */}
        <div className="space-y-4">
          {newsItems.map((item, index) => {
            const cardContent = (
              <div className="flex items-center gap-4 sm:gap-6 py-5 border-b border-gray-800/50 group">
                {/* 左侧图片区 - 正方形比例，柔和圆角 */}
                <div
                  className="flex-shrink-0 w-[120px] sm:w-[160px] h-[120px] sm:h-[160px] rounded-lg flex items-center justify-center overflow-hidden relative"
                  style={{ background: item.imageGradient }}
                >
                  {/* 文字内容 */}
                  {item.imageContent}
                </div>

                {/* 右侧内容区 */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {/* 标题 */}
                  <h4 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>

                  {/* 标签 + 时间 */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            );

            // 如果有 courseId，跳转到课程详情页
            if (item.courseId) {
              return (
                <Link
                  key={item.id}
                  href={`/courses/${item.courseId}`}
                  className="block"
                >
                  {cardContent}
                </Link>
              );
            }

            // 如果有 employeeId，使用 Link 包裹
            if (item.employeeId) {
              return (
                <Link
                  key={item.id}
                  href={`/employees/${item.employeeId}`}
                  className="block"
                >
                  {cardContent}
                </Link>
              );
            }

            // 否则使用普通 div
            return (
              <div key={item.id}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
