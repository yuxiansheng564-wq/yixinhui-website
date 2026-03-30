'use client';

import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { Button } from '@/components/ui/button';
import { Lightbulb, Layers, Workflow, Database, Target, BookOpen, RefreshCw, ArrowRight, CheckCircle, Zap, Settings, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ASOPPage() {
  const capabilities = [
    {
      icon: Lightbulb,
      title: '隐性知识显性化',
      description: '将专家经验转化为可复用的AI资产',
    },
    {
      icon: Layers,
      title: '个人经验产品化',
      description: '把个人能力封装成可商用的应用',
    },
    {
      icon: Workflow,
      title: '业务流程AI化',
      description: '用AI重构业务流程，提升效率',
    },
    {
      icon: Database,
      title: '数据信息资产化',
      description: '将企业数据转化为智能决策资产',
    },
  ];

  const techFeatures = [
    {
      icon: Target,
      title: '深度业务对齐',
      description: '不同于通用AI工具或Agent，ASOP深度适配企业特定业务场景，确保AI输出符合业务逻辑和质量标准',
    },
    {
      icon: BookOpen,
      title: '知识|经验工程化',
      description: '通过语言体系反向工程、决策树建模等技术，将专家的隐性知识转化为可执行的AI流程',
    },
    {
      icon: RefreshCw,
      title: '持续学习迭代',
      description: '基于业务反馈的闭环优化机制，确保AI系统随业务发展持续进化',
    },
  ];

  const plans = [
    {
      name: '自用版',
      description: '个人或小团队自用',
      features: ['不对外销售', '快速上线验证想法', '1-3人使用', '每多一位用户+500'],
    },
    {
      name: '团队|企业版',
      description: '团队|企业内部使用',
      features: ['不对外销售', '团队内部提效', '4~50人使用', '包含成员管理看板', '团队协作功能', '数据共享与权限管理', '使用统计'],
      isPopular: true,
    },
    {
      name: '商业版',
      description: '通过应用盈利',
      features: ['可出售licence给客户', '需要分销管理系统', '需要token管理系统', '支持多级代理分销'],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 via-black to-black">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-sm">返回首页</span>
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              ASOP 应用技术
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              让每一个个体和组织都拥有自己的AI应用
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* 什么是ASOP */}
      <section className="py-6 lg:py-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-medium text-white mb-3">什么是 ASOP 应用？</h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    ASOP（AI Standard Operating Procedure）是我们自主研发的AI应用技术，能在大模型推理阶段对其能力进行调度、组合与增强以及对应用进行工程化封装。
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    我们将专家经验、业务方法论、专业知识等非结构化经验或内容通过AI技术开发为可商业化的ASOP应用，为客户打造真正能落地的AI应用解决方案，同时，我们也为想要将自己的经验、方法论或知识开发为AI应用或项目的创业者提供技术支持。
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 四大AI应用能力 */}
      <section className="py-12 lg:py-20 px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-2xl font-semibold text-white mb-6">
              四大AI应用能力
            </h2>
          </FadeInUp>
          
          <div className="grid grid-cols-2 gap-3">
            {capabilities.map((capability, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <div className="flex items-center gap-3 py-2">
                  <capability.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-white">{capability.title}</h3>
                    <p className="text-xs text-gray-500">{capability.description}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ASOP技术特点 */}
      <section className="py-12 lg:py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ASOP 技术特点
            </h2>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techFeatures.map((feature, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <div className="flex items-start gap-3 py-2">
                  <feature.icon className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 分隔线 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 py-8">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-500 text-sm">获取ASOP应用技术支持</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>
      </div>

      {/* 第一步：选择商业目标 */}
      <section className="py-8 lg:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-xl font-semibold text-white mb-2">
              第一步：选择您的AI应用商业目标
            </h2>
            <p className="text-gray-500 text-sm mb-6">选择最适合您的使用场景</p>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plans.map((plan, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <label className={`border rounded-lg p-3 cursor-pointer transition-colors flex items-start gap-2 ${
                  plan.isPopular 
                    ? 'border-purple-500/50 bg-purple-900/10' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}>
                  <input type="radio" name="business-goal" className="w-4 h-4 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white mb-0.5">
                      {plan.description}
                      {plan.isPopular && (
                        <span className="ml-1 px-1.5 py-0.5 bg-purple-500 rounded text-xs text-white">
                          推荐
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{plan.name}</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-400">
                          <CheckCircle className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 第二步：定制AI能力 */}
      <section className="py-8 lg:py-12 px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-xl font-semibold text-white mb-2">
              第二步：定制您的AI能力
            </h2>
            <p className="text-gray-500 text-sm mb-6">选择适合您的AI智能程度</p>
          </FadeInUp>
          
          <div className="max-w-2xl space-y-2">
            {[
              '我觉得领域ASOP应用展示的能力已经够用了',
              '我需要更强的AI能力',
              '我不知道'
            ].map((option, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <label className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-colors">
                  <input type="radio" name="ai-capability" className="w-4 h-4 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800" />
                  <span className="text-sm text-gray-300">{option}</span>
                </label>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 第三步：定制交互体验 */}
      <section className="py-8 lg:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-xl font-semibold text-white mb-2">
              第三步：定制您的交互体验
            </h2>
            <p className="text-gray-500 text-sm mb-6">调整UI和交互逻辑</p>
          </FadeInUp>
          
          <div className="max-w-2xl space-y-2">
            {[
              '我觉得领域ASOP应用展示的交互体验就不错',
              '我需要改变一些领域ASOP应用的交互逻辑和UI',
              '我觉得差了一些功能',
              '我觉得功能没问题，就是界面我不喜欢'
            ].map((option, index) => (
              <FadeInUp key={index} delay={0.1 * index}>
                <label className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-colors">
                  <input type="radio" name="ui-experience" className="w-4 h-4 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800" />
                  <span className="text-sm text-gray-300">{option}</span>
                </label>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 第四步：部署方式和品牌 */}
      <section className="py-8 lg:py-12 px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-xl font-semibold text-white mb-2">
              第四步：选择部署方式和品牌
            </h2>
            <p className="text-gray-500 text-sm mb-6">选择最适合您的部署方案</p>
          </FadeInUp>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {/* 部署方式 */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                部署方式
              </h3>
              <div className="space-y-2">
                {['web应用', '微信小程序', '独立部署'].map((option, index) => (
                  <label key={index} className="flex items-center gap-2 p-2.5 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-colors">
                    <input type="checkbox" className="w-3.5 h-3.5 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800 rounded" />
                    <span className="text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 品牌展示 */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                品牌展示
              </h3>
              <div className="space-y-2">
                <label className="flex items-start gap-2 p-3 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-colors">
                  <input type="radio" name="brand" className="w-3.5 h-3.5 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800 mt-0.5" />
                  <div>
                    <span className="text-sm text-white font-medium">选择默认方式</span>
                    <p className="text-xs text-gray-500 mt-0.5">开屏画面和底部显示Powered by意心智造</p>
                  </div>
                </label>
                <label className="flex items-start gap-2 p-3 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-colors">
                  <input type="radio" name="brand" className="w-3.5 h-3.5 text-purple-500 border-gray-600 focus:ring-purple-500 bg-gray-800 mt-0.5" />
                  <div>
                    <span className="text-sm text-white font-medium">我需要白标OEM</span>
                    <p className="text-xs text-gray-500 mt-0.5">完全你的品牌，移除意心智造所有信息</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <FadeInUp>
            <Link href="/contact">
              <Button size="lg" className="h-12 px-8">
                提交需求
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
