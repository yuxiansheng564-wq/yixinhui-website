'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, ArrowRight, Check, AlertCircle, Zap } from 'lucide-react';
import { FadeInUp } from '@/components/fade-in-up';

// 案例数据
interface CaseData {
  id: string;
  title: string;
  client: string;
  hasVideo: boolean;
  videoUrl?: string;
  image: string;
  oneLineSummary: string;
  businessBackground: string;
  painPoints: string[];
  solution: string;
  deliverables: string[];
  technicalHighlights: string[];
  customerFeedback: string;
  category: string;
}

const allCases: CaseData[] = [
  // 内容与IP创作
  {
    id: 'case-1',
    title: 'AI 辅助 IP 打造',
    client: '黄金珠宝品牌 - 曾总&杨总团队',
    hasVideo: false,
    image: '/pics/cases/case-01-gold-jewelry-ip.jpeg',
    oneLineSummary: '原本 3 天憋一条视频文案，现在半天批量产出一周的选题和脚本。',
    businessBackground: '曾总&杨总团队运营黄金珠宝品牌加盟商，每周需产出 25 条视频内容，面临内容生产效率瓶颈。',
    painPoints: [
      '每周需产出 25 条视频内容，人工创作效率低下',
      '视频解读到内容生产流程繁琐，缺乏标准化',
      '需要建立思想领导力，提升品牌影响力'
    ],
    solution: '通过飞书妙记+知识库组合，实现"AI 先整理，人对着学"的高效学习策略，建立结构化选题框架，从视频解读到文案生成形成完整 AI 工作流。',
    deliverables: [
      'AI 内容生产工作流应用',
      '结构化选题框架库',
      '知识库快速调用系统'
    ],
    technicalHighlights: [
      '视频内容自动解读引擎',
      '结构化选题生成算法',
      '知识库智能检索系统'
    ],
    customerFeedback: '"AI 工作流让我们的内容生产进入稳定节奏，现在可以专注于创意本身。"',
    category: 'content-ip'
  },
  {
    id: 'case-2',
    title: '微信营销 AI 内容工厂',
    client: '高端岩茶品牌 - 无境茶空间（灿哥、蒋总）',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045150947516&bvid=BV1ASFSzAEoV&cid=35956985180&p=1&autoplay=0',
    image: '/pics/cases/case-02-rock-tea-content.jpeg',
    oneLineSummary: '一次输入产品卖点，自动生成公众号长文、朋友圈短文案、小红书笔记三个版本。',
    businessBackground: '无境茶空间是高端岩茶品牌，需要持续输出专业茶文化内容，同时运营多个社交媒体平台。',
    painPoints: [
      '茶文化内容专业性要求极高，创作耗时',
      '公众号、朋友圈、小红书多平台运营压力大',
      '内容与目标客户匹配度低，转化率不理想'
    ],
    solution: '基于茶文化知识库，自动生成"茶知识科普""冲泡教程""产品故事"等内容，并根据不同平台特性优化内容形式和发布策略。',
    deliverables: [
      '多平台内容生成工具',
      '茶文化知识库',
      '用户画像匹配系统'
    ],
    technicalHighlights: [
      '茶文化知识图谱',
      '多平台内容适配引擎',
      '用户画像智能匹配'
    ],
    customerFeedback: '"一套素材适配多平台，现在可以专注于产品本身，不再为内容发愁。"',
    category: 'content-ip'
  },
  {
    id: 'case-3',
    title: 'AI 珠宝 IP 运营',
    client: '欧洲珠宝回流 - 赵总、Jorge',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045167724099&bvid=BV1NmFSzeEMG&cid=35957050464&p=1&autoplay=0',
    image: '/pics/cases/case-03-europe-jewelry-ip.jpeg',
    oneLineSummary: '不懂珠宝历史也能产出专业级鉴定科普，AI 帮你"现学现卖"。',
    businessBackground: '赵晓箐从事欧洲珠宝回流业务，需要建立专业的珠宝鉴定 IP，但内容生产门槛高。',
    painPoints: [
      '珠宝鉴定知识专业性强，内容生产门槛高',
      '品牌曝光量低，获客成本高',
      '缺乏系统化的内容运营策略'
    ],
    solution: '开发珠宝鉴定知识图谱，自动生成"珠宝历史故事""鉴定技巧"等内容，结合小红书/抖音平台特性优化发布策略。',
    deliverables: [
      '珠宝知识图谱系统',
      '多平台内容生成工具',
      '发布策略优化系统'
    ],
    technicalHighlights: [
      '珠宝知识图谱构建',
      '平台特性内容适配',
      '发布时机智能推荐'
    ],
    customerFeedback: '"实现了专业内容的批量化生产，内容质量和产出速度都有质的飞跃。"',
    category: 'content-ip'
  },
  {
    id: 'case-4',
    title: 'AI 健康内容应用',
    client: '大健康领域 - 邱老师',
    hasVideo: false,
    image: '/pics/cases/case-15-health-content.jpeg',
    oneLineSummary: '自动过滤"包治百病"类违规表述，合规内容一键生成。',
    businessBackground: '邱老师在大健康领域需要高效生产合规的健康内容，面临专业性和合规性的双重挑战。',
    painPoints: [
      '健康内容专业性强，生产门槛高',
      '内容审核耗时，合规风险大',
      '内容生产效率低，难以规模化'
    ],
    solution: '基于健康知识图谱自动生成"慢病管理指南""养生食谱"等内容，同时过滤违规信息，确保内容合规。',
    deliverables: [
      '健康知识图谱系统',
      '内容自动生成工具',
      '智能审核系统'
    ],
    technicalHighlights: [
      '健康知识图谱',
      '内容合规检测',
      '自动化生产流程'
    ],
    customerFeedback: '"大幅降低了内容审核风险，内容生产进入规模化阶段。"',
    category: 'content-ip'
  },
  {
    id: 'case-5',
    title: 'IP 内容与数字人',
    client: '赵晓箐',
    hasVideo: false,
    image: '/pics/cases/case-20-digital-avatar.jpeg',
    oneLineSummary: '不用每天化妆开机，数字人替你日更。',
    businessBackground: '赵晓箐希望通过数字人技术提升个人 IP 的影响力和内容生产效率，降低真人出镜依赖。',
    painPoints: [
      '个人 IP 内容生产压力大',
      '数字人形象需要高度还原',
      '内容与数字人结合的技术门槛高'
    ],
    solution: '定制高还原度的数字人形象，并整合内容生产工具，实现内容与数字人的无缝结合。',
    deliverables: [
      'IP 内容生产工具',
      '数字人形象定制',
      '内容与数字人整合系统'
    ],
    technicalHighlights: [
      '数字人高还原度',
      'IP 内容智能生成',
      '内容与数字人整合'
    ],
    customerFeedback: '"数字人让我的内容生产进入自动化，不再受时间和精力限制。"',
    category: 'content-ip'
  },

  // 销售与培训
  {
    id: 'case-6',
    title: 'AI 销冠定制 + AI 获客内容工厂',
    client: '转店中介平台 - 店之家张总',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045151012499&bvid=BV1WSFSzAEXK&cid=35956984088&p=1&autoplay=0',
    image: '/pics/cases/case-05-store-transfer-sales.jpeg',
    oneLineSummary: '把创始人 10 年踩坑经验装进系统，新人第一天就能用老销冠的话术。',
    businessBackground: '重庆店之家是转店中介平台，创始人拥有 10 年销售经验，但难以规模化复制给团队。',
    painPoints: [
      '销售能力严重依赖创始人个人经验',
      '新员工培训周期长（3 个月），成单率低',
      '获客内容生产跟不上业务增长'
    ],
    solution: '通过 AI 提取创始人销售经验，构建销冠话术系统；员工遇疑难客户可实时获取话术建议；同时自动生成抖音/小红书爆款获客文案。',
    deliverables: [
      'AI 销冠话术系统',
      '获客内容自动生成工具',
      '案例库管理系统'
    ],
    technicalHighlights: [
      '销冠经验知识提取',
      '实时话术推荐引擎',
      '爆款内容生成算法'
    ],
    customerFeedback: '"新人培训周期大幅缩短，销售流程实现标准化。"',
    category: 'sales-training'
  },
  {
    id: 'case-6-1',
    title: '全屋装修改造 AI 应用',
    client: '全屋装修改造 - 陶陶',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045134234069&bvid=BV14yFSziE5E&cid=35956723259&p=1&autoplay=0',
    image: '/pics/cases/case-16-sales-training.jpeg',
    oneLineSummary: '装修咨询、方案推荐、报价生成，AI 全流程辅助。',
    businessBackground: '陶陶从事全屋装修改造业务，需要提升客户咨询效率和转化率。',
    painPoints: [
      '客户咨询量大，人工回复效率低',
      '装修方案定制化程度高，耗时耗力',
      '报价流程复杂，容易出错'
    ],
    solution: '通过 AI 自动处理客户咨询，智能推荐装修方案，快速生成精准报价。',
    deliverables: [
      '智能客服系统',
      '方案推荐引擎',
      '自动报价工具'
    ],
    technicalHighlights: [
      '客户需求智能分析',
      '方案匹配算法',
      '报价自动生成'
    ],
    customerFeedback: '"客户咨询效率大幅提升，转化率明显提高。"',
    category: 'sales-training'
  },
  {
    id: 'case-7',
    title: 'AI 销讲辅助应用',
    client: '销讲培训 - 家瑞老师',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045150945494&bvid=BV1PSFSzAEhf&cid=35957047521&p=1&autoplay=0',
    image: '/pics/cases/case-16-sales-training.jpeg',
    oneLineSummary: 'AI 扮演"难缠客户"反复提问，讲师上台前先过 10 轮模拟。',
    businessBackground: '家瑞老师从事知识付费/培训咨询/演讲培训，需要提升讲师培训效率和实战能力。',
    painPoints: [
      '销讲脚本创作耗时，质量不稳定',
      '讲师实战能力提升慢',
      '缺乏模拟演练工具'
    ],
    solution: '基于教育行业特点自动生成"家长沟通话术""课程介绍文案"，并通过 AI 模拟客户提问进行实战演练。',
    deliverables: [
      '销讲脚本生成工具',
      'AI 模拟演练系统',
      '话术库管理平台'
    ],
    technicalHighlights: [
      '脚本智能生成',
      'AI 角色扮演',
      '实战演练系统'
    ],
    customerFeedback: '"讲师培训效率大幅提升，实战能力提升明显。"',
    category: 'sales-training'
  },
  {
    id: 'case-8',
    title: 'AI 销售管理系统',
    client: '中国电信 - 金老师',
    hasVideo: false,
    image: '/pics/cases/case-08-china-telecom-sales.jpeg',
    oneLineSummary: '以前主管抽查 10 条录音要半天，现在 AI 全量分析，5 分钟出报告。',
    businessBackground: '中国电信需要提升销售团队的客户拜访质量和管理效率，但人工抽查效率低。',
    painPoints: [
      '销售团队客户拜访质量参差不齐，难以量化评估',
      '依赖人工抽查录音，效率低且覆盖面小',
      '缺乏即时反馈机制，员工能力提升慢'
    ],
    solution: '自动识别沟通效率、问题解决能力等指标，生成员工能力画像和改进建议，实现"录音→AI 分析→即时反馈"闭环。',
    deliverables: [
      '销售录音分析系统',
      '员工能力画像工具',
      '即时反馈管理平台'
    ],
    technicalHighlights: [
      '语音识别与分析',
      '能力画像建模',
      '即时反馈机制'
    ],
    customerFeedback: '"管理效率大幅提升，员工能力提升速度明显加快。"',
    category: 'sales-training'
  },
  {
    id: 'case-9',
    title: 'AI 私域营销应用',
    client: '私域营销培训 - 梁山伯',
    hasVideo: false,
    image: '/pics/cases/case-09-private-domain-marketing.jpeg',
    oneLineSummary: '自动识别"高意向但沉默"的用户，定向推送唤醒内容。',
    businessBackground: '梁山伯从事私域营销培训，需要提升私域运营效率和精准度。',
    painPoints: [
      '用户分层不精准，营销效率低',
      '社群运营依赖人工，活跃度低',
      '转化路径不清晰，ROI 不理想'
    ],
    solution: '通过 AI 分析用户行为数据，自动推送个性化内容和优惠活动，提升社群活跃度和精准触达。',
    deliverables: [
      '用户分层工具',
      '社群运营机器人',
      '个性化推送系统'
    ],
    technicalHighlights: [
      '用户行为分析',
      '智能分层算法',
      '个性化推送引擎'
    ],
    customerFeedback: '"实现了精准内容推送，社群运营效率显著提升。"',
    category: 'sales-training'
  },
  {
    id: 'case-10',
    title: 'AI 创始人分身',
    client: '创始人 IP - 史总',
    hasVideo: false,
    image: '/pics/cases/case-20-digital-avatar.jpeg',
    oneLineSummary: '创始人分身 7×24 在线，回答客户问题的口吻和老板一模一样。',
    businessBackground: '史总希望通过 AI 技术复刻自己，实现时间和能力的规模化。',
    painPoints: [
      '创始人时间有限，无法覆盖所有客户咨询',
      '员工培训依赖创始人亲自参与',
      '品牌宣传缺乏创始人个人魅力'
    ],
    solution: '开发可对话的创始人 AI 分身，用于客户咨询、员工培训和品牌宣传。',
    deliverables: [
      '创始人 AI 分身',
      '智能客户咨询系统',
      '员工培训助手'
    ],
    technicalHighlights: [
      '多模态 AI 技术',
      '语言风格复刻',
      '决策逻辑建模'
    ],
    customerFeedback: '"AI 分身帮我节省了大量时间，同时保持了个人品牌的一致性。"',
    category: 'sales-training'
  },

  // 私域与用户服务
  {
    id: 'case-11',
    title: '私域 AI 化',
    client: '印刷平台 - 微印刷（朱总、徐总）',
    hasVideo: false,
    image: '/pics/cases/case-07-printing-private-domain.jpeg',
    oneLineSummary: '客户问"500张名片多少钱"，AI 自动算价、推荐纸张、生成报价单。',
    businessBackground: '微印刷是印刷界头部平台，需要实现销售和私域运营的标准化。',
    painPoints: [
      '销售团队依赖销冠个人经验，难以标准化',
      '私域运营内容生产耗时，转化率低',
      '新员工上手慢，培训成本高'
    ],
    solution: '自动生成客户跟进话术、报价方案和行业案例，实现销售流程标准化。',
    deliverables: [
      'AI 销冠话术系统',
      '私域内容生成工具',
      '报价方案自动生成系统'
    ],
    technicalHighlights: [
      '销冠经验模型化',
      '报价方案智能生成',
      '行业案例自动匹配'
    ],
    customerFeedback: '"销售流程实现标准化，新员工培训时间大幅缩短。"',
    category: 'private-domain'
  },
  {
    id: 'case-13',
    title: '个人 IP + 实体门店 AI 化',
    client: '黄金打金门店 - 原铺黄金',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045151011125&bvid=BV1sSFSzAEuG&cid=35956919612&p=1&autoplay=0',
    image: '/pics/cases/case-04-gold-store-ip.jpeg',
    oneLineSummary: '直播前 10 分钟生成当天话术，不再临场卡壳。',
    businessBackground: '原铺黄金是黄金打金门店，需要打造个人 IP 并实现门店营销 AI 化。',
    painPoints: [
      '古法金工艺内容创作难度大',
      '门店营销依赖人工，效率低',
      '抖音直播话术不专业，转化率低'
    ],
    solution: '结合抖音直播话术生成功能，自动生成"古法金工艺介绍""定制案例展示"等内容。',
    deliverables: [
      '饰品设计展示工具',
      '门店营销内容生成系统',
      '直播话术库'
    ],
    technicalHighlights: [
      '工艺知识结构化',
      '直播话术智能生成',
      '案例展示自动化'
    ],
    customerFeedback: '"直播话术生成让我不再临场卡壳，内容生产时间大幅节省。"',
    category: 'content-ip'
  },
  {
    id: 'case-14',
    title: 'AI 法律知识应用',
    client: '法律知识付费 - 张总',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045150948449&bvid=BV1ASFSzAE6F&cid=35956982427&p=1&autoplay=0',
    image: '/pics/cases/case-14-legal-knowledge.jpeg',
    oneLineSummary: '一个判决书丢进去，自动拆解争议焦点、判决逻辑、可讲知识点。',
    businessBackground: '张峰铭从事法律知识付费，需要提升内容生产效率和质量。',
    painPoints: [
      '法律案例拆解耗时，专业性要求高',
      '课程开发周期长，效率低',
      '内容质量参差不齐'
    ],
    solution: '自动提取法律案例中的争议焦点和判决逻辑，生成"民法典解读""合同风险提示"等付费内容。',
    deliverables: [
      '法律案例拆解工具',
      '课程大纲自动生成系统',
      '法律知识库'
    ],
    technicalHighlights: [
      '案例智能拆解',
      '知识图谱构建',
      '课程大纲自动生成'
    ],
    customerFeedback: '"课程开发效率大幅提升，内容质量更加稳定。"',
    category: 'professional'
  },
  {
    id: 'case-15',
    title: '数字人定制',
    client: 'IP 孵化公司 - 自媒禅 IP 创始人',
    hasVideo: false,
    image: '/pics/cases/case-20-digital-avatar.jpeg',
    oneLineSummary: '真人拍一次形象素材，后续内容全部由数字人出镜。',
    businessBackground: '自媒禅 IP 创始人从事 IP 孵化业务，需要降低成本并提升效率。',
    painPoints: [
      'IP 孵化周期长，成本高',
      '内容生产依赖真人，难以规模化',
      '品牌一致性难以保证'
    ],
    solution: '定制数字人系统，复刻 IP 形象和表达风格，实现内容生产自动化和规模化。',
    deliverables: [
      '数字人定制系统',
      '内容自动化生产',
      '品牌一致性保障'
    ],
    technicalHighlights: [
      '数字人形象复刻',
      '表达风格建模',
      '内容自动化生产'
    ],
    customerFeedback: '"实现了 IP 内容生产的标准化和可复制，成本大幅降低。"',
    category: 'private-domain'
  },

  // 专业服务与组织赋能
  {
    id: 'case-16',
    title: 'AI 招投标分析系统',
    client: '新能源集团 - 李董',
    hasVideo: false,
    image: '/pics/cases/case-13-new-energy-bidding.jpeg',
    oneLineSummary: '200 页招标文件，AI 10 分钟提取核心条款，标注风险点。',
    businessBackground: '李董的新能源集团面临招投标业务效率和准确性的双重挑战。',
    painPoints: [
      '招投标业务流程复杂，依赖人工经验判断',
      '海量招标文件处理耗时，关键信息提取困难',
      '中标概率难以量化评估，报价策略缺乏数据支持'
    ],
    solution: '自动处理招标文件，提取关键信息，生成中标概率分析模型和报价策略优化工具，并输出风险评估报告。',
    deliverables: [
      '招标文件智能分析系统',
      '中标概率预测模型',
      '报价策略优化工具',
      '风险评估报告生成器'
    ],
    technicalHighlights: [
      '文件智能解析',
      '概率预测模型',
      '报价策略优化算法'
    ],
    customerFeedback: '"标书准备时间大幅缩短，投标决策更加科学。"',
    category: 'professional'
  },
  {
    id: 'case-16-1',
    title: '银行贷款 Agent 智能助手',
    client: '银行贷款部门',
    hasVideo: true,
    videoUrl: '//player.bilibili.com/player.html?isOutside=true&aid=116045553600511&bvid=BV1emFUzyE3g&cid=35959801944&p=1&autoplay=0',
    image: '/pics/cases/case-13-new-energy-bidding.jpeg',
    oneLineSummary: 'Agent 用 10 分钟完成银行贷款部门一周的工作。',
    businessBackground: '银行贷款部门面临大量重复性文档处理工作，效率低下。',
    painPoints: [
      '贷款资料审核耗时耗力',
      '文档处理流程繁琐',
      '人工操作容易出错'
    ],
    solution: '通过 AI Agent 自动化处理贷款资料审核、文档整理和流程推进，大幅提升工作效率。',
    deliverables: [
      'Agent 自动化系统',
      '文档智能处理',
      '流程自动推进'
    ],
    technicalHighlights: [
      'Agent 自主决策',
      '文档智能解析',
      '流程自动化'
    ],
    customerFeedback: '"工作效率提升数十倍，人力成本大幅降低。"',
    category: 'professional'
  },
  {
    id: 'case-17',
    title: 'AI 职业教育应用',
    client: '职业技术学校 - 艺才技师学院（王校长）',
    hasVideo: false,
    image: '/pics/cases/case-17-vocational-education.jpeg',
    oneLineSummary: '没有真机也能练，AI 模拟设备故障，学员反复排查直到学会。',
    businessBackground: '艺才技师学院面临实训设备不足和成本高的问题。',
    painPoints: [
      '实训设备有限，学员实操机会少',
      '实训成本高，难以规模化',
      '技能掌握速度慢'
    ],
    solution: '模拟工业设备操作、故障排查等场景，结合 VR 技术提升实操体验。',
    deliverables: [
      'AI 实训模拟系统',
      '故障排查训练工具',
      'VR 实操体验平台'
    ],
    technicalHighlights: [
      'AI 实训模拟',
      'VR 技术集成',
      '故障排查智能引导'
    ],
    customerFeedback: '"降低了对实训设备的依赖，学员技能掌握速度明显加快。"',
    category: 'professional'
  },
  {
    id: 'case-18',
    title: 'AI 转店服务应用',
    client: '转店平台 - 张梦姣',
    hasVideo: false,
    image: '/pics/cases/case-05-store-transfer-sales.jpeg',
    oneLineSummary: '店铺信息一录入，自动匹配求租方，合同和风险提示一键生成。',
    businessBackground: '张梦姣运营转店平台，需要提升匹配效率和交易安全性。',
    painPoints: [
      '店铺信息匹配依赖人工，效率低',
      '交易流程复杂，周期长',
      '风险提示不及时'
    ],
    solution: '通过 AI 分析店铺数据和求租需求，自动推荐最佳匹配方案，同时生成转店合同模板和风险提示。',
    deliverables: [
      '智能匹配系统',
      '合同模板生成器',
      '风险提示工具'
    ],
    technicalHighlights: [
      '智能匹配算法',
      '合同自动生成',
      '风险识别系统'
    ],
    customerFeedback: '"匹配效率大幅提升，交易周期明显缩短。"',
    category: 'professional'
  },
  {
    id: 'case-19',
    title: 'AI 组织赋能平台',
    client: '黄金珠宝品牌 - 曾总&杨总团队',
    hasVideo: false,
    image: '/pics/cases/case-11-gold-jewelry-organization.jpeg',
    oneLineSummary: '销冠的成交话术、运营的爆款模板，全部沉淀成公司资产，新人即插即用。',
    businessBackground: '曾总&杨总团队希望将 AI 能力从个人层面提升到组织层面。',
    painPoints: [
      'AI 工具使用停留在个人层面，未实现组织级赋能',
      '跨部门协同效率低',
      '难以实现"一人使用 AI，全团队受益"'
    ],
    solution: '整合销售、运营、内容团队工作流，实现组织级 AI 赋能和知识共享。',
    deliverables: [
      '跨部门 AI 协作平台',
      '工作流整合系统',
      '组织级知识共享平台'
    ],
    technicalHighlights: [
      '跨部门工作流整合',
      '知识自动沉淀',
      '组织能力建模'
    ],
    customerFeedback: '"实现了一人沉淀，全员复用，团队协作效率大幅提升。"',
    category: 'professional'
  },
  {
    id: 'case-20',
    title: '转店平台全链路 AI 化',
    client: '张梦姣',
    hasVideo: false,
    image: '/pics/cases/case-05-store-transfer-sales.jpeg',
    oneLineSummary: '从发布、匹配、看店、签约到交割，每一步都有 AI 辅助决策。',
    businessBackground: '张梦姣希望通过 AI 技术实现转店平台的全链路智能化。',
    painPoints: [
      '转店全流程依赖人工，效率低',
      '信息不对称导致匹配成功率低',
      '交易安全难以保障'
    ],
    solution: '从信息发布、智能匹配、合同生成到交易保障，实现全链路 AI 化。',
    deliverables: [
      '全链路 AI 化系统',
      '信息智能匹配',
      '交易安全保障'
    ],
    technicalHighlights: [
      '全链路智能化',
      '信息智能匹配',
      '交易安全保障系统'
    ],
    customerFeedback: '"实现了转店业务全流程 AI 辅助，业务效率质的飞跃。"',
    category: 'professional'
  }
];

export default function CasesAndTeamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <CasesAndTeamContent />
    </Suspense>
  );
}

function CasesAndTeamContent() {
  const searchParams = useSearchParams();
  const caseRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCases, setExpandedCases] = useState<Set<string>>(new Set());
  const [showMore, setShowMore] = useState(false);

  // 处理URL参数，滚动到对应案例
  useEffect(() => {
    const caseId = searchParams.get('case');
    const category = searchParams.get('category');
    
    if (category) {
      setActiveCategory(category);
    }
    
    if (caseId) {
      // 如果指定了案例，需要确保能显示该案例
      // 找到该案例所属分类
      const targetCase = allCases.find(c => c.id === caseId);
      if (targetCase) {
        // 如果案例存在，确保显示它
        setShowMore(true);
      }
      // 展开对应案例
      setExpandedCases(prev => {
        const next = new Set(prev);
        next.add(caseId);
        return next;
      });
      // 滚动到对应案例
      setTimeout(() => {
        const element = document.getElementById(caseId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, [searchParams]);

  // 分类数据
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'content-ip', name: 'IP与内容创作' },
    { id: 'sales-training', name: '销售与培训' },
    { id: 'private-domain', name: '私域与用户服务' },
    { id: 'professional', name: '专业服务与组织赋能' }
  ];

  // 获取当前分类的案例
  const getCurrentCases = () => {
    if (activeCategory === 'all') {
      if (showMore) {
        // 展开后显示全部（有视频优先）
        return [...allCases].sort((a, b) => (b.hasVideo ? 1 : 0) - (a.hasVideo ? 1 : 0));
      } else {
        // 默认显示指定的两个案例
        const case1 = allCases.find(c => c.id === 'case-6-1'); // 全屋装修改造
        const case2 = allCases.find(c => c.id === 'case-3');   // AI 珠宝 IP 运营
        return [case1, case2].filter((c): c is CaseData => c !== undefined);
      }
    } else {
      // 特定分类：先按有视频优先排序，再显示前2个或全部
      const filtered = allCases.filter(c => c.category === activeCategory);
      const sorted = filtered.sort((a, b) => (b.hasVideo ? 1 : 0) - (a.hasVideo ? 1 : 0));
      return showMore ? sorted : sorted.slice(0, 2);
    }
  };

  // 切换案例展开状态
  const toggleCase = (caseId: string) => {
    setExpandedCases(prev => {
      const next = new Set(prev);
      if (next.has(caseId)) {
        next.delete(caseId);
      } else {
        next.add(caseId);
      }
      return next;
    });
  };

  // 切换分类
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setExpandedCases(new Set());
    setShowMore(false);
  };

  // 切换"全部案例"
  const handleToggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* 固定顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          {/* 返回首页 */}
          <div className="py-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              返回首页
            </Link>
          </div>
          
          {/* 标题和分类标签 */}
          <div className="pb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              客户案例
            </h1>

            {/* 分类导航标签 */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0 pb-2 ${
                    activeCategory === cat.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <section className="pt-[180px] pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {getCurrentCases().map((caseData, index) => (
            <FadeInUp key={caseData.id} delay={index * 0.1}>
              <div id={caseData.id} className="bg-white/5 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all">
                {/* 标题和客户 */}
                <h2 className="text-xl font-bold text-white mb-2">
                  {caseData.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{caseData.client}</p>

                {/* 视频/图片区域 */}
                {caseData.hasVideo && caseData.videoUrl ? (
                  <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                    <iframe
                      src={caseData.videoUrl}
                      scrolling="no"
                      frameBorder={0}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
                    <img
                      src={caseData.image}
                      alt={caseData.client}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 一句话概括 */}
                <div className="border-l-2 border-purple-500 pl-4 mb-4">
                  <p className="text-sm text-gray-300">{caseData.oneLineSummary}</p>
                </div>

                {/* 展开按钮 */}
                <button
                  onClick={() => toggleCase(caseData.id)}
                  className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2"
                >
                  {expandedCases.has(caseData.id) ? '收起详情' : '查看详情'}
                  {expandedCases.has(caseData.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {/* 展开详情 */}
                {expandedCases.has(caseData.id) && (
                  <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10 space-y-6">
                    {/* 业务背景 */}
                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">业务背景</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{caseData.businessBackground}</p>
                    </div>

                    {/* 场景痛点 */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-400 mb-3">场景痛点</h4>
                      <ul className="space-y-2">
                        {caseData.painPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 解决方案 */}
                    <div>
                      <h4 className="text-base font-semibold text-purple-400 mb-2">解决方案</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{caseData.solution}</p>
                    </div>

                    {/* 交付成果 */}
                    <div>
                      <h4 className="text-base font-semibold text-purple-400 mb-3">交付成果</h4>
                      <ul className="space-y-2">
                        {caseData.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 技术亮点 */}
                    <div>
                      <h4 className="text-base font-semibold text-purple-400 mb-2">技术亮点</h4>
                      <ul className="space-y-2">
                        {caseData.technicalHighlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 客户反馈 */}
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <p className="text-sm italic text-purple-300">{caseData.customerFeedback}</p>
                    </div>

                    {/* 联系我们按钮 */}
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors">
                      联系我们咨询
                    </button>
                  </div>
                )}
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* 全部案例按钮 */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex justify-center">
          <FadeInUp>
            <button
              onClick={handleToggleMore}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-colors flex items-center gap-2"
            >
              {showMore ? '收起' : activeCategory === 'all' ? '全部案例' : '更多场景案例'}
              {showMore ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </FadeInUp>
        </div>
      </section>

      {/* 团队介绍模块（展开后显示） */}
      {showMore && (
        <section className="pb-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <FadeInUp delay={0.2}>
              <div className="py-12 border-t border-white/10">
                {/* 第一级标题 */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  团队简介
                </h3>

                {/* 副标题 */}
                <p className="text-lg text-gray-400 mb-10">
                  懂商业的 AI 团队，懂 AI 的商业顾问
                </p>

                {/* 2x2 网格布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 模块1 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      100+ 企业的实战验证
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      成立于2025年，我们已赋能 <span className="text-purple-400 font-semibold">20+</span>行业、<span className="text-purple-400 font-semibold">100+</span>企业。深耕流量获取、IP内容变现、销售转化等核心成交场景，用真实数据定义专业。
                    </p>
                  </div>

                  {/* 模块2 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      "商业+技术"的复合视野
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      创始团队兼具商业敏锐度与技术硬实力。我们既能与CEO共谋<span className="text-purple-400 font-semibold">战略顶层设计</span>，也能与研发团队敲定<span className="text-purple-400 font-semibold">代码落地细节</span>，确保技术精准服务于商业目标。
                    </p>
                  </div>

                  {/* 模块3 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      从"隐性经验"到"显性应用"
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      擅长<span className="text-purple-400 font-semibold">"翻译"</span>与<span className="text-purple-400 font-semibold">"封装"</span>。通过AI技术，将您的专家经验、业务方法论转化为可商业化的标准应用，并协助解决人、流程与制度的适配难题。
                    </p>
                  </div>

                  {/* 模块4 */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      创业者的"技术合伙人"
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      我们不仅服务企业，更赋能个体。如果您想将自己的知识体系转化为AI产品，我们提供从<span className="text-purple-400 font-semibold">技术开发到商业落地</span>的全链路支持，做您最坚实的后盾。
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>
      )}
    </div>
  );
}
