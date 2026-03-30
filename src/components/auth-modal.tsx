'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    code: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          loginMethod,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          name: formData.name,
          code: formData.code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        onClose();
        alert(data.message || (mode === 'login' ? '登录成功！' : '注册成功！'));
      } else {
        setIsLoading(false);
        alert(data.error || '操作失败，请重试');
      }
    } catch (error) {
      setIsLoading(false);
      alert('网络错误，请稍后重试');
    }
  };

  const handleSendCode = async () => {
    if (!formData.phone) {
      alert('请先输入手机号');
      return;
    }
    // 模拟发送验证码
    alert('验证码已发送到 ' + formData.phone);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* 模态框 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 w-full max-w-md relative"
            >
              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 标题 */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {mode === 'login' ? '欢迎回来' : '创建账户'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {mode === 'login' ? '登录您的账户以继续' : '填写信息创建新账户'}
                </p>
              </div>

              {/* 表单 */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 注册时显示姓名 */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      姓名
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="请输入您的姓名"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        required={mode === 'register'}
                      />
                    </div>
                  </div>
                )}

                {/* 登录方式切换 */}
                {mode === 'login' && (
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        loginMethod === 'email'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      邮箱登录
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        loginMethod === 'phone'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      手机号登录
                    </button>
                  </div>
                )}

                {/* 邮箱输入 */}
                {((mode === 'login' && loginMethod === 'email') || mode === 'register') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      邮箱地址
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="请输入邮箱地址"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        required={mode === 'register' || (mode === 'login' && loginMethod === 'email')}
                      />
                    </div>
                  </div>
                )}

                {/* 手机号输入 */}
                {(mode === 'register' || (mode === 'login' && loginMethod === 'phone')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      手机号码
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="请输入手机号码"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        required={mode === 'register' || (mode === 'login' && loginMethod === 'phone')}
                      />
                    </div>
                  </div>
                )}

                {/* 验证码（手机号登录时） */}
                {mode === 'login' && loginMethod === 'phone' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      验证码
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="请输入验证码"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleSendCode}
                        className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        发送验证码
                      </button>
                    </div>
                  </div>
                )}

                {/* 密码 */}
                {(mode === 'login' && loginMethod === 'email') || mode === 'register' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      密码
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="请输入密码"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                ) : null}

                {/* 提交按钮 */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
                </Button>
              </form>

              {/* 切换登录/注册 */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setFormData({ email: '', phone: '', password: '', name: '', code: '' });
                  }}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {mode === 'login' ? '还没有账户？立即注册' : '已有账户？立即登录'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
