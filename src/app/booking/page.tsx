'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { FadeInUp } from '@/components/fade-in-up';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    contact: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nickname,
          email: '',
          phone: formData.contact,
          company: formData.company,
          subject: '服务预约',
          message: `昵称：${formData.nickname}\n联系方式：${formData.contact}\n公司：${formData.company}\n\n咨询目的：${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <FadeInUp>
            <Link href="/xueyuan" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              返回学院
            </Link>

            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                填写预约信息获取资料
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                提交您的信息，我们将尽快与您联系，为您提供详细的咨询和介绍
              </p>
            </div>
          </FadeInUp>

          <div className="max-w-2xl mx-auto">
            {/* Form */}
            <FadeInUp delay={100}>
              {submitted ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    提交成功！
                  </h2>
                  <p className="text-gray-300 mb-8">
                    我们已收到您的预约信息，课程顾问将在24小时内与您联系。
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nickname: '',
                        contact: '',
                        company: '',
                        message: '',
                      });
                    }}
                    className="rounded-full"
                  >
                    继续预约
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
                        昵称
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="你希望我们怎么称呼你"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
                        联系方式
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="填写您的电话/邮箱/微信等各种联系方式"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        留言
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="请填写你希望用AI做什么或是你学习AI课程的目的"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-full text-base hover:scale-105 transition-transform"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            提交中...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            提交预约
                            <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                      <a
                        href="tel:18680768726"
                        className="flex-1 h-12 rounded-full text-base font-semibold hover:scale-105 transition-transform border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white flex items-center justify-center"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        直接联系
                      </a>
                    </div>
                  </form>
                </div>
              )}
            </FadeInUp>
          </div>
        </div>
      </main>
    </div>
  );
}
