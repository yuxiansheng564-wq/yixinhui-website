'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy, Handshake, Beaker, Building2, Smartphone, GraduationCap, Target,
  ArrowRight, ArrowDown, Code, BookOpen, Lightbulb, Check, ChevronDown, ChevronUp, AlertTriangle, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { BookingModal } from '@/components/booking-modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Ability {
  name: string;
  description: string;
}

interface PackageTable {
  headers: string[];
  rows: { label: string; values: string[]; isPrice?: boolean }[];
}

interface ProcessStep {
  step: string;
  title: string;
  items: string[];
}

interface Case {
  title: string;
  subtitle?: string;
  layout?: 'left-right' | 'cards' | 'stack';
  // left-right布局
  leftSection?: {
    title?: string;
    content: string;
    highlight?: string[];
  };
  rightSection?: {
    title?: string;
    summary?: string;
    cards?: { value: string; label: string }[];
    content?: string;
    highlight?: string;
    highlights?: {
      title: string;
      cards?: { value: string; label: string }[];
      content?: string;
    }[];
  };
  // stack布局
  background?: string;
  keywords?: string[];
  highlightsTitle?: string;
  highlights?: {
    title: string;
    subtitle?: string;
    items: { label: string; desc: string }[];
  }[];
  clientCaseTitle?: string;
  clientCases?: {
    title: string;
    rows: { label: string; value: string }[];
  }[];
}

interface Employee {
  id: string;
  icon: React.ReactNode;
  iconSmall: React.ReactNode;
  name: string;
  englishName: string;
  slogan: string;
  position: string;
  description: string;
  abilities: Ability[];
  knowledgeBase: string[];
  hiddenSkills: string[];
  color: string;
  video?: {
    src: string;
  };
  category: string;
  categoryLabel: string;
  // 额外内容
  painPoints?: { title: string; desc: string }[];
  features?: { name: string; desc: string }[];
  platforms?: { category: string; items: string[] }[];
  searchComparison?: {
    traditional: { title: string; platforms: string[]; desc: string };
    ai: { title: string; platforms: string[]; desc: string; highlight?: string };
    content: { title: string; platforms: string[]; desc: string };
  };
  packages?: { name: string; desc: string; features: string[] }[];
  packageTable?: PackageTable;
  processSteps?: ProcessStep[];
  cases?: Case[];
  installmentNote?: {
    title: string;
    phaseOne?: {
      title: string;
      steps: {
        price: string;
        label: string;
        services?: string[];
        target?: string;
        note?: string;
      }[];
      remark?: string;
    };
    phaseTwo?: {
      title: string;
      options: {
        name: string;
        price: string;
        unit: string;
        desc: string;
        highlight?: boolean;
        tags?: string[];
      }[];
    };
  };
  abOptions?: { label: string; desc: string }[];
  abComparison?: {
    title: string;
    options: {
      name: string;
      items: { label: string; value: string }[];
    }[];
    note?: string;
  };
  faqs?: { q: string; a: string }[];
}

// 所有数字员工数据
const employees: Employee[] = [
  // AI销售
  {
    id: 'sales-grandmaster',
    icon: <Trophy className="w-16 h-16" />,
    iconSmall: <Trophy className="w-5 h-5" />,
    name: '销售大宗师',
    englishName: 'The Sales Grandmaster',
    slogan: '复制你的销冠基因',
    position: '金牌销售教练与军师',
    description: '你专属的金牌销售教练与军师。基于SPIN提问法深挖客户隐性痛点，自动分析客户意向度，遇到刁钻问题实时给出高情商回复话术，将顶级销售的经验固化为流程，让小白也能像销冠一样销售。',
    abilities: [
      { name: '深挖需求', description: '基于 SPIN 提问法，透过现象挖掘客户背后的隐性痛点。' },
      { name: '真伪判断', description: '自动分析客户意向度，快速识别"白嫖党"与"准客户"。' },
      { name: '话术导航', description: '遇到刁钻问题，实时给出高情商回复话术。' },
      { name: '技能复刻', description: '将顶级销售的经验固化为流程，让小白也能像销冠一样销售。' },
    ],
    knowledgeBase: [
      'SPIN销售法',
      '麦肯锡咨询方法论',
      '顾问式销售',
      '大客户开发',
    ],
    hiddenSkills: [
      '识别客户潜台词',
      '判断成交时机',
      '处理反对意见的50+技巧',
      '建立信任的心理学技巧',
    ],
    color: 'from-purple-500 to-purple-600',
    video: {
      src: 'https://player.bilibili.com/player.html?isOutside=true&aid=116028893826127&bvid=BV1NFFsz8Ech&cid=35888628952&p=1&autoplay=0&high_quality=1&danmaku=0&as_wide=1&muted=0',
    },
    category: 'sales',
    categoryLabel: 'AI销售',
    painPoints: [
      { title: '老销售离职，带走客户和经验', desc: '多年积累的客户关系和销售技巧随之流失，新人需要从头开始。' },
      { title: '新人培训3个月，转化率仍不及格', desc: '传统培训方式效率低，新人成长缓慢，影响团队业绩。' },
      { title: '同样话术，不同销售效果差10倍', desc: '销售能力参差不齐，无法复制顶级销售的成功经验。' },
    ],
  },
  {
    id: 'negotiation-master',
    icon: <Handshake className="w-16 h-16" />,
    iconSmall: <Handshake className="w-5 h-5" />,
    name: '商务谈判大师',
    englishName: 'The Negotiation Master',
    slogan: '智能博弈，无往不利',
    position: '法律顾问与谈判专家',
    description: '你随身携带的法律顾问与谈判专家。实时分析谈判会议中的关键信息，捕捉对方态度变化和潜在利益点，自动生成专业的合同条款、协议草案和商务文档，基于博弈论分析谈判局势，制定最优谈判路径和让步策略。',
    abilities: [
      { name: '会议觉察', description: '实时分析谈判会议中的关键信息，捕捉对方态度变化和潜在利益点。' },
      { name: '文书生成', description: '自动生成专业的合同条款、协议草案和商务文档，确保法律条款严谨。' },
      { name: '博弈策略', description: '基于博弈论分析谈判局势，制定最优谈判路径和让步策略。' },
    ],
    knowledgeBase: [
      '哈佛谈判理论',
      '合同法实务',
      '商务礼仪',
      '风险管理',
    ],
    hiddenSkills: [
      '识别对方底牌',
      '制造谈判筹码',
      '双赢方案设计',
      '危机化解技巧',
    ],
    color: 'from-blue-500 to-cyan-500',
    category: 'sales',
    categoryLabel: 'AI销售',
  },
  // AI获客
  {
    id: 'content-alchemist',
    icon: <Beaker className="w-16 h-16" />,
    iconSmall: <Beaker className="w-5 h-5" />,
    name: '内容炼金术士',
    englishName: 'The Content Alchemist',
    slogan: '将日常碎片信息炼成黄金内容',
    position: 'AI内容创作专家',
    description: '创作灵感枯竭？不知道做什么内容？我们提供全新AI创作方法。现在你只需要把你和客户、朋友之间的沟通录音保存下来，内容炼金术士就会为你提炼成平台文案级别的文案，让你创作再无瓶颈。',
    abilities: [
      { name: '内置方法论', description: '集成爆款内容创作方法论，将碎片信息快速转化为高质量内容。' },
      { name: '素材重组', description: '智能重组和优化现有素材，最大化内容价值，提升复用率。' },
    ],
    knowledgeBase: [
      '文案写作法则',
      'AIDA模型',
      '故事营销',
      'SEO优化',
    ],
    hiddenSkills: [
      '爆款标题生成',
      '情绪价值植入',
      '用户痛点挖掘',
      '转化率优化',
    ],
    color: 'from-orange-500 to-red-500',
    category: 'customer',
    categoryLabel: 'AI获客',
    painPoints: [
      { title: '每天不知道发什么内容，灵感枯竭', desc: '创作压力大，找不到持续输出的素材来源。' },
      { title: '内容质量参差不齐，平台不推荐', desc: '没有系统的创作方法，内容质量不稳定。' },
      { title: '创作效率低，跟不上平台节奏', desc: '手工创作耗时耗力，错过热点时机。' },
    ],
  },
  {
    id: 'ip-replicator',
    icon: <Building2 className="w-16 h-16" />,
    iconSmall: <Building2 className="w-5 h-5" />,
    name: 'IP内容复刻大师',
    englishName: 'The IP Content Replicator',
    slogan: '打造你的个人品牌帝国',
    position: '个人品牌总设计师',
    description: '你个人品牌的总设计师。从零规划个人品牌战略，制定内容矩阵和增长路径，确保所有内容风格一致，强化品牌辨识度，打造专业形象。',
    abilities: [
      { name: '顶层设计', description: '从零规划个人品牌战略，制定内容矩阵和增长路径。' },
      { name: '风格统一', description: '确保所有内容风格一致，强化品牌辨识度，打造专业形象。' },
    ],
    knowledgeBase: [
      '个人品牌方法论',
      '内容矩阵策略',
      '社群运营',
      '用户增长',
    ],
    hiddenSkills: [
      'IP定位',
      '人设打造',
      '私域流量转化',
      '复购率提升',
    ],
    color: 'from-purple-500 to-purple-600',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  {
    id: 'viral-squad',
    icon: <Smartphone className="w-16 h-16" />,
    iconSmall: <Smartphone className="w-5 h-5" />,
    name: '爆款战术小队',
    englishName: 'The Viral Content Squad',
    slogan: '小红书 + 朋友圈双料专家',
    position: '社交媒体内容创作团队',
    description: '你的社交媒体内容创作团队。精通小红书平台算法，创作高热度图文内容，提升品牌曝光，撰写高转化朋友圈文案，激活私域流量，提升用户互动和转化。',
    abilities: [
      { name: '小红书图文', description: '精通小红书平台算法，创作高热度图文内容，提升品牌曝光。' },
      { name: '朋友圈文案', description: '撰写高转化朋友圈文案，激活私域流量，提升用户互动和转化。' },
    ],
    knowledgeBase: [
      '小红书算法',
      '热门话题库',
      '视觉设计',
      '排版美学',
    ],
    hiddenSkills: [
      '蹭热点',
      '打造人设',
      '种草话术',
      '评论区互动',
    ],
    color: 'from-pink-500 to-purple-500',
    category: 'customer',
    categoryLabel: 'AI获客',
  },
  {
    id: 'city-ranking',
    icon: <Target className="w-16 h-16" />,
    iconSmall: <Target className="w-5 h-5" />,
    name: 'AI同城榜',
    englishName: 'AI City Ranking',
    slogan: '让你的品牌成为本地搜索的第一答案',
    position: '全网搜索排名专家',
    description: '无论客户在抖音搜，还是用豆包、元宝、DeepSeek等AI搜索，搜"你的城市+你的行业"，第一个看到的就是你。',
    abilities: [
      { name: 'AI智能内容矩阵', description: '批量生成高质量榜单内容，精准命中搜索算法，实现搜索结果TOP5稳定占位。' },
      { name: '全域多平台覆盖', description: '10+平台同步铺设，数据互相抓取，实现排名叠加效应，构建完整的搜索基础设施。' },
      { name: '权威媒体背书', description: '通过搜狐、网易等权威渠道发布，大幅提升品牌可信度与搜索引擎权重。' },
    ],
    knowledgeBase: [
      'GEO搜索引擎优化',
      '抖音搜索排名算法',
      'AI搜索（豆包/元宝/DeepSeek）',
      '多平台内容分发策略',
      '权威媒体背书方法',
    ],
    hiddenSkills: [
      '关键词挖掘与策略',
      '竞品排名分析',
      '搜索权重提升技巧',
      '本地化SEO优化',
      '内容矩阵搭建',
    ],
    color: 'from-orange-500 to-purple-500',
    category: 'customer',
    categoryLabel: 'AI获客',
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
    // AI搜索 vs 传统搜索对比
    searchComparison: {
      traditional: {
        title: '传统搜索引擎',
        platforms: ['百度', '搜狗', '360'],
        desc: '覆盖传统PC端搜索用户',
      },
      ai: {
        title: 'AI搜索引擎·AI搜索',
        platforms: ['豆包', '元宝', 'DeepSeek', 'Kimi', '文心一言', '通义千问'],
        desc: '覆盖新一代AI搜索用户',
        highlight: '搜索结果直接推荐，用户更信任',
      },
      content: {
        title: 'AI搜索引擎·内容&生活平台',
        platforms: ['抖音搜索', '快手搜索', '小红书', '高德地图', '百度地图'],
        desc: '覆盖本地生活搜索场景',
      },
    },
    packageTable: {
      headers: ['套餐对比', '短视频同城榜', '大模型同城榜', 'AI同城榜'],
      rows: [
        { label: '一句话说明', values: ['短视频平台搜索排名', 'AI搜索排名', '短视频平台搜索+AI搜索全覆盖'] },
        { label: '覆盖渠道', values: ['抖音、快手、小红书、视频号', '豆包、元宝、DeepSeek、千问\n等AI搜索', '短视频平台搜索\n+AI搜索全覆盖'] },
        { label: 'AI智能榜单内容', values: ['✅', '✅', '✅'] },
        { label: '多平台分发', values: ['✅', '✅', '✅'] },
        { label: '权威媒体背书', values: ['—', '✅', '✅'] },
        { label: '关键词策略定制', values: ['✅', '✅', '✅'] },
        { label: '短视频搜索矩阵', values: ['✅', '—', '✅'] },
        { label: '效果承诺', values: ['5个关键词\n上短视频搜索排名', '至少5个关键词\n品牌搜索首屏或TOP5', '享有两个产品\n全部权益'] },
        { label: '价格', values: ['¥9,980', '¥9,980', '¥19,800'], isPrice: true },
      ],
    },
    // 服务流程
    processSteps: [
      { step: '01', title: '行业诊断&关键词策略', items: ['分析行业、区域、客群', '锁定流量高、竞争度低的蓝海词', '定制差异化占位方案'] },
      { step: '02', title: '内容生产&权威背书', items: ['AI智能生成榜单内容', '通过权威媒体渠道发布', '提升品牌可信度'] },
      { step: '03', title: '全域分发&排名优化', items: ['10+平台同步铺设', '精准命中搜索算法', '确保品牌稳定出现在TOP5'] },
      { step: '04', title: '排名监控&持续优化', items: ['实时监控全网排名变化', '根据算法波动持续更新内容', '维持排名长期稳定'] },
    ],
    // 效果案例
    cases: [
      { 
        title: 'AI同城榜效果实证',
        layout: 'stack',
        highlightsTitle: '实证效果',
        highlights: [
          {
            title: '1天上榜见效快',
            subtitle: '大部分行业3～7天',
            items: [
              { label: '最快1天上排位', desc: '竞争少的行业当天即可见效' },
              { label: '竞争激烈要1周', desc: '大部分行业在一周内完成排名占位' },
              { label: '权威渠道加速', desc: '通过搜狐、网易等权威媒体发布，第二天排名即可上升' },
              { label: '蓝海词切入策略', desc: '避开高竞争大词，利用AI问诊锁定高意向蓝海词' },
              { label: '红利期窗口', desc: '目前处于AI搜索红利期，抢占先机效果更快' },
            ],
          },
          {
            title: '持续TOP5排名稳',
            subtitle: '权威背书+效果稳定',
            items: [
              { label: '权威渠道高权重', desc: '搜狐、网易等权威媒体发布，搜索引擎给予更高权重' },
              { label: '可信度大幅提升', desc: '权威媒体背书直接增强潜在客户信任感，缩短成交路径' },
              { label: '排名效果稳定', desc: '不同于广告停投即停，搜索排名资产持续有效' },
              { label: '多平台叠加效应', desc: '10+平台数据互相抓取，形成排名叠加，稳定占据TOP5' },
              { label: '持续优化维护', desc: '实时监控排名变化，根据算法波动持续更新内容' },
              { label: '质保30天+续费', desc: '上榜质保30天，后续可5折续费维持排名' },
            ],
          },
          {
            title: '3～5天全网可见',
            subtitle: '工业化生产+规模化分发',
            items: [
              { label: 'AI智能混剪矩阵', desc: '2小时内批量制作120条视频内容' },
              { label: '工业化生产效率', desc: '自动匹配行业搜索关键词，标准化内容产出' },
              { label: '批量化内容矩阵', desc: '1000条视频/榜单内容矩阵快速生成' },
              { label: '全网快速分发', desc: '10+平台同步铺设（抖音/快手/百度/小红书等）' },
              { label: '3-5天全网可见', desc: '算法精准命中，快速收录，规模化流量获取' },
              { label: '覆盖关键词全面', desc: '搜索关键词全覆盖策略，实现搜索结果霸屏效果' },
            ],
          },
        ],
        clientCaseTitle: '客户案例',
        clientCases: [
          {
            title: '意心会·AI智能体培训',
            rows: [
              { label: '见效速度', value: '1天上榜' },
              { label: '关键词', value: '重庆AI智能体培训' },
              { label: '关键策略', value: '垂直行业词 + 城市词组合' },
            ],
          },
          {
            title: '昭阳琴行·钢琴租赁',
            rows: [
              { label: '见效速度', value: '1天上榜' },
              { label: '关键词', value: '沈阳租琴' },
              { label: '关键策略', value: '本地蓝海词精准覆盖' },
            ],
          },
          {
            title: '相木相林·全屋定制',
            rows: [
              { label: '见效速度', value: '1天打上排名' },
              { label: '内容投入', value: '一篇榜单内容' },
              { label: '排名效果', value: '搜索"全屋定制"相关关键词稳定出现在TOP5' },
              { label: '关键策略', value: '蓝海词切入（"儿童房全屋定制""环保材料全屋定制"）' },
            ],
          },
          {
            title: '朱炳仁铜·高端礼品',
            rows: [
              { label: '排名效果', value: '搜索结果TOP5稳定占位' },
              { label: '搜索展示', value: '多个关键词搜索均可见品牌' },
              { label: '品牌效果', value: '客户搜过来发现"到处都是我们" → 极强品牌背书' },
              { label: '关键策略', value: '关键词从行业术语转为用户真实搜索词' },
            ],
          },
          {
            title: '曹大掌柜·文玩核桃（百万粉博主）',
            rows: [
              { label: '见效速度', value: '1小时，三个AI平台均排名第一' },
              { label: '覆盖平台', value: '豆包、元宝、通义千问' },
              { label: '核心价值', value: '百万粉博主在AI搜索中从零到第一' },
              { label: '关键策略', value: '精准长尾词 + 7平台同步分发 + 权威媒体背书' },
            ],
          },
          {
            title: '长春无印优品·工作服定制',
            rows: [
              { label: '排名效果', value: '搜"长春工作服"排名第二' },
              { label: '搜索覆盖', value: '抖音搜索前18条中大部分为其内容' },
              { label: '关键策略', value: '抖音搜索优化 + 关键词矩阵覆盖' },
            ],
          },
        ],
      },
    ],
    // 付费方式
    installmentNote: {
      title: '付费方式',
      // 阶段一：首期启动
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
      // 阶段二：运营模式选择
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
  },
  // 专业服务 AI 化
  {
    id: 'teaching-assistant',
    icon: <GraduationCap className="w-16 h-16" />,
    iconSmall: <GraduationCap className="w-5 h-5" />,
    name: 'AI 课程助教',
    englishName: 'The AI Teaching Assistant',
    slogan: '24/7 专业课程助手',
    position: '课程运营专家',
    description: '你专属的课程运营专家。为学员提供24/7的智能辅导，解答学习疑问，自动批改作业和练习，提供个性化反馈，根据学员进度智能推荐学习内容和路径。',
    abilities: [
      { name: '课程辅导', description: '为学员提供24/7的智能辅导，解答学习疑问。' },
      { name: '作业批改', description: '自动批改作业和练习，提供个性化反馈。' },
      { name: '学习路径', description: '根据学员进度智能推荐学习内容和路径。' },
    ],
    knowledgeBase: [
      '教育心理学',
      '课程设计',
      '教学方法',
      '学习评估',
    ],
    hiddenSkills: [
      '学习动机激发',
      '个性化学习',
      '进度追踪',
      '学习效果优化',
    ],
    color: 'from-cyan-500 to-blue-500',
    category: 'consulting',
    categoryLabel: '专业服务 AI 化',
  },
  {
    id: 'consultant-assistant',
    icon: <Target className="w-16 h-16" />,
    iconSmall: <Target className="w-5 h-5" />,
    name: '咨询专家助手',
    englishName: 'The Expert Consultant Assistant',
    slogan: '专业咨询支持',
    position: '咨询业务助理',
    description: '你智能的咨询业务助理。快速理解客户需求，提供初步方案建议，基于客户需求自动生成咨询方案框架，快速检索专业知识库，支持复杂问题解答。',
    abilities: [
      { name: '需求分析', description: '快速理解客户需求，提供初步方案建议。' },
      { name: '方案生成', description: '基于客户需求自动生成咨询方案框架。' },
      { name: '知识检索', description: '快速检索专业知识库，支持复杂问题解答。' },
    ],
    knowledgeBase: [
      '咨询方法论',
      '行业知识',
      '案例分析',
      '最佳实践',
    ],
    hiddenSkills: [
      '客户洞察',
      '问题诊断',
      '方案优化',
      '价值评估',
    ],
    color: 'from-indigo-500 to-purple-500',
    category: 'consulting',
    categoryLabel: '专业服务 AI 化',
  },
];

// 获取同分类的其他员工
const getRelatedEmployees = (currentId: string, category: string) => {
  return employees.filter(e => e.category === category && e.id !== currentId);
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const employeeId = params.id as string;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // 查找当前员工
  const employee = employees.find(e => e.id === employeeId);

  // 如果找不到员工
  if (!employee) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="text-2xl text-white mb-4">未找到该数字员工</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const relatedEmployees = getRelatedEmployees(employee.id, employee.category);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={employee.categoryLabel}
      />

      {/* 返回导航 */}
      <div className="max-w-4xl mx-auto px-4 pt-20 sm:pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-white transition-colors text-xs"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          返回首页
        </Link>
      </div>

      {/* 主内容区 - OpenAI 风格 */}
      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 元信息栏 */}
        <FadeInUp>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mb-4">
            <span>{employee.categoryLabel}</span>
            <span>·</span>
            <span>Digital Employee</span>
          </div>
        </FadeInUp>

        {/* 主标题 */}
        <FadeInUp delay={50}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center leading-tight mb-2">
            {employee.name}
          </h1>
          <p className="text-gray-600 text-center text-xs uppercase tracking-widest mb-3">{employee.englishName}</p>
        </FadeInUp>

        {/* 标语 */}
        <FadeInUp delay={80}>
          <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-center font-bold mb-3">
            {employee.slogan}
          </p>
        </FadeInUp>

        {/* 描述 */}
        <FadeInUp delay={100}>
          <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed max-w-2xl mx-auto">
            {employee.description}
          </p>
        </FadeInUp>

        {/* AI同城榜产品演示视频 */}
        {employee.id === 'city-ranking' && (
          <FadeInUp delay={120}>
            <div className="mb-8">
              <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src="//player.bilibili.com/player.html?isOutside=true&aid=116135680871445&bvid=BV1kRfeBSExS&cid=36298424666&p=1"
                  className="w-full h-full"
                  scrolling="no"
                  frameBorder="0"
                  allow="clipboard-write; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeInUp>
        )}

        {/* 场景痛点 */}
        {employee.painPoints && employee.painPoints.length > 0 && (
          <FadeInUp delay={150}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">传统获客之困</h2>
              <div className="grid grid-cols-2 gap-3">
                {employee.painPoints.map((point, idx) => (
                  <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 p-3">
                    <span className="text-red-400 font-semibold text-sm">{point.title}</span>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeInUp>
        )}

        {/* 视频区域 */}
        {employee.video && (
          <FadeInUp delay={180}>
            <div className="mb-8">
              <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src={employee.video.src}
                  className="w-full h-full"
                  scrolling="no"
                  frameBorder="0"
                  allow="clipboard-write; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeInUp>
        )}

        {/* 功能特性 */}
        {employee.features && employee.features.length > 0 && (
          <FadeInUp delay={200}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">AI同城榜服务是做什么的？</h2>
              <div className="grid grid-cols-2 gap-3">
                {employee.features.map((feature, idx) => (
                  <details key={idx} className="group bg-[#111] rounded-lg border border-gray-800">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer list-none">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-white font-semibold text-sm">{feature.name}</span>
                      <ChevronDown className="w-4 h-4 text-gray-600 group-open:rotate-180 transition-transform ml-auto" />
                    </summary>
                    <p className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                  </details>
                ))}
              </div>
            </section>
          </FadeInUp>
        )}

        {/* AI同城榜服务不做什么 */}
        <FadeInUp delay={210}>
          <section className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">AI同城榜服务不做什么？</h2>
            <div className="bg-[#111] rounded-lg border border-gray-800 divide-y divide-gray-800">
              <div className="flex items-center gap-3 p-3">
                <span className="text-red-400 text-sm">❌ 代运营</span>
                <span className="text-gray-500 text-xs">做的是搜索排名，不是内容代运营</span>
              </div>
              <div className="flex items-center gap-3 p-3">
                <span className="text-red-400 text-sm">❌ 一次性投放</span>
                <span className="text-gray-500 text-xs">排名需要持续维护</span>
              </div>
              <div className="flex items-center gap-3 p-3">
                <span className="text-red-400 text-sm">❌ 保证询盘量</span>
                <span className="text-gray-500 text-xs">保证排名结果，转化取决于你</span>
              </div>
            </div>
          </section>
        </FadeInUp>

        {/* AI同城榜可覆盖平台 */}
        {employee.id === 'city-ranking' && (
          <FadeInUp delay={220}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-1">AI 同城榜可覆盖平台</h2>
              <p className="text-xs text-gray-500 mb-3">各平台互相抓取数据，一处有 = 处处有</p>
              
              <div className="bg-[#111] rounded-lg border border-gray-800 overflow-hidden text-xs">
                {/* AI搜索引擎 */}
                <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">AI搜索引擎（AI搜索排名）</div>
                <div className="grid grid-cols-4 divide-x divide-gray-800 border-b border-gray-800">
                  {['豆包', '元宝', 'DeepSeek', '通义千问'].map((platform, i) => (
                    <div key={i} className="flex items-center justify-center gap-1.5 py-2">
                      <span className="text-gray-300">{platform}</span>
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                  ))}
                </div>

                {/* 短视频搜索 */}
                <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">短视频搜索（短视频搜索排名）</div>
                <div className="grid grid-cols-4 divide-x divide-gray-800 border-b border-gray-800">
                  {['抖音搜索', '快手搜索', '小红书搜索', '视频号搜索'].map((platform, i) => (
                    <div key={i} className="flex items-center justify-center gap-1.5 py-2">
                      <span className="text-gray-300">{platform}</span>
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                  ))}
                </div>

                {/* 内容分发平台 */}
                <div className="px-3 py-2 bg-gray-800/30 text-gray-400 font-medium">内容分发平台</div>
                <div className="divide-y divide-gray-800">
                  <div className="flex gap-4 px-3 py-2">
                    <span className="text-gray-500 w-16 flex-shrink-0">自媒体平台</span>
                    <span className="text-gray-300">公众号、百家号、知乎、头条、企鹅号</span>
                  </div>
                  <div className="flex gap-4 px-3 py-2">
                    <span className="text-gray-500 w-16 flex-shrink-0">权威媒体</span>
                    <span className="text-gray-300">搜狐、网易等</span>
                  </div>
                  <div className="flex gap-4 px-3 py-2">
                    <span className="text-gray-500 w-16 flex-shrink-0">地图/本地</span>
                    <span className="text-gray-300">高德地图、百度地图</span>
                  </div>
                  <div className="flex gap-4 px-3 py-2">
                    <span className="text-gray-500 w-16 flex-shrink-0">商业平台</span>
                    <span className="text-gray-300">58同城、阿里巴巴</span>
                  </div>
                </div>
              </div>
            </section>
          </FadeInUp>
        )}

        {/* AI搜索 vs 传统搜索（其他员工） */}
        {employee.searchComparison && employee.id !== 'city-ranking' && (
          <FadeInUp delay={220}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-2">AI搜索 vs 传统搜索</h2>
              {employee.searchComparison.ai.highlight && (
                <p className="text-xs text-purple-400 mb-4">✨ {employee.searchComparison.ai.highlight}</p>
              )}
              <div className="grid grid-cols-3 gap-2">
                {/* 传统搜索引擎 */}
                <div className="p-3 bg-[#111] rounded-lg border border-gray-800">
                  <h4 className="font-medium text-gray-400 text-xs mb-2">{employee.searchComparison.traditional.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {employee.searchComparison.traditional.platforms.slice(0, 3).map((item, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-[#1a1a1a] text-gray-500 text-xs rounded">{item}</span>
                    ))}
                  </div>
                </div>
                {/* AI搜索引擎 */}
                <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/30">
                  <h4 className="font-medium text-purple-400 text-xs mb-2">{employee.searchComparison.ai.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {employee.searchComparison.ai.platforms.slice(0, 3).map((item, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">{item}</span>
                    ))}
                  </div>
                </div>
                {/* 内容&生活平台 */}
                <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/30">
                  <h4 className="font-medium text-purple-400 text-xs mb-2">{employee.searchComparison.content.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {employee.searchComparison.content.platforms.slice(0, 3).map((item, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </FadeInUp>
        )}

        {/* 覆盖平台（兼容旧数据） */}
        {employee.platforms && employee.platforms.length > 0 && !employee.searchComparison && (
          <FadeInUp delay={220}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">全域覆盖</h2>
              <div className="grid grid-cols-3 gap-2">
                {employee.platforms.map((platform, idx) => (
                  <div key={idx} className="p-3 bg-[#111] rounded-lg border border-gray-800">
                    <h4 className="font-semibold text-white text-sm mb-2">{platform.category}</h4>
                    <div className="space-y-1">
                      {platform.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-gray-400 truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInUp>
        )}

        {/* 行业案例实证 */}
        {employee.cases && employee.cases.length > 0 && (
          <FadeInUp delay={230}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">行业案例实证</h2>
              
              {employee.cases.map((caseItem, idx) => (
                <div key={idx} className="space-y-5">
                  {/* 实证效果区块 - 突出效果感 */}
                  {caseItem.highlights && caseItem.highlights.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-3">实证效果</h3>
                      <div className="flex flex-col gap-2">
                        {caseItem.highlights.map((hl, hlIdx) => (
                          <details key={hlIdx} className="group bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/20">
                            <summary className="cursor-pointer flex items-center justify-between p-3 list-none">
                              <h4 className="text-purple-300 font-bold text-sm">{hl.title}</h4>
                              <ChevronDown className="w-4 h-4 text-purple-400/50 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-3 pb-3">
                              <div className="space-y-1.5 border-t border-purple-500/10 pt-2">
                                {hl.items.map((item, i) => (
                                  <div key={i} className="text-xs">
                                    <p className="text-gray-300 font-medium">{item.label}</p>
                                    <p className="text-gray-500 mt-0.5">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 客户案例区块 - 突出案例感 */}
                  {caseItem.clientCases && caseItem.clientCases.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-3">客户案例</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {caseItem.clientCases.map((clientCase, ccIdx) => (
                          <details key={ccIdx} className="group bg-[#111] rounded-lg border border-gray-800">
                            <summary className="cursor-pointer flex items-center gap-3 p-3 list-none">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                              <h4 className="text-white font-medium text-sm flex-1 truncate">{clientCase.title}</h4>
                              <ChevronDown className="w-4 h-4 text-gray-600 group-open:rotate-180 transition-transform flex-shrink-0" />
                            </summary>
                            <div className="px-3 pb-3 pl-6">
                              <div className="space-y-1 border-t border-gray-800 pt-2">
                                {clientCase.rows.map((row, rowIdx) => (
                                  <div key={rowIdx} className="flex text-xs gap-2">
                                    <span className="text-gray-500 flex-shrink-0">{row.label}</span>
                                    <span className="text-gray-300">{row.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </FadeInUp>
        )}

        {/* 服务流程 */}
        {employee.processSteps && employee.processSteps.length > 0 && (
          <FadeInUp delay={240}>
            <section className="mb-12">
              <h2 className="text-lg font-bold text-white mb-4">服务流程</h2>
              <div className="grid grid-cols-2 gap-2">
                {employee.processSteps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-[#111] rounded-lg border border-gray-800">
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
          </FadeInUp>
        )}

        {/* 套餐对比表格（AI全域同城榜专用） */}
        {employee.packageTable && (
          <FadeInUp delay={240}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">服务套餐</h2>
              {/* 对比表格 */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin rounded-lg border border-gray-800">
                <table className="min-w-[640px] w-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/50">
                      {employee.packageTable.headers.map((header, idx) => (
                        <th 
                          key={idx} 
                          className={`py-3 px-3 text-xs font-semibold ${idx === 0 ? 'sticky left-0 bg-black text-left text-gray-400 z-20 border-r border-gray-700' : 'text-center text-white'}`}
                        >
                          {header}
                          {idx === 3 && <span className="ml-1 text-xs bg-purple-500 text-white px-1.5 py-0.5 rounded">推荐</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employee.packageTable.rows.map((row, idx) => (
                      <tr key={idx} className={`border-b border-gray-800/50 last:border-0 ${row.isPrice ? 'bg-gray-900/50' : ''}`}>
                        <td className={`py-2.5 px-3 text-xs text-gray-400 whitespace-nowrap sticky left-0 z-20 border-r border-gray-700 ${row.isPrice ? 'bg-gray-900' : 'bg-black'}`}>{row.label}</td>
                        {row.values.map((val, valIdx) => (
                          <td key={valIdx} className={`py-2.5 px-3 text-xs text-center whitespace-pre-line leading-relaxed ${row.isPrice ? 'text-white font-bold text-base' : val === '✅' ? 'text-green-400' : val === '—' ? 'text-gray-600' : 'text-gray-300'}`}>
                            {val === '✅' ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 bg-green-500/20 rounded">
                                <Check className="w-3 h-3 text-green-400" />
                              </span>
                            ) : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </FadeInUp>
        )}

        {/* 付费方式 */}
        {employee.installmentNote && (
          <FadeInUp delay={250}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">{employee.installmentNote.title}</h2>
              
              {/* 阶段一：首期启动按效果付费 */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">阶段一</span>
                  <span className="text-white font-bold text-sm">{employee.installmentNote.phaseOne?.title}</span>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/30 p-4">
                  {/* 流程步骤 */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center">
                    {/* 步骤1 */}
                    <div className="flex-1 sm:text-center">
                      <div className="inline-flex flex-col items-start sm:items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-2xl font-bold text-white">¥3,980</span>
                          <span className="text-xs text-gray-400">先付启动</span>
                        </div>
                        <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                          <span className="px-1.5 py-0.5 bg-white/5 rounded">关键词策略</span>
                          <span className="px-1.5 py-0.5 bg-white/5 rounded">内容生产</span>
                          <span className="px-1.5 py-0.5 bg-white/5 rounded">全平台分发</span>
                        </div>
                        <div className="mt-2 text-xs text-purple-400 font-medium">
                          🎯 目标：5个关键词上榜
                        </div>
                      </div>
                    </div>
                    
                    {/* 箭头 */}
                    <div className="hidden sm:flex items-center justify-center px-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <div className="w-8 h-[2px] bg-gradient-to-r from-purple-500 to-gray-600"></div>
                        <span className="text-xs">上榜后</span>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-gray-600 to-green-500"></div>
                      </div>
                    </div>
                    
                    {/* 移动端箭头 */}
                    <div className="sm:hidden flex items-center justify-center py-2">
                      <div className="flex flex-col items-center text-gray-500">
                        <span className="text-xs mb-1">上榜后</span>
                        <div className="w-[2px] h-4 bg-gradient-to-b from-purple-500 to-green-500"></div>
                      </div>
                    </div>
                    
                    {/* 步骤2 */}
                    <div className="flex-1 sm:text-center">
                      <div className="inline-flex flex-col items-start sm:items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-2xl font-bold text-green-400">¥6,000</span>
                          <span className="text-xs text-gray-400">补尾款</span>
                        </div>
                        <div className="text-xs text-green-400">
                          ✅ 效果达标再付款
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 备注 */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-400 text-center">
                      💡 AI 同城榜 <span className="text-purple-400">¥6,980</span> 启动，上榜后补齐尾款 <span className="text-green-400">¥13,000</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 阶段二：运营模式选择 */}
              {employee.installmentNote.phaseTwo && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded">阶段二</span>
                    <span className="text-white font-bold text-sm">{employee.installmentNote.phaseTwo.title}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {employee.installmentNote.phaseTwo.options.map((option, idx) => (
                      <div 
                        key={idx}
                        className={`relative p-4 rounded-lg border ${
                          option.highlight 
                            ? 'bg-gradient-to-br from-purple-500/10 to-green-500/5 border-purple-500/40' 
                            : 'bg-[#111] border-gray-800'
                        }`}
                      >
                        {/* 推荐标签 */}
                        {option.highlight && (
                          <div className="absolute -top-2 right-4 px-2 py-0.5 bg-purple-500 text-white text-xs rounded">
                            推荐
                          </div>
                        )}
                        
                        <h4 className="text-white font-bold text-sm mb-2">{option.name}</h4>
                        
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-xl font-bold text-white">{option.price}</span>
                          <span className="text-xs text-gray-400">{option.unit}</span>
                        </div>
                        
                        <p className="text-xs text-gray-400 mb-3">{option.desc}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {option.tags?.map((tag, tagIdx) => (
                            <span 
                              key={tagIdx}
                              className={`text-xs px-2 py-0.5 rounded ${
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
              )}
            </section>
          </FadeInUp>
        )}

        {/* FAQ */}
        {employee.faqs && employee.faqs.length > 0 && (
          <FadeInUp delay={260}>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">常见问题</h2>
              <div className="space-y-2">
                {employee.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.q ? null : faq.q)}
                      className="w-full p-3 flex items-center justify-between hover:bg-[#111] transition-colors"
                    >
                      <span className="font-medium text-gray-200 text-sm text-left">{faq.q}</span>
                      {expandedFAQ === faq.q ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === faq.q && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-gray-800"
                        >
                          <p className="p-3 text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </FadeInUp>
        )}

        {/* CTA 按钮 */}
        <FadeInUp delay={350}>
          <div className="flex justify-center gap-4 pt-6">
            <Button
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
              className="h-12 px-8 text-sm rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
            >
              💬 申请体验
            </Button>
            <Link href="/agent">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-sm rounded-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
              >
                🤝 成为代理
              </Button>
            </Link>
          </div>
        </FadeInUp>

        {/* 同分类其他员工 */}
        {relatedEmployees.length > 0 && (
          <FadeInUp delay={400}>
            <section className="mt-20 pt-12 border-t border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-400">
                  其他{employee.categoryLabel}
                </h2>
                <Link
                  href="/employees"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  查看全部
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedEmployees.map((related) => (
                  <Link
                    key={related.id}
                    href={`/employees/${related.id}`}
                    className="group p-4 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${related.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                        {related.iconSmall}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-gray-300 transition-colors truncate">
                          {related.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">{related.slogan}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </FadeInUp>
        )}
      </article>
    </div>
  );
}
