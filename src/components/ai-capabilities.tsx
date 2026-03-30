'use client';

import Link from 'next/link';
import { FadeInUp } from '@/components/fade-in-up';
import { ArrowRight, Users } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';
import { aiCapabilitiesImages, aiCapabilitiesTitles } from './ai-capabilities-images';

export function AICapabilities() {
  return (
    <section id="cases" className="py-10 sm:py-16 lg:py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={Users}
          label="【案例与团队】"
          enLabel="Cases & Team"
          title="帮助100+客户把AI用出生产力"
          description="你需要的不是聊天机器人，而是AI生产力"
        />

        {/* 内容区域 - 移动端横向滑动 | PC端三列网格 */}
        <div className="bg-[#0a0a0a] rounded-[20px] p-0 sm:p-2 lg:p-3">
          <div className="overflow-x-auto scrollbar-hide overscroll-x-contain md:overflow-visible">
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
              {/* 第一列：拼贴画 + 文字描述 */}
              <FadeInUp delay={150}>
                <Link href="/cases-and-team" className="w-[230px] sm:w-[290px] md:w-auto flex-shrink-0 space-y-4 block cursor-pointer">
                  {/* 拼贴画区域 - 自适应4:3和16:9 */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* mosaic-1 & mosaic-2: 4:3 或 16:9 图片 */}
                    <div className="overflow-hidden rounded bg-gray-900">
                      <img
                        src={aiCapabilitiesImages.mosaic1}
                        alt="案例 1"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="overflow-hidden rounded bg-gray-900">
                      <img
                        src={aiCapabilitiesImages.mosaic2}
                        alt="案例 2"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    {/* mosaic-3 & mosaic-4: 16:9 图片 */}
                    <div className="overflow-hidden rounded bg-gray-900">
                      <img
                        src={aiCapabilitiesImages.mosaic3}
                        alt="案例 3"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="overflow-hidden rounded bg-gray-900">
                      <img
                        src={aiCapabilitiesImages.mosaic4}
                        alt="案例 4"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    {/* mosaic-5: 占满一行 */}
                    <div className="col-span-2 overflow-hidden rounded bg-gray-900">
                      <img
                        src={aiCapabilitiesImages.mosaic5}
                        alt="案例 5"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  </div>
                  {/* 文字区域 */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{aiCapabilitiesTitles.mosaic}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                      {aiCapabilitiesTitles.mosaicDesc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      全部案例
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeInUp>

              {/* 第二列：宽屏卡片 */}
              <FadeInUp delay={200}>
                <div className="w-[230px] sm:w-[290px] md:w-auto flex-shrink-0 space-y-2">
                  <Link
                    href="/cases-and-team?category=content-ip"
                    className="group block"
                  >
                    <div className="overflow-hidden rounded bg-gray-900 mb-4">
                      <img
                        src={aiCapabilitiesImages.wide1}
                        alt="宽屏案例"
                        className="w-full h-auto object-cover hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{aiCapabilitiesTitles.wideTag}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{aiCapabilitiesTitles.wideTitle}</h3>
                    </div>
                  </Link>
                  <Link href="/cases-and-team?category=content-ip" className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
                    更多案例
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeInUp>

              {/* 第三列：肖像卡片 */}
              <FadeInUp delay={250}>
                <div className="w-[230px] sm:w-[290px] md:w-auto flex-shrink-0 space-y-2">
                  <Link
                    href="/cases-and-team?category=sales-training"
                    className="group block"
                  >
                    <div className="overflow-hidden rounded bg-gray-900 mb-4">
                      <img
                        src={aiCapabilitiesImages.portrait1}
                        alt="肖像案例"
                        className="w-full h-auto object-cover hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{aiCapabilitiesTitles.portraitTag}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{aiCapabilitiesTitles.portraitTitle}</h3>
                    </div>
                  </Link>
                  <Link href="/cases-and-team?category=sales-training" className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
                    更多案例
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
