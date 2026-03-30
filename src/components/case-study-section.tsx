'use client';

import { FadeInUp } from '@/components/fade-in-up';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  image: string;
}

// 使用真实案例图片
const featuredCases: CaseStudy[] = [
  {
    id: 'case-1',
    client: '黄金珠宝品牌',
    title: 'AI内容生产',
    description: '每周25条视频内容，AI工作流自动生成',
    category: 'IP内容生产',
    categoryColor: 'purple',
    image: '/pics/cases/case-01-gold-jewelry-ip.jpeg',
  },
  {
    id: 'case-2',
    client: '高端岩茶品牌',
    title: '微信营销AI内容工厂',
    description: '一次输入卖点，自动生成多平台内容',
    category: '内容生产',
    categoryColor: 'purple',
    image: '/pics/cases/case-02-rock-tea-content.jpeg',
  },
  {
    id: 'case-3',
    client: '转店中介平台',
    title: 'AI销冠定制',
    description: '10年销售经验，AI快速复刻给新员工',
    category: '销售与客服',
    categoryColor: 'blue',
    image: '/pics/cases/case-05-store-transfer-sales.jpeg',
  },
];

const galleryImages = [
  '/pics/cases/case-03-europe-jewelry-ip.jpeg',
  '/pics/cases/case-04-gold-store-ip.jpeg',
  '/pics/cases/case-08-china-telecom-sales.jpeg',
  '/pics/cases/case-14-legal-knowledge.jpeg',
];

const categoryColorClasses: Record<string, string> = {
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  gray: 'bg-gray-600/20 text-gray-400 border-gray-600/50',
};

// 内部内容组件（用于集成到其他section）
export { featuredCases };

export function CaseStudyContent() {
  return (
    <>
      {/* 头部 */}
      <div className="flex justify-between items-center mb-12">
        <FadeInUp>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">客户案例</h2>
        </FadeInUp>
        <FadeInUp delay={100}>
          <Link
            href="/cases-and-team"
            className="text-base text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInUp>
      </div>

      {/* 内容区域 - 三栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧介绍区 - 30% */}
        <div className="lg:col-span-4">
          <FadeInUp delay={150}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  前沿开拓者
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  认识那些将AI应用于实际商业场景的领导者
                </p>
              </div>

              {/* 2x2 图片网格 */}
              <div className="grid grid-cols-2 gap-3">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg bg-gray-900"
                  >
                    <img
                      src={image}
                      alt={`案例图片 ${index + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* 中间和右侧案例展示 - 70% */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCases.map((caseItem, index) => (
            <FadeInUp key={caseItem.id} delay={200 + index * 50}>
              <Link
                href={`/cases-and-team#${caseItem.id}`}
                className="group block bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300"
              >
                {/* 图片 */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.client}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* 内容 */}
                <div className="p-5 space-y-3">
                  {/* 标题 */}
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {caseItem.client} - {caseItem.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {caseItem.description}
                  </p>

                  {/* 标签 */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${categoryColorClasses[caseItem.categoryColor]}`}
                  >
                    {caseItem.category}
                  </span>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </div>
      </div>

      {/* 底部CTA */}
      <FadeInUp delay={300}>
        <div className="mt-16 flex justify-center">
          <Link
            href="/cases-and-team"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
          >
            咨询 AI 商业应用
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeInUp>
    </>
  );
}

// 独立section组件（用于单独页面）
export function CaseStudySection() {
  return (
    <section className="py-16 lg:py-24 bg-black px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CaseStudyContent />
      </div>
    </section>
  );
}
