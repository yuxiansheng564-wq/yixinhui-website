'use client';

import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: '',
          });
        }, 3000);
      } else {
        alert(data.error || '提交失败，请重试');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-8">
                预约咨询
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12">
                填写以下信息，我们的顾问将在24小时内与您联系
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeInUp>
              <div>
                <h2 className="text-3xl font-semibold text-white mb-8">
                  在线咨询
                </h2>

                {submitted ? (
                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      提交成功
                    </h3>
                    <p className="text-gray-300">
                      感谢您的咨询，我们的顾问将在24小时内与您联系！
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">姓名 *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="您的姓名"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">电话 *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="您的联系电话"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">邮箱 *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">公司名称</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="您的公司名称"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">感兴趣的服务 *</Label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      >
                        <option value="">请选择服务类型</option>
                        <option value="ai-consulting">AI咨询（意心·学院）</option>
                        <option value="ai-application">AI应用（意心·智造）</option>
                        <option value="asop-custom">ASOP应用轻定制</option>
                        <option value="deep-dev">深度应用开发</option>
                        <option value="ai-training">AI应用工作坊</option>
                        <option value="other">其他合作</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">咨询内容 *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="请详细描述您的需求..."
                        rows={6}
                        className="mt-2 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-base rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      提交预约
                    </Button>
                  </form>
                )}
              </div>
            </FadeInUp>

            {/* Contact Info */}
            <FadeInUp delay={200}>
              <div>
                <h2 className="text-3xl font-semibold text-white mb-8">
                  联系方式
                </h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        邮箱
                      </h3>
                      <p className="text-gray-400">contact@yixinhui.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        电话
                      </h3>
                      <p className="text-gray-400">400-888-8888</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        地址
                      </h3>
                      <p className="text-gray-400">
                        重庆市渝北区金山意库8栋2-8
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50/50 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    工作时间
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <div>周一至周五: 9:00 - 18:00</div>
                    <div>周六: 10:00 - 17:00</div>
                    <div>周日: 休息</div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 lg:py-32 bg-gray-800/50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white mb-4">
                探索我们的服务
              </h2>
              <p className="text-gray-300">
                了解意心会的完整服务体系
              </p>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeInUp delay={100}>
              <Link href="/zhizao">
                <div className="bg-gray-800/50/40 border border-gray-700 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    意心智造
                  </h3>
                  <p className="text-gray-300 mb-4">
                    专业的ASOP应用定制服务，让每一个个体和组织都拥有自己的AI应用
                  </p>
                  <div className="text-white font-medium flex items-center gap-2">
                    了解更多
                    <Send className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeInUp>

            <FadeInUp delay={200}>
              <Link href="/xueyuan">
                <div className="bg-gray-800/50/40 border border-gray-700 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    意心学院
                  </h3>
                  <p className="text-gray-300 mb-4">
                    专业的AI应用开发培训课程，帮助您掌握前沿技术
                  </p>
                  <div className="text-white font-medium flex items-center gap-2">
                    了解更多
                    <Send className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeInUp>
          </div>
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
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                首页
              </Link>
              <Link href="/zhizao" className="text-gray-300 hover:text-white transition-colors">
                意心智造
              </Link>
              <Link href="/xueyuan" className="text-gray-300 hover:text-white transition-colors">
                意心学院
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
