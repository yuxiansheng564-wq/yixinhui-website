import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, BookOpen, Users, Video, Award, TrendingUp, Code, Zap } from 'lucide-react';

export default function XueyuanPage() {
  const courses = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'AI应用开发入门',
      description: '从零开始学习AI应用开发，掌握核心技术和实践方法',
      level: '初级',
      duration: '4周',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'ASOP应用进阶实战',
      description: '深入学习ASOP应用开发，打造商业级AI解决方案',
      level: '中级',
      duration: '8周',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI商业化实战',
      description: '学习如何将AI技术转化为商业价值，实现盈利增长',
      level: '高级',
      duration: '12周',
    },
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '专业导师团队',
      description: '由行业专家亲自授课，提供一对一指导',
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: '实战项目驱动',
      description: '通过真实项目学习，积累实战经验',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: '权威证书认证',
      description: '完成课程获得专业证书，提升职业竞争力',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '持续学习支持',
      description: '课程内容定期更新，跟上技术发展步伐',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-800/50/40">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm font-semibold text-gray-300 mb-4 tracking-wider uppercase">
                意心学院
              </div>
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-8">
                开启您的AI学习之旅
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12">
                专业的AI应用开发培训课程，帮助您掌握前沿技术，成为AI领域的专业人才
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="h-14 px-8 text-base rounded-full hover:scale-105 transition-transform">
                    立即报名
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    了解课程体系
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '500+', label: '累计学员' },
                { number: '95%', label: '好评率' },
                { number: '30+', label: '精品课程' },
                { number: '80+', label: '实战项目' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                热门课程
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                从入门到精通，系统化学习AI应用开发
              </p>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <FadeInUp key={index} delay={index * 100}>
                <div className="bg-gray-800/50/40 border border-gray-700 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-white mb-6">{course.icon}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-200 text-xs font-medium rounded-full">
                      {course.level}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 text-gray-200 text-xs font-medium rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {course.description}
                  </p>
                  <Link href="/booking">
                    <Button variant="outline" className="w-full">
                      探索课程
                    </Button>
                  </Link>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                为什么选择意心学院？
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                专业的课程体系，全面的培养方案
              </p>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FadeInUp key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-2xl mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                学习路径
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                科学的课程体系，助您系统化成长
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800"></div>

              <div className="space-y-12">
                {[
                  {
                    step: '1',
                    title: '基础阶段',
                    desc: '学习AI基础知识，掌握Prompt Engineering技能',
                    duration: '1-2个月',
                  },
                  {
                    step: '2',
                    title: '进阶阶段',
                    desc: '深入学习ASOP应用开发，掌握复杂业务场景处理',
                    duration: '2-4个月',
                  },
                  {
                    step: '3',
                    title: '实战阶段',
                    desc: '参与真实项目开发，积累实战经验',
                    duration: '3-6个月',
                  },
                  {
                    step: '4',
                    title: '专家阶段',
                    desc: '成为AI应用开发专家，能够独立完成商业项目',
                    duration: '持续学习',
                  },
                ].map((item, index) => (
                  <FadeInUp key={index} delay={index * 100}>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className="bg-gray-800/50/40 border border-gray-700 rounded-2xl p-8 shadow-sm">
                          <div className="text-sm font-semibold text-gray-300 mb-2">
                            第{item.step}阶段
                          </div>
                          <h3 className="text-2xl font-semibold text-white mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-300 mb-4">{item.desc}</p>
                          <div className="text-sm text-gray-400">
                            预计时长: {item.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-white font-bold z-10">
                        {item.step}
                      </div>
                      <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-first' : ''}`}></div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
              准备好开始学习了吗？
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              加入意心学院，开启您的AI职业发展之路
            </p>
            <Link href="/booking">
              <Button size="lg" className="h-14 px-12 text-base rounded-full hover:scale-105 transition-transform">
                探索学院课程
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
