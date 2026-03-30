'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Users, Briefcase, Building, GraduationCap, Zap, Languages } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

// 三门语言数据
const languagesData = [
  {
    icon: <Users className="w-8 h-8" />,
    title: '懂 CEO 的语言',
    description: '我们懂战略、懂商业模式，知道老板要的是增长而非炫技',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: '懂 IP 操盘手的语言',
    description: '我们有实战的内容运营案例，深知流量与转化的痛点',
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: '懂工程师的语言',
    description: '我们清楚 AI 的能力边界，能给你提供咨询也能给你开发应用',
  },
];

// 典型客户数据
interface ClientData {
  name: string;
  logo: string;
}

const clientsData = {
  '央企/科技企业': [
    { name: '重庆电信', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=重庆电信' },
    { name: '必和(中国)科技发展集团', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=必和科技' },
  ],
  '消费品牌': [
    { name: '潮宏基', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=潮宏基' },
    { name: '老庙黄金', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=老庙黄金' },
    { name: '原铺黄金', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=原铺黄金' },
    { name: '车之宝汽车', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=车之宝汽车' },
  ],
  '专业服务': [
    { name: '盈科律师事务所', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=盈科律师事务所' },
    { name: '环保咨询企业', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=环保咨询企业' },
  ],
  '制造/供应链': [
    { name: '成都微印刷', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=成都微印刷' },
    { name: '印刷包装设备供应链平台', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=供应链平台' },
  ],
  '知识IP': [
    { name: '知识付费IP', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=知识付费IP' },
    { name: '自媒体创作者', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=自媒体创作者' },
  ],
  '教育培训': [
    { name: '金刚读书会', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=金刚读书会' },
    { name: '蒲公英时光', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=蒲公英时光' },
    { name: '瑞言能量学苑', logo: 'https://via.placeholder.com/200x80/1a1a1a/ffffff?text=瑞言能量学苑' },
  ],
};

export function ServiceShowcase() {
  const [activeTab, setActiveTab] = useState<keyof typeof clientsData>('央企/科技企业');
  const tabs = Object.keys(clientsData) as Array<keyof typeof clientsData>;

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          icon={Languages}
          label="【商业认知】"
          enLabel="Business Cognition"
          title="掌握三门语言，懂商业、懂内容、懂开发"
          description="不仅有商业叙事大脑，也有工程开发大脑。具备将专家经验AI化的解决方案能力。"
        />

        {/* 三门语言 */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {languagesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight">{item.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 客户案例 Logo 墙 */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center lg:text-left leading-tight">
              客户案例
            </h2>
            <p className="text-xl text-gray-400 mb-8 text-center lg:text-left leading-relaxed">
              成立至今已为{' '}
              <span className="text-purple-400">100+</span>{' '}
              中小企业主 | IP团队、超级个体、AI领域创业者提供了AI解决方案服务。
            </p>
            {/* 移动端横向Tab */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide mb-8">
              <div className="flex gap-2 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            {/* 桌面端竖向Tab */}
            <div className="hidden lg:flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 rounded-lg text-left font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Logo 墙内容 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {clientsData[activeTab].map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 flex items-center justify-center hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <div className="text-center">
                      <div className="w-full h-16 flex items-center justify-center mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-w-full max-h-16 object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-400">{client.name}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
