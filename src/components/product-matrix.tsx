'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Code, Zap, Users, Building, Rocket, Grid3X3 } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

interface ServiceItem {
  name: string;
  description?: string;
  subItems?: string[];
  icon?: React.ReactNode;
}

const aiConsultingServices: ServiceItem[] = [
  {
    name: 'AI提效圈',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    name: 'AI应用工作坊',
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    name: 'AI陪跑营',
    icon: <Users className="w-6 h-6" />,
  },
  {
    name: '企业培训',
    icon: <Building className="w-6 h-6" />,
  },
];

const aiApplicationServices: ServiceItem[] = [
  {
    name: 'ASOP应用轻定制',
    icon: <Code className="w-6 h-6" />,
    subItems: ['个体版', '团队版', '商用版'],
  },
  {
    name: '深度应用开发',
    icon: <Rocket className="w-6 h-6" />,
    subItems: ['ASOP应用开发', '全新应用开发'],
  },
];

export function ProductMatrix() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-black via-gray-900/30 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          icon={Grid3X3}
          label="【产品矩阵】"
          enLabel="Product Matrix"
          title="意心·AI解决方案矩阵"
        />

        {/* 矩阵内容 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 左栏：AI咨询 | 意心·学院 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 border border-purple-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">AI咨询</h3>
                  <p className="text-xs text-purple-400">意心·学院</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {aiConsultingServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <span className="text-white font-medium text-sm">{service.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右栏：AI应用 | 意心·智造 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-blue-900/20 border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">AI应用</h3>
                  <p className="text-xs text-blue-400">意心·智造</p>
                </div>
              </div>

              <div className="space-y-3">
                {aiApplicationServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <span className="text-white font-medium text-base">{service.name}</span>
                    </div>
                    {service.subItems && (
                      <div className="flex flex-wrap gap-2 ml-9">
                        {service.subItems.map((subItem, subIndex) => (
                          <span
                            key={subIndex}
                            className="px-2 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300"
                          >
                            {subItem}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
