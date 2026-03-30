'use client';

import Link from 'next/link';
import {
  Target, ArrowRight, Check, X, Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { Button } from '@/components/ui/button';

// AI同城榜完整数据
const data = {
  name: 'AI同城榜',
  slogan: '让你的品牌成为本地搜索的第一答案',
  description: '无论客户在抖音搜，还是用豆包、元宝、DeepSeek等AI搜索，搜"你的城市+你的行业"，第一个看到的就是你。',
  painPoints: [
    { title: '覆盖难', desc: '平台分散，客户搜不到你。全平台广告投入太贵，难以面面俱到。' },
    { title: '成本高', desc: '传统竞价点击昂贵，转化率却逐年下降，获客成本已超出负荷。' },
    { title: '竞争烈', desc: '同行已占领核心坑位，搜索结果全是对手，很难从红海中突围。' },
    { title: '效率低', desc: '自发内容无排名，形式不对，策略缺失，大量内容发了等于没发。' },
  ],
  features: [
    { name: 'AI智能内容矩阵', desc: '批量生成高质量榜单内容，精准命中搜索算法，实现搜索结果TOP5稳定占位' },
    { name: '全域多平台覆盖', desc: '10+平台同步铺设，数据互相抓取，实现排名叠加效应' },
    { name: '权威媒体背书', desc: '通过搜狐、网易等权威渠道发布，大幅提升品牌可信度与搜索引擎权重' },
  ],
  // 新套餐数据结构
  packages: [
    {
      name: 'AI同城榜',
      price: '¥19,800',
      desc: '含短视频同城榜 + AI同城榜全部功能',
      recommend: '全网霸屏，本地搜索都是你',
      isRecommended: true,
      effect: null,
      suitable: null,
    },
    {
      name: '短视频同城榜',
      price: '¥9,980',
      channels: '抖音、快手、小红书、视频号',
      suitable: '主攻短视频平台的商家',
    },
    {
      name: '大模型同城榜',
      price: '¥9,980',
      channels: '豆包、元宝、DeepSeek等AI搜索',
      suitable: '想要权威媒体背书的商家',
    },
  ],
  platforms: {
    ai: ['豆包', '元宝', 'DeepSeek', '通义千问'],
    video: ['抖音搜索', '快手搜索', '小红书搜索', '视频号搜索'],
    content: ['公众号', '百家号', '知乎', '头条', '企鹅号'],
    media: ['搜狐', '网易'],
    map: ['高德地图', '百度地图'],
    business: ['58同城', '阿里巴巴'],
  },
  processSteps: [
    { step: '01', title: '行业诊断&关键词策略', items: ['分析行业、区域、客群', '锁定流量高、竞争度低的蓝海词', '定制差异化占位方案'] },
    { step: '02', title: '内容生产&权威背书', items: ['AI智能生成榜单内容', '通过权威媒体渠道发布', '提升品牌可信度'] },
    { step: '03', title: '全域分发&排名优化', items: ['10+平台同步铺设', '精准命中搜索算法', '确保品牌稳定出现在TOP5'] },
    { step: '04', title: '排名监控&持续优化', items: ['实时监控全网排名变化', '根据算法波动持续更新内容', '维持排名长期稳定'] },
  ],
  cases: [
    {
      title: '意心会·AI智能体培训',
      speed: '1天上榜',
      keyword: '重庆AI智能体培训',
      strategy: '垂直行业词 + 城市词组合',
    },
    {
      title: '昭阳琴行·钢琴租赁',
      speed: '1天上榜',
      keyword: '沈阳租琴',
      strategy: '本地蓝海词精准覆盖',
    },
    {
      title: '相木相林·全屋定制',
      speed: '1天打上排名',
      keyword: '全屋定制相关关键词',
      strategy: '蓝海词切入（儿童房全屋定制、环保材料全屋定制）',
    },
    {
      title: '朱炳仁铜·高端礼品',
      speed: '搜索结果TOP5稳定占位',
      keyword: '多个关键词搜索均可见品牌',
      strategy: '关键词从行业术语转为用户真实搜索词',
    },
    {
      title: '曹大掌柜·文玩核桃（百万粉博主）',
      speed: '1小时，三个AI平台均排名第一',
      keyword: '豆包、元宝、通义千问',
      strategy: '精准长尾词 + 7平台同步分发 + 权威媒体背书',
    },
    {
      title: '长春无印优品·工作服定制',
      speed: '搜"长春工作服"排名第二',
      keyword: '抖音搜索前18条中大部分为其内容',
      strategy: '抖音搜索优化 + 关键词矩阵覆盖',
    },
  ],
  installmentNote: {
    title: '付费方式',
    phaseOne: {
      title: '首期启动按效果付费',
      steps: [
        {
          price: '¥3,980',
          label: '先付启动',
          services: ['关键词策略', '内容生产', '全平台分发'],
          target: '目标：5个关键词上榜'
        },
        {
          price: '¥6,000',
          label: '上榜后补尾款',
          note: '效果达标再付款'
        }
      ],
      remark: 'AI 同城榜 ¥6,980 启动，上榜后补齐尾款 ¥13,000'
    },
    phaseTwo: {
      title: '补完尾款后，选择运营模式',
      options: [
        {
          name: '代运营模式',
          price: '¥3,000',
          unit: '/月',
          desc: '我们持续为你运营业务',
          highlight: false,
          tags: ['单产品 ¥3,000/月', 'AI全域 ¥5,000/月']
        },
        {
          name: '自运营交付模式',
          price: '¥10,000',
          unit: '一次性',
          desc: '账号、软件全部移交，教会你的团队独立运营',
          highlight: true,
          tags: ['你从此拥有自己上榜的能力']
        }
      ]
    }
  },
  faqs: [
    { q: 'Q1：和传统的搜索优化有什么区别？', a: '传统搜索优化只管百度一个渠道，见效要几周到几个月。AI全域同城榜覆盖抖音+豆包/元宝/DeepSeek等全渠道，最快1-2天见效。而且传统做法越来越贵，我们目前还在红利期。' },
    { q: 'Q2：多久能见效？', a: '竞争少的行业1天就能打上排名，一篇内容就能见效。竞争激烈的行业通常3-7天看到效果。权威渠道最快第二天排名就上去。' },
    { q: 'Q3：排名能维持多久？', a: '排名相对稳定，但需要持续维护。我们的服务包含持续优化，确保排名长期稳定。' },
    { q: 'Q4：我的行业适合做吗？', a: '本地服务类行业效果最好（餐饮、装修、教育、礼品、服装定制等）。判断标准：你的目标客户是否会搜索"XX城市+行业关键词"来做消费决策。' },
    { q: 'Q5：和本地推/信息流广告有什么不同？', a: '本地推按点击/曝光收费，停投即停；AI全域同城榜做的是"搜索排名资产"——客户主动搜索时看到你，信任度更高，且排名一旦建立有持续性。' },
    { q: 'Q6：我需要配合什么？', a: '你只需要提供企业基本信息、产品卖点和目标客群，我们会通过AI问诊系统帮你梳理。内容生产、平台发布、排名优化全部由我们完成。' },
    { q: 'Q7：具体能保证什么效果？', a: '以AI同城榜为例：服务周期30天内，至少5个关键词，你的品牌在AI搜索结果首屏或TOP5以内。上榜后质保30天。后续可5折续费持续维护排名。' },
  ],
};

export default function ShareCityRankingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <article className="pt-20 sm:pt-24 pb-16 max-w-2xl mx-auto px-4">
        {/* Hero */}
        <section className="py-8 sm:py-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full mb-4">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">AI获客 · 全网搜索排名</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {data.name}
          </h1>
          <p className="text-base text-gray-300 mb-1">{data.slogan}</p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">{data.description}</p>
        </section>

        {/* 产品封面图 */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="/city-ranking-cover.png" 
              alt="AI同城榜" 
              className="w-full"
            />
          </div>
        </section>

        {/* 传统获客之困 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">传统获客之困</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.painPoints.map((point, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                <span className="text-red-400 font-semibold text-sm">{point.title}</span>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI同城榜服务是做什么的？ */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">AI同城榜服务是做什么的？</h2>
          <div className="space-y-2">
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">{feature.name}</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI同城榜可覆盖平台 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-1">AI同城榜可覆盖平台</h2>
          <p className="text-xs text-gray-500 mb-3">各平台互相抓取数据，一处有 = 处处有</p>
          
          <div className="bg-[#111] rounded-lg border border-gray-800 overflow-hidden text-xs">
            {/* AI搜索引擎 */}
            <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">AI搜索引擎（AI搜索排名）</div>
            <div className="grid grid-cols-4 divide-x divide-gray-800 border-b border-gray-800">
              {data.platforms.ai.map((platform, i) => (
                <div key={i} className="flex items-center justify-center gap-1 py-2">
                  <span className="text-gray-300">{platform}</span>
                  <Check className="w-3 h-3 text-green-400" />
                </div>
              ))}
            </div>

            {/* 短视频搜索 */}
            <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">短视频搜索（短视频搜索排名）</div>
            <div className="grid grid-cols-4 divide-x divide-gray-800 border-b border-gray-800">
              {data.platforms.video.map((platform, i) => (
                <div key={i} className="flex items-center justify-center gap-1 py-2">
                  <span className="text-gray-300">{platform}</span>
                  <Check className="w-3 h-3 text-green-400" />
                </div>
              ))}
            </div>

            {/* 内容分发平台 */}
            <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">内容分发平台</div>
            <div className="divide-y divide-gray-800">
              <div className="flex gap-3 px-3 py-2">
                <span className="text-gray-500 w-16 flex-shrink-0">自媒体平台</span>
                <span className="text-gray-300">{data.platforms.content.join('、')}</span>
              </div>
              <div className="flex gap-3 px-3 py-2">
                <span className="text-gray-500 w-16 flex-shrink-0">权威媒体</span>
                <span className="text-gray-300">{data.platforms.media.join('、')}</span>
              </div>
              <div className="flex gap-3 px-3 py-2">
                <span className="text-gray-500 w-16 flex-shrink-0">地图/本地</span>
                <span className="text-gray-300">{data.platforms.map.join('、')}</span>
              </div>
              <div className="flex gap-3 px-3 py-2">
                <span className="text-gray-500 w-16 flex-shrink-0">商业平台</span>
                <span className="text-gray-300">{data.platforms.business.join('、')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 套餐对比 - 推荐优先模式 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">服务套餐</h2>
          
          {/* 三个套餐平铺展示 */}
          <div className="space-y-3">
            {/* AI同城榜 - 推荐款 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-green-500/10 rounded-xl border border-purple-500/40 p-4">
              <div className="text-lg font-bold text-white mb-1">{data.packages[0].name}</div>
              <div className="text-xl font-bold text-green-400 mb-1">{data.packages[0].price}</div>
              <p className="text-sm text-gray-400 mb-2">{data.packages[0].desc}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm text-yellow-400">推荐：{data.packages[0].recommend}</span>
              </div>
            </div>

            {/* 短视频同城榜 */}
            <div className="bg-[#111] rounded-xl border border-gray-800 p-4">
              <div className="text-lg font-bold text-white mb-1">{data.packages[1].name}</div>
              <div className="text-xl font-bold text-green-400 mb-1">{data.packages[1].price}</div>
              <p className="text-sm text-gray-400 mb-2">{data.packages[1].channels}</p>
              <div className="flex items-center gap-1">
                <span className="text-blue-400">📝</span>
                <span className="text-sm text-blue-400">适合：{data.packages[1].suitable}</span>
              </div>
            </div>

            {/* 大模型同城榜 */}
            <div className="bg-[#111] rounded-xl border border-gray-800 p-4">
              <div className="text-lg font-bold text-white mb-1">{data.packages[2].name}</div>
              <div className="text-xl font-bold text-green-400 mb-1">{data.packages[2].price}</div>
              <p className="text-sm text-gray-400 mb-2">{data.packages[2].channels}</p>
              <div className="flex items-center gap-1">
                <span className="text-blue-400">📝</span>
                <span className="text-sm text-blue-400">适合：{data.packages[2].suitable}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 功能对比 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">功能对比</h2>
          <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-3 border-b border-gray-800">
              <div className="p-3 text-sm text-gray-400 font-medium">功能</div>
              <div className="p-3 text-sm text-gray-300 text-center">短视频同城榜</div>
              <div className="p-3 text-sm text-gray-300 text-center">大模型同城榜</div>
            </div>
            {/* 功能行 */}
            {[
              { name: 'AI智能榜单内容', video: true, ai: true },
              { name: '多平台分发', video: true, ai: true },
              { name: '关键词策略定制', video: true, ai: true },
              { name: '权威媒体背书', video: false, ai: true },
              { name: '短视频搜索矩阵', video: true, ai: false },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-gray-800/50 last:border-0">
                <div className="p-3 text-sm text-gray-400">{row.name}</div>
                <div className="p-3 text-center">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.video ? 'bg-green-500/30 text-green-400' : 'bg-gray-700 text-gray-500'}`}>
                    {row.video ? '●' : '○'}
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className={`inline-block w-4 h-4 rounded-full ${row.ai ? 'bg-green-500/30 text-green-400' : 'bg-gray-700 text-gray-500'}`}>
                    {row.ai ? '●' : '○'}
                  </span>
                </div>
              </div>
            ))}
            {/* 图例 */}
            <div className="p-3 border-t border-gray-800 text-center">
              <span className="text-xs text-gray-500">
                <span className="text-green-400">●</span> = 有   <span className="text-gray-500">○</span> = 无
              </span>
            </div>
          </div>
        </section>

        {/* 服务流程 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">服务流程</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.processSteps.map((step, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{step.step}</span>
                  </div>
                  <h4 className="font-medium text-gray-200 text-sm">{step.title}</h4>
                </div>
                <ul className="space-y-0.5 pl-8">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-xs text-gray-500">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 行业案例实证 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">客户案例</h2>
          <div className="space-y-2">
            {data.cases.map((c, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                <h4 className="text-white font-medium text-sm mb-2">{c.title}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="text-gray-500">见效速度：</span>
                    <span className="text-green-400">{c.speed}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">关键词：</span>
                    <span className="text-gray-300">{c.keyword}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">关键策略：</span>
                    <span className="text-gray-300">{c.strategy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 付费方式 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">{data.installmentNote.title}</h2>
          
          {/* 阶段一 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">阶段一</span>
              <span className="text-white font-bold text-sm">{data.installmentNote.phaseOne.title}</span>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/30 p-4">
              {/* 步骤流程展示 */}
              <div className="flex items-center gap-3">
                {/* 步骤1：先付启动 */}
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{data.installmentNote.phaseOne.steps[0].price}</div>
                  <div className="text-xs text-gray-400 mb-2">{data.installmentNote.phaseOne.steps[0].label}</div>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {data.installmentNote.phaseOne.steps[0].services?.map((s, i) => (
                      <span key={i} className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-gray-300">{s}</span>
                    ))}
                  </div>
                  {data.installmentNote.phaseOne.steps[0].target && (
                    <p className="text-xs text-purple-400">🎯 {data.installmentNote.phaseOne.steps[0].target}</p>
                  )}
                </div>
                
                {/* 箭头 */}
                <div className="flex flex-col items-center text-gray-500 flex-shrink-0">
                  <span className="text-xs mb-1">上榜后</span>
                  <span className="text-lg">→</span>
                </div>
                
                {/* 步骤2：补尾款 */}
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{data.installmentNote.phaseOne.steps[1].price}</div>
                  <div className="text-xs text-gray-400 mb-2">{data.installmentNote.phaseOne.steps[1].label}</div>
                  {data.installmentNote.phaseOne.steps[1].note && (
                    <p className="text-xs text-green-400">✅ {data.installmentNote.phaseOne.steps[1].note}</p>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-gray-400 text-center pt-3 mt-3 border-t border-white/10">
                💡 AI 同城榜 <span className="text-purple-400">¥6,980</span> 启动，上榜后补齐尾款 <span className="text-green-400">¥13,000</span>
              </p>
            </div>
          </div>
          
          {/* 阶段二 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded">阶段二</span>
              <span className="text-white font-bold text-sm">{data.installmentNote.phaseTwo.title}</span>
            </div>
            
            <div className="space-y-2">
              {data.installmentNote.phaseTwo.options.map((option, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    option.highlight 
                      ? 'bg-gradient-to-r from-purple-500/10 to-green-500/5 border-purple-500/40' 
                      : 'bg-[#111] border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {option.highlight && (
                        <span className="text-xs text-purple-400 font-medium">推荐</span>
                      )}
                      <h4 className="text-white font-bold text-sm">{option.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-white">{option.price}</span>
                        <span className="text-xs text-gray-400">{option.unit}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {option.tags?.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx}
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          option.highlight 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">常见问题</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                <p className="font-medium text-gray-200 text-sm mb-1">{faq.q}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-4">
          <p className="text-gray-400 text-sm mb-4">
            抓住 AI 搜索红利，让你的品牌成为本地搜索的第一答案
          </p>
          <Link href="/employees/city-ranking">
            <Button
              size="lg"
              className="h-12 px-8 text-sm rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
            >
              💬 申请体验
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </section>
      </article>
    </div>
  );
}
