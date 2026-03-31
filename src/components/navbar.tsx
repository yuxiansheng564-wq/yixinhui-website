'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '@/components/auth-modal';
import { User, Sparkles } from 'lucide-react';

// 自定义事件：打开意心之镜
export const OPEN_YIXIN_EVENT = 'openYixinModal';

type NavLink = {
  name: string;
  href: string;
  group?: string;
};

const navLinks: NavLink[] = [
  { name: '首页', href: '/' },
  { name: '产品矩阵', href: '/#scenarios' },
  { name: '行业案例', href: '/#cases' },
  { name: '服务与合作', href: '/#process' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const openYixinModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent(OPEN_YIXIN_EVENT));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 20);
    };

    document.body.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center justify-center hover:opacity-80 transition-opacity -ml-8"
            style={{ width: '140px', height: '48px' }}
          >
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.img
                  key="icon-logo"
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  src="/pics/logo.jpg"
                  alt="意心会 Logo"
                  className="w-10 h-10 object-contain rounded-full"
                  layout
                />
              ) : (
                <motion.span
                  key="text-logo"
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -5 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="text-xl lg:text-2xl font-semibold tracking-tight text-white"
                  layout
                >
                  意心会
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* AI 体验按钮 - 带呼吸光效 */}
            <button
              onClick={openYixinModal}
              className="relative w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors group"
              aria-label="体验 AI"
            >
              {/* 呼吸光效 */}
              <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" style={{ animationDuration: '2s' }} />
              <span className="absolute inset-0 rounded-full bg-purple-500/20" />
              <Sparkles className="w-5 h-5 text-purple-400 relative z-10" />
            </button>

            {/* Login */}
            <button
              onClick={openAuthModal}
              className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors"
              aria-label="登录"
            >
              <User className="w-5 h-5 text-gray-300" />
            </button>

            {/* Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="菜单"
              >
                <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              {/* Dropdown Menu - OpenAI Style */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-[#0A0A0A] border border-gray-800/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-800/50 ${
                            pathname === link.href
                              ? 'text-white bg-gray-800/30'
                              : 'text-gray-300'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
      />
    </nav>
  );
}
