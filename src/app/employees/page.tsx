'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy, Handshake, Beaker, Building2, Smartphone, GraduationCap, Target,
  ArrowRight, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { BookingModal } from '@/components/booking-modal';
import { SectionTitle } from '@/components/section-title';

interface Employee {
  id: string;
  iconSmall: React.ReactNode;
  name: string;
  englishName: string;
  slogan: string;
  position: string;
  color: string;
  category: string;
  categoryLabel: string;
}

// 所有数字员工数据
const employees: Employee[] = [
  // AI销售
  {
    id: 'sales-grandmaster',
    iconSmall: <Trophy className="w-5 h-5" />,
    name: '销售大宗师',
    englishName: 'The Sales Grandmaster',
    slogan: '复制你的销冠基因',
    position: '金牌销售教练与军师',
    color: 'from-purple-500 to-purple-600',
    category: 'sales',
    categoryLabel: 'AI销售',
  },
  {
    id: 'negotiation-master',
    iconSmall: <Handshake className="w-5 h-5" />,
    name: '商务谈判大师',
    englishName: 'The Negotiation Master',
    slogan: '智能博弈，无往不利',
    position: '法律顾问与谈判专家',
    color: 'from-blue-500 to-cyan-500',
    category: 'sales',
    categoryLabel: 'AI销售',
  },
  // AI获客
  {
    id: 'content-alchemist',
    iconSmall: <Beaker className="w-5 h-5" />,
    name: '内容炼金术士',
    englishName: 'The Content Alchemist',
    slogan: '将日常碎片信息炼成黄金内容',
    position: 'AI内容创作专家',
    color: 'from-orange-500 to-red-500',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  {
    id: 'ip-replicator',
    iconSmall: <Building2 className="w-5 h-5" />,
    name: 'IP内容复刻大师',
    englishName: 'The IP Content Replicator',
    slogan: '打造你的个人品牌帝国',
    position: '个人品牌总设计师',
    color: 'from-purple-500 to-purple-600',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  {
    id: 'viral-squad',
    iconSmall: <Smartphone className="w-5 h-5" />,
    name: '爆款战术小队',
    englishName: 'The Viral Content Squad',
    slogan: '小红书 + 朋友圈双料专家',
    position: '社交媒体内容创作团队',
    color: 'from-pink-500 to-purple-500',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  {
    id: 'city-ranking',
    iconSmall: <Target className="w-5 h-5" />,
    name: 'AI全域同城榜',
    englishName: 'AI City Ranking',
    slogan: '让你的品牌成为搜索的第一答案',
    position: '全网搜索排名专家',
    color: 'from-orange-500 to-purple-500',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  // 专业服务 AI 化
  {
    id: 'teaching-assistant',
    iconSmall: <GraduationCap className="w-5 h-5" />,
    name: 'AI 课程助教',
    englishName: 'The AI Teaching Assistant',
    slogan: '24/7 专业课程助手',
    position: '课程运营专家',
    color: 'from-cyan-500 to-blue-500',
    category: 'consulting',
    categoryLabel: '专业服务 AI 化',
  },
  {
    id: 'consultant-assistant',
    iconSmall: <Target className="w-5 h-5" />,
    name: '咨询专家助手',
    englishName: 'The Expert Consultant Assistant',
    slogan: '专业咨询支持',
    position: '咨询业务助理',
    color: 'from-indigo-500 to-purple-500',
    category: 'consulting',
    categoryLabel: '专业服务 AI 化',
  },
];

const categories = [
  { id: 'all', name: '全部' },
  { id: 'sales', name: 'AI销售' },
  { id: 'customer', name: 'AI获客' },
  { id: 'consulting', name: '专业服务 AI 化' },
];

export default function EmployeesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <EmployeesContent />
    </Suspense>
  );
}

function EmployeesContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // 处理URL参数
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.some(c => c.id === category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // 获取当前分类的员工
  const getCurrentEmployees = () => {
    if (activeCategory === 'all') {
      return employees;
    }
    return employees.filter(emp => emp.category === activeCategory);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={activeCategory === 'sales' ? 'AI销售' : activeCategory === 'customer' ? 'AI获客' : 'AI咨询与专业交付'}
      />

      {/* 页面标题区 */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionTitle
            icon={Users}
            label="【数字员工】"
            enLabel="Digital Employees"
            title="AI时代的专业团队"
            description="7×24小时不间断工作，让每个人都能拥有专家级能力"
          />

          {/* 分类标签 */}
          <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-black'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 员工卡片网格 */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-black to-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0a0a0a] rounded-[20px] p-4 sm:p-6 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {getCurrentEmployees().map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/employees/${employee.id}`}
                    className="block group"
                  >
                    <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-5 sm:p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300 h-full">
                      {/* 图标和名称 */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${employee.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                          {employee.iconSmall}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gray-300 transition-colors truncate">
                            {employee.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">{employee.englishName}</p>
                        </div>
                      </div>

                      {/* 标语和定位 */}
                      <p className="text-white font-medium text-sm sm:text-base mb-2 line-clamp-1">
                        {employee.slogan}
                      </p>
                      <p className="text-gray-400 text-sm line-clamp-2">{employee.position}</p>

                      {/* 查看详情 */}
                      <div className="mt-4 flex items-center gap-1 text-sm text-gray-500 group-hover:text-white transition-colors">
                        <span>查看详情</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 返回首页 */}
      <section className="py-8 sm:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            返回首页
          </Link>
        </div>
      </section>
    </div>
  );
}
