'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { ArrowLeft } from 'lucide-react';

// 动态数据
const allNews = [
  {
    id: 'news-0',
    title: '从公司获客、销售到交付的全流程AI闭环｜3 天线下课',
    tag: 'AI 能力建设',
    date: '2026年4月8日',
    courseId: 'breaking-frames',
    imageGradient: 'linear-gradient(135deg, #7dd3fc 0%, #fde68a 100%)',
    imageText: 'AI变现破框课',
  },
  {
    id: 'news-1',
    title: '让你的品牌成为AI搜索第一答案',
    tag: 'AI 获客',
    date: '2026年3月10日',
    employeeId: 'city-ranking',
    imageGradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    imageText: 'GEO-AI同城榜',
  },
  {
    id: 'news-2',
    title: '用销售大宗师复刻销冠，让团队转化率稳定提升',
    tag: 'AI 销售',
    date: '2026年3月6日',
    employeeId: 'sales-grandmaster',
    imageGradient: 'linear-gradient(135deg, #1e40af 0%, #93c5fd 100%)',
    imageText: '销售大宗师',
  },
];

// 分类标签
const categories = ['全部', 'AI 获客', 'AI 销售', '客户', '公司', 'AI 能力建设'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('全部');

  // 筛选动态
  const filteredNews = activeCategory === '全部'
    ? allNews
    : allNews.filter(item => item.tag === activeCategory);

  // 获取跳转链接
  const getHref = (item: typeof allNews[0]) => {
    if (item.courseId) return `/courses/${item.courseId}`;
    if (item.employeeId) return `/employees/${item.employeeId}`;
    return '/news';
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>

        {/* 页面标题 */}
        <FadeInUp>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            最新动态
          </h1>
        </FadeInUp>

        {/* 分类标签 */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-white text-black font-medium'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* 动态列表 - 网格布局 */}
        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <Link
                key={item.id}
                href={getHref(item)}
                className="group"
              >
                <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-colors">
                  {/* 图片区域 */}
                  <div
                    className="aspect-[16/9] flex items-center justify-center"
                    style={{ background: item.imageGradient }}
                  >
                    <span className="text-white text-lg sm:text-xl font-medium text-center leading-relaxed px-4">
                      {item.imageText}
                    </span>
                  </div>

                  {/* 文字区域 */}
                  <div className="p-5">
                    {/* 标题 */}
                    <h3 className="text-base sm:text-lg font-medium text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

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
              </Link>
            ))}
          </div>

          {/* 空状态 */}
          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">暂无相关动态</p>
            </div>
          )}
        </FadeInUp>
      </div>
    </main>
  );
}
