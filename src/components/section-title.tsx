'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  label: string;
  enLabel: string;
  title: string;
  description?: string;
}

export function SectionTitle({ icon: Icon, label, enLabel, title, description }: SectionTitleProps) {
  return (
    <div className="text-center mb-8 lg:mb-12">
      <div className="flex items-center justify-center gap-3 overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-purple-500/50"
        />
        <Icon className="w-5 h-5 text-purple-400" />
        <span className="text-sm sm:text-base font-medium text-purple-400 whitespace-nowrap">{label}</span>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-purple-500/50"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-500 tracking-widest -mt-[15px] mb-2">{enLabel}</p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight sm:leading-normal">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
