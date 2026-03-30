'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Users, Coins, TrendingUp, Building2, Sparkles, Share2 } from 'lucide-react';

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* 返回导航 */}
      <div className="max-w-4xl mx-auto px-4 pt-20 sm:pt-24">
        <Link
          href="/employees/city-ranking"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-white transition-colors text-xs"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          返回 AI 同城榜
        </Link>
      </div>

      {/* 主内容 */}
      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 标题 */}
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full mb-4">
              合作共赢
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              GEO·AI 同城榜代理招募
            </h1>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              成为我们的合作伙伴，共享 AI 获客红利
            </p>
          </div>
        </FadeInUp>

        {/* 合作推荐 */}
        <FadeInUp delay={50}>
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white mb-1">⚡ 成为推荐官</h2>
              <p className="text-sm text-gray-400">｜ 无门槛 · 无需技术背景 · 只需愿意行动</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl border border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">推荐客户成交后</p>
                  <p className="text-xs text-gray-500">无门槛，人人可参与</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-400">¥3,000</span>
                  <p className="text-xs text-gray-400 mt-1">推荐佣金/单</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* 成为代理 */}
        <FadeInUp delay={100}>
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white mb-1">✨ 成为代理</h2>
              <p className="text-sm text-gray-400">｜ 低门槛 · 高收益 · 管道收入</p>
            </div>

            {/* 条件 */}
            <div className="bg-[#111] rounded-xl border border-gray-800 p-6 mb-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">成为代理条件</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">购买 AI 全域服务</p>
                    <p className="text-xl font-bold text-purple-400 mt-1">¥19,800</p>
                    <p className="text-xs text-gray-500 mt-1">你自己没体验，就不可能成为代理</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">+1万成为代理商</p>
                    <p className="text-xl font-bold text-green-400 mt-1">¥10,000</p>
                    <p className="text-xs text-gray-500 mt-1">获得代理权</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 代理模式 */}
            <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-5">代理模式</h3>
              
              <div className="space-y-4">
                {/* 方式一：合作推荐 */}
                <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-xl border border-green-500/30 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded mb-2">方式一</span>
                      <h4 className="text-white font-bold text-base">合作推荐</h4>
                      <p className="text-xs text-gray-500 mt-1">总部交付，按单结算</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-green-400">40%</span>
                      <p className="text-xs text-gray-400">推荐收益/单</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">总部负责全部交付，你只负责推荐客户，成交后获得 40% 佣金</p>
                </div>

                {/* 方式二：代理销售 */}
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl border border-purple-500/30 p-5">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded mb-2">方式二</span>
                    <h4 className="text-white font-bold text-base">代理销售</h4>
                    <p className="text-xs text-gray-500 mt-1">自己推广、自己运营、收益更高</p>
                  </div>
                  
                  {/* 收益结构 */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-black/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">首期收益</p>
                      <span className="text-xl font-bold text-purple-400">40%</span>
                      <span className="text-base text-gray-300 ml-1">≈¥8,000/单</span>
                      <p className="text-xs text-gray-500">以客户购买全套AI同城榜为例</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">代运营收益</p>
                      <span className="text-xl font-bold text-green-400">¥5,000<span className="text-sm">/月</span></span>
                      <p className="text-xs text-gray-500">管道持续收益全部归你</p>
                    </div>
                  </div>
                  
                  {/* 权益说明 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">首期款交 <span className="text-purple-400 font-semibold">10%/单</span> 管理费，总部统一定价保障市场秩序</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">自己推广销售，客户资源私有化</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">自己运营交付，运营收益全部归你</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* 收益示例 */}
        <FadeInUp delay={150}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">单笔收益示例</h2>
            <p className="text-xs text-gray-500 ml-2">以客户购买 短视频同城榜为例</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/5 to-green-500/5 rounded-xl border border-gray-800 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-2">合作推荐模式</p>
                  <p className="text-sm text-gray-400">
                    首期款 ¥19,800 × <span className="text-green-400">40%</span> ≈ <span className="text-white font-bold">¥8,000</span>/单
                  </p>
                  <p className="text-xs text-gray-500 mt-2">只需推荐，总部交付，轻松赚佣金</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">代理销售模式</p>
                  <p className="text-sm text-gray-400">
                    首期款：交 <span className="text-purple-400">10%</span> 管理费，剩余 <span className="text-green-400">90%</span> 归你
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    代运营：<span className="text-green-400">¥5,000/月</span> 全部归你
                  </p>
                  <p className="text-xs text-gray-500 mt-2">多劳多得，长期收益更可观</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={200}>
          <div className="text-center pt-6">
            <p className="text-gray-400 text-sm mb-4">
              有意向？联系我们了解更多详情
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="h-12 px-8 text-sm rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
                >
                  💬 联系我们
                </Button>
              </Link>
              <Link href="/share/city-ranking">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-sm rounded-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  分享给朋友
                </Button>
              </Link>
            </div>
          </div>
        </FadeInUp>
      </article>
    </div>
  );
}
