import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap, Code, Palette, Globe, MessageSquare } from 'lucide-react';

export default function ZhizaoPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm font-semibold text-gray-300 mb-4 tracking-wider uppercase">
                意心智造
              </div>
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-8">
                让每一个个体和组织<br />
                都拥有自己的AI应用
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12">
                将专家经验、业务方法论、专业知识等非结构化经验或内容通过AI技术开发为可商业化的ASOP应用，
                为您打造真正能落地的AI应用解决方案
              </p>
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 text-base rounded-full hover:scale-105 transition-transform">
                  立即咨询
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                为什么定制ASOP应用？
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                用豆包等通用大模型不也能解决问题吗？
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* 通用大模型 */}
              <div className="bg-gray-800/50/40 rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    通用大模型（如豆包）
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 font-semibold">✗</span>
                    <span className="text-gray-200">每次都是新手，缺乏专业性</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 font-semibold">✗</span>
                    <span className="text-gray-200">需要重复提示，效率低下</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 font-semibold">✗</span>
                    <span className="text-gray-200">无法封存专家经验</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 font-semibold">✗</span>
                    <span className="text-gray-200">难以商业化，缺乏定制</span>
                  </div>
                </div>
              </div>

              {/* ASOP应用 */}
              <div className="bg-gray-800/50 rounded-2xl p-8 lg:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-800/50/40 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    ASOP应用
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-semibold">✓</span>
                    <span className="text-gray-100">每次都是专家，专业性更强</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-semibold">✓</span>
                    <span className="text-gray-100">流程固定，效率翻倍</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-semibold">✓</span>
                    <span className="text-gray-100">完整封存专家知识库</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-semibold">✓</span>
                    <span className="text-gray-100">可直接商业化，支持定制</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={400}>
            <div className="text-center bg-gray-800/50/40 rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-700">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-4">
                "用豆包，每次都是新手；<br />
                用ASOP，每次都是专家。"
              </div>
              <div className="text-gray-300 text-lg">
                这就是生产力级别的AI工具
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                我们只做定制化AI应用
              </h2>
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-600 mb-6">我们不做</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-gray-500 font-bold text-xl">✕</span>
                    通用的AI工具
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-gray-500 font-bold text-xl">✕</span>
                    标准化的SaaS产品
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">我们只做</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-100">
                    <span className="text-purple-400 font-bold text-xl">✓</span>
                    为您量身定制的AI应用
                  </li>
                  <li className="flex items-center gap-3 text-gray-100">
                    <span className="text-purple-400 font-bold text-xl">✓</span>
                    封装您专业知识的智能系统
                  </li>
                </ul>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Four Steps Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                简单四步，定制你的ASOP应用
              </h2>
            </div>
          </FadeInUp>

          <div className="space-y-12">
            {/* Step 1 */}
            <FadeInUp delay={200}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    选择您的AI应用商业目标
                  </h3>
                  <p className="text-gray-300 mb-6">
                    明确您的应用目标，我们将根据您的需求提供最合适的解决方案
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['提高工作效率', '降低运营成本', '提升用户体验', '拓展业务场景'].map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800/50/40 border border-gray-700 rounded-full text-sm text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Step 2 */}
            <FadeInUp delay={300}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    定制您的AI能力
                  </h3>
                  <p className="text-gray-300 mb-6">
                    根据您的需求定制答案质量、智能程度等AI能力
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      '领域ASOP应用展示的能力已经够用了',
                      '我需要更强的AI能力',
                      '我不知道',
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-800/50/40 border border-gray-700 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-200">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Step 3 */}
            <FadeInUp delay={400}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    定制您的交互体验
                  </h3>
                  <p className="text-gray-300 mb-6">
                    打造符合您品牌调性和用户习惯的交互体验
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      '领域ASOP应用展示的交互体验就不错',
                      '我需要改变一些领域ASOP应用的交互逻辑和UI',
                      '我觉得差了一些功能',
                      '我觉得功能没问题，就是界面我不喜欢',
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-800/50/40 border border-gray-700 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Palette className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-200">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Step 4 */}
            <FadeInUp delay={500}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    选择部署方式和品牌
                  </h3>
                  <p className="text-gray-300 mb-6">
                    选择最适合您的部署方案，让您的ASOP应用快速上线
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: <Code />, title: '云端部署', desc: '无需维护，即开即用' },
                      { icon: <Globe />, title: '独立域名', desc: '专属品牌展示' },
                      { icon: <Zap />, title: 'API接入', desc: '灵活集成业务系统' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gray-800/50/40 border border-gray-700 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                      >
                        <div className="text-white mb-3">{item.icon}</div>
                        <div className="text-base font-semibold text-white mb-2">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-300">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
              准备好定制您的ASOP应用了吗？
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              让我们一起将您的专业知识转化为可商业化的AI应用
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="h-14 px-12 text-base rounded-full hover:scale-105 transition-transform">
                  了解ASOP应用定制
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="h-14 px-12 text-base rounded-full">
                  查看成功案例
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-300">
              <span>© 2026 意心会. All rights reserved.</span>
              <a 
                href="https://beian.miit.gov.cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                渝ICP备2026003734号-1
              </a>
            </div>
            <div className="flex gap-8">
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                联系我们
              </Link>
              <Link href="/zhizao" className="text-gray-300 hover:text-white transition-colors">
                意心智造
              </Link>
              <Link href="/xueyuan" className="text-gray-300 hover:text-white transition-colors">
                意心学院
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
