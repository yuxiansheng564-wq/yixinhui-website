'use client';

import { useState } from 'react';
import { X, Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export function BookingModal({ isOpen, onClose, initialService = '' }: BookingModalProps) {
  const [formData, setFormData] = useState({
    nickname: '',
    contact: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 当 initialService 改变时更新 formData
  useState(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  });

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed inset-0 md:inset-8 md:rounded-3xl bg-gray-900 z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">预约咨询</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-20 h-20 text-purple-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      提交成功！
                    </h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto">
                      我们已收到您的预约信息，我们的顾问将在24小时内与您联系。
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
                        onClose();
                      }}
                      className="rounded-full"
                    >
                      关闭
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    {/* 表单 */}
                    <div>
                      <p className="text-gray-300 mb-6">
                        请填写以下信息，我们的顾问将尽快与您联系，为您提供专业的咨询服务。
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-5">
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
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
