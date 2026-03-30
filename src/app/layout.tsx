import type { Metadata, Viewport } from 'next';
import { Inspector } from 'react-dev-inspector';
import { OrganizationStructuredData, WebSiteStructuredData, FAQStructuredData } from '@/components/structured-data';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://yiching.cn'),
  title: {
    default: '意心会 | AI应用赋能服务平台',
    template: '%s | 意心会',
  },
  description:
    '意心会 - AI应用赋能服务平台，通过商业级AI应用开发和知识付费服务打造AI应用服务的新范式。提供ASOP应用定制、AI能力建设课程、企业内训等服务，已为100+企业客户提供AI赋能服务。',
  keywords: [
    '意心会',
    'AI应用',
    'ASOP应用定制',
    '意心·智造',
    '意心·学院',
    'AI解决方案',
    '知识付费',
    'AI商业化',
    '企业AI转型',
    'AI应用开发',
    'AI大模型应用',
    '智能体开发',
    'AI咨询服务',
  ],
  authors: [{ name: '意心会 Team' }],
  creator: '意心会',
  publisher: '意心会',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '意心会 | AI应用赋能服务平台',
    description:
      '通过商业级AI应用开发和知识付费服务打造AI应用服务的新范式。已为100+企业客户提供AI赋能服务。',
    url: 'https://yiching.cn',
    siteName: '意心会',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '意心会 | AI应用赋能服务平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '意心会 | AI应用赋能服务平台',
    description:
      '通过商业级AI应用开发和知识付费服务打造AI应用服务的新范式',
    images: ['/twitter-image.png'],
    creator: '@yiching',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 百度站长平台验证码（如需要）
    // baidu: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7c3aed" />
        {/* 百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?f336d1f13c154e383ae1e1b539188c44";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
        {/* 结构化数据 */}
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <FAQStructuredData />
      </head>
      <body className={`antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // iOS Safari 键盘弹出时的修复
              (function() {
                var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                if (isIOS) {
                  document.addEventListener('focusin', function(e) {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                      document.body.style.position = 'fixed';
                      document.body.style.width = '100%';
                    }
                  });
                  document.addEventListener('focusout', function(e) {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                      document.body.style.position = '';
                      document.body.style.width = '';
                    }
                  });
                }
              })();
            `,
          }}
        />
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
