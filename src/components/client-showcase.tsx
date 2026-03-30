'use client';

import { FadeInUp } from '@/components/fade-in-up';
import { cn } from '@/lib/utils';
import { MapPin, Users, Award, Building2 } from 'lucide-react';
import type { ReactNode, SVGProps } from 'react';

// 客户统计数据
const clientStats = [
  {
    icon: Building2,
    value: '20+',
    label: '服务客户',
    sublabel: '覆盖多个行业',
  },
  {
    icon: Users,
    value: '1000+',
    label: '企业用户',
    sublabel: '持续使用中',
  },
  {
    icon: Award,
    value: '95%',
    label: '客户满意度',
    sublabel: '服务好评率',
  },
  {
    icon: MapPin,
    value: '15+',
    label: '城市覆盖',
    sublabel: '全国服务网络',
  },
];

// 客户案例图片（使用真实案例图片）
const clientImages: Array<{
  src: string;
  alt: string;
  size: 'large' | 'medium' | 'small';
}> = [
  {
    src: '/pics/cases/case-13-new-energy-bidding.jpeg',
    alt: '新能源客户案例',
    size: 'large',
  },
  {
    src: '/pics/cases/case-07-printing-private-domain.jpeg',
    alt: '印刷行业客户案例',
    size: 'medium',
  },
  {
    src: '/pics/cases/case-06-school-uniform-customer-service.jpeg',
    alt: '教育行业客户案例',
    size: 'small',
  },
  {
    src: '/pics/cases/case-09-private-domain-marketing.jpeg',
    alt: '私域营销客户案例',
    size: 'small',
  },
  {
    src: '/pics/cases/case-15-health-content.jpeg',
    alt: '健康行业客户案例',
    size: 'medium',
  },
  {
    src: '/pics/cases/case-17-vocational-education.jpeg',
    alt: '职业教育客户案例',
    size: 'large',
  },
];

// 统计卡片组件
function StatCard({
  icon: Icon,
  value,
  label,
  sublabel,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  value: string;
  label: string;
  sublabel: string;
}) {
  return (
    <FadeInUp>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-gray-400">{label}</div>
          <div className="text-xs text-gray-500">{sublabel}</div>
        </div>
      </div>
    </FadeInUp>
  );
}

// 图片卡片组件
function ImageCard({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: 'large' | 'medium' | 'small';
}) {
  const sizeClasses = {
    large: 'h-64 lg:h-80',
    medium: 'h-48 lg:h-56',
    small: 'h-32 lg:h-40',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-900 group',
        sizeClasses[size]
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-medium text-white">{alt}</p>
      </div>
    </div>
  );
}

// 内部内容组件
export function ClientShowcaseContent() {
  return (
    <>
      {/* 标题 */}
      <FadeInUp>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            他们选择了我们
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            超过20家企业正在使用我们的AI解决方案，覆盖教育、医疗、金融、零售等多个行业
          </p>
        </div>
      </FadeInUp>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {clientStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 图片展示 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {clientImages.map((image, index) => (
          <FadeInUp key={index} delay={index * 50}>
            <ImageCard {...image} />
          </FadeInUp>
        ))}
      </div>

      {/* 底部品牌墙 */}
      <FadeInUp delay={200}>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500 mb-6">
            服务于各行业领先企业
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-50">
            {['科技', '教育', '医疗', '金融', '零售', '制造'].map(
              (industry) => (
                <span
                  key={industry}
                  className="text-gray-400 text-sm font-medium"
                >
                  {industry}
                </span>
              )
            )}
          </div>
        </div>
      </FadeInUp>
    </>
  );
}

// 独立section组件
export function ClientShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-black px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ClientShowcaseContent />
      </div>
    </section>
  );
}
