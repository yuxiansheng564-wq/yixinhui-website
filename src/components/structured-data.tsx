interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Product' | 'Service' | 'FAQPage';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// 组织结构化数据
export function OrganizationStructuredData() {
  const data = {
    name: '意心会',
    legalName: '意心会',
    url: 'https://yiching.cn',
    logo: 'https://yiching.cn/logo.png',
    description: '意心会 - AI应用赋能服务平台，通过商业级AI应用开发和知识付费服务打造AI应用服务的新范式',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [
      'https://mp.weixin.qq.com',
    ],
  };

  return <StructuredData type="Organization" data={data} />;
}

// 网站结构化数据
export function WebSiteStructuredData() {
  const data = {
    name: '意心会',
    url: 'https://yiching.cn',
    description: '意心会 - AI应用赋能服务平台',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yiching.cn/search?q={search_term_string}',
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };

  return <StructuredData type="WebSite" data={data} />;
}

// 服务结构化数据
export function ServiceStructuredData() {
  const services = [
    {
      '@type': 'Service',
      name: '意心·智造',
      description: 'ASOP应用定制开发，从0到1打造符合您业务场景的AI应用',
      provider: {
        '@type': 'Organization',
        name: '意心会',
      },
      areaServed: 'CN',
    },
    {
      '@type': 'Service',
      name: '意心·学院',
      description: 'AI认知升级课程、企业内训工作坊、一对一咨询诊断',
      provider: {
        '@type': 'Organization',
        name: '意心会',
      },
      areaServed: 'CN',
    },
  ];

  return services.map((service, index) => (
    <StructuredData key={index} type="Service" data={service} />
  ));
}

// FAQ结构化数据
export function FAQStructuredData() {
  const data = {
    mainEntity: [
      {
        '@type': 'Question',
        name: '什么是ASOP应用？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ASOP（AI Service-Oriented Platform）是意心会自研的AI应用基座，能够将AI能力封装成独立的应用程序，拥有独立界面和品牌，支持复杂工作流，帮助企业实现商业闭环。',
        },
      },
      {
        '@type': 'Question',
        name: '意心会提供哪些服务？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '意心会提供两大服务体系：1. 意心·智造 - ASOP应用定制开发、业务流程智能化改造、企业知识库搭建；2. 意心·学院 - AI认知升级课程、企业内训工作坊、一对一咨询诊断。',
        },
      },
      {
        '@type': 'Question',
        name: 'ASOP应用和普通智能体有什么区别？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '主要区别包括：1. ASOP应用拥有独立界面和品牌，可以像APP一样分发；2. ASOP应用支持复杂工作流，不只是聊天；3. ASOP应用天然支持商业化，可以从"卖人头"转型为"卖服务"。',
        },
      },
      {
        '@type': 'Question',
        name: '如何开始使用意心会的服务？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '您可以通过以下方式开始：1. 访问我们的官网了解更多信息；2. 联系我们预约专家诊断；3. 参加我们的AI认知升级课程。我们的团队会根据您的具体需求提供定制化解决方案。',
        },
      },
    ],
  };

  return <StructuredData type="FAQPage" data={data} />;
}
