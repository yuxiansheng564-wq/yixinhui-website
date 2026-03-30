'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { SectionTitle } from '@/components/section-title';

export function AIStartGuide() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          icon={HelpCircle}
          label="【入门指南】"
          enLabel="Getting Started"
          title="想拥抱 AI 却不知道从哪里开始？"
        />
      </div>
    </section>
  );
}
