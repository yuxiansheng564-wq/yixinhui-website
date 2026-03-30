'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { X, Send, User, Bot, ChevronDown, ChevronRight, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { streamLLMAgent, StreamCallbacks, BOT_ID_XIAOYI } from '@/lib/coze-api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string; // 思维过程
}

interface XiaoyiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 折叠思维组件
function ThinkingBlock({ thinking, isThinking, hasAnswer }: { 
  thinking: string; 
  isThinking?: boolean;
  hasAnswer?: boolean; // 是否已有答案（有答案时自动收起）
}) {
  // 默认展开
  const [isExpanded, setIsExpanded] = useState(true);
  // 记录是否已经自动收起过（只收起一次）
  const hasAutoCollapsed = useRef(false);
  // 思考计时（秒）
  const [thinkingTime, setThinkingTime] = useState(0);
  // 最终思考时间（思考结束时保存）
  const finalTimeRef = useRef(0);
  
  // 计时器
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isThinking) {
      // 开始计时
      timer = setInterval(() => {
        setThinkingTime((t) => {
          const newTime = t + 1;
          finalTimeRef.current = newTime; // 同步保存
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isThinking]);
  
  // 当答案第一次出现时，自动收起（只触发一次）
  useEffect(() => {
    if (hasAnswer && !hasAutoCollapsed.current) {
      hasAutoCollapsed.current = true;
      setIsExpanded(false);
    }
  }, [hasAnswer]);
  
  // 内容过滤：只显示前200字
  const maxLength = 200;
  const filteredThinking = thinking.length > maxLength 
    ? thinking.slice(0, maxLength) + '...' 
    : thinking;
  
  // 显示的时间：思考中用动态时间，思考结束用保存的最终时间
  const displayTime = isThinking ? thinkingTime : finalTimeRef.current;
  
  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-300 transition-colors py-1"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        <Brain className={`w-3 h-3 ${isThinking ? 'animate-pulse text-purple-400' : ''}`} />
        <span className={isThinking ? 'text-purple-400' : ''}>思维过程</span>
        {isThinking && (
          <>
            <span className="text-purple-400 ml-1">思考{thinkingTime}秒</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        )}
        {!isThinking && displayTime > 0 && (
          <span className="text-gray-500 ml-1">{displayTime}秒</span>
        )}
      </button>
      {isExpanded && (
        <div className="mt-1.5 pl-4 text-xs text-gray-500 leading-relaxed border-l-2 border-gray-700 whitespace-pre-wrap animate-fadeIn">
          {filteredThinking}
          {isThinking && (
            <span className="inline-block w-1.5 h-3 bg-purple-400 ml-0.5 animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
}

export function XiaoyiModal({ isOpen, onClose }: XiaoyiModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const conversationIdRef = useRef<string>('');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 滑动手势状态
  const [swipeY, setSwipeY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartY = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const chatHistory = messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    const query = input;
    setInput('');

    const answerId = `answer-${Date.now()}`;

    const callbacks: StreamCallbacks = {
      onThinking: (content: string) => {
        setMessages((prev) => {
          const existing = prev.find((msg) => msg.id === answerId);
          if (existing) {
            // 累加思维内容
            return prev.map((msg) =>
              msg.id === answerId ? { ...msg, thinking: (msg.thinking || '') + content } : msg
            );
          } else {
            return [...prev, { id: answerId, role: 'assistant' as const, content: '', thinking: content }];
          }
        });
      },
      onAnswer: (content: string) => {
        setMessages((prev) => {
          const existing = prev.find((msg) => msg.id === answerId);
          if (existing) {
            // API 层已过滤完整消息，这里只需累加增量
            return prev.map((msg) =>
              msg.id === answerId ? { ...msg, content: msg.content + content } : msg
            );
          } else {
            return [...prev, { id: answerId, role: 'assistant' as const, content }];
          }
        });
      },
      onDone: (newConversationId: string) => {
        conversationIdRef.current = newConversationId;
        setIsTyping(false);
      },
      onError: (error: Error) => {
        setMessages((prev) => [
          ...prev,
          { id: `error-${Date.now()}`, role: 'assistant', content: `抱歉，服务出现错误：${error.message}` },
        ]);
        setIsTyping(false);
      },
    };

    await streamLLMAgent(query, userId, conversationIdRef.current || undefined, chatHistory, callbacks, BOT_ID_XIAOYI);
  }, [input, messages, userId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 点击背景关闭
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 触摸滑动关闭（仅当滚动到顶部时才允许下拉关闭）
  const handleTouchStart = (e: React.TouchEvent) => {
    // 只在内容区域顶部时才允许下拉关闭
    const target = e.target as HTMLElement;
    const messagesArea = target.closest('.messages-area');
    if (messagesArea && messagesArea.scrollTop > 0) {
      return; // 滚动中不允许下拉
    }
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    // 只允许向下滑动，且下滑距离大于10px时才阻止默认行为（防止误触）
    if (diff > 10) {
      e.preventDefault();
      setSwipeY(diff * 0.5); // 减缓滑动速度
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    // 下滑超过 150px 关闭
    if (swipeY > 150) {
      onClose();
    }
    setSwipeY(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/80"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: swipeY }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
            style={{ transform: `translateY(${swipeY}px)` }}
            className="absolute inset-0 md:static md:mx-auto md:my-auto md:w-[90vw] md:h-[85vh] md:max-w-4xl bg-[#212121] flex flex-col overflow-hidden md:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
              {/* 移动端下拉提示 */}
              <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1.5 w-10 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-medium">小</span>
                </div>
                <span className="text-white font-medium">小意</span>
                <span className="text-gray-500 text-sm ml-1 hidden sm:inline">AI 顾问</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors mt-2 md:mt-0"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* 消息区域 */}
            <div className="messages-area flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-black text-lg font-medium">小</span>
                  </div>
                  <h2 className="text-white text-lg font-medium mb-2">小意 AI 顾问</h2>
                  <p className="text-gray-500 text-center text-sm mb-3">咨询业务？和小意聊聊吧</p>
                  <div className="max-w-md text-gray-400 text-xs leading-relaxed text-left w-full px-4">
                    <p className="mb-1">我叫小意，是意心会的AI顾问，也是公司里的AI实习生，目前还在努力学习中，请您多包涵！😊</p>
                    <p className="mb-1">我可以帮您解答关于意心会公司、产品和服务的疑问，也会根据您的业务问题帮您分析需求、推荐解决方案。</p>
                    <p>如果有更具体或复杂的需求，我还可以帮您预约资深顾问一对一沟通。</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-4">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                        message.role === 'user' ? 'bg-purple-600' : 'bg-white'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-black" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* 思维过程（仅 assistant 消息显示） */}
                        {message.role === 'assistant' && message.thinking && (
                          <ThinkingBlock 
                            thinking={message.thinking} 
                            isThinking={isTyping && message.id.startsWith('answer-')}
                            hasAnswer={!!message.content}
                          />
                        )}
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && !messages.some((m) => m.id.startsWith('answer-')) && (
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div className="flex gap-1 py-2">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* 输入区域 */}
            <div className="p-3 sm:p-4 border-t border-white/10 flex-shrink-0 bg-[#212121]" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center bg-[#2f2f2f] rounded-2xl overflow-hidden">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="发送消息"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="flex-1 min-w-0 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500 text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="flex-shrink-0 m-1.5 p-2 bg-white hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
