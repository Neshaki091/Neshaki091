import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Cpu, Zap, Database, Layers } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useContentStore } from '../../stores/contentStore';
import { useLanguageStore } from '../../stores/languageStore';

export const Research: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { research } = useContentStore();

  const highlights = research.highlights || [];

  return (
    <section id="research" className="py-20 relative bg-[#F2E9E4] dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">{t('research.title')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22223B] dark:text-[#E6EDF3]">
            {t('research.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-[#4A4E69] dark:bg-[#00D9FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Abstract Card */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-[#C9ADA7] dark:border-[#00D9FF]/40 glow-cyan">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#4A4E69]/10 dark:bg-[#00D9FF]/10 text-[#4A4E69] dark:text-[#00D9FF]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#22223B] dark:text-[#E6EDF3]">{t('research.abstractTitle')}</h3>
                  <p className="text-xs font-mono text-[#4A4E69] dark:text-[#00D9FF]">Graduate Thesis — 2026</p>
                </div>
              </div>

              <p className="text-sm text-[#4A4E69] dark:text-[#C9D1D9] leading-relaxed mb-6">
                {language === 'vi' ? research.abstractVi : research.abstractEn}
              </p>

              {/* Specs Box */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D]">
                <div>
                  <span className="text-xs text-[#9A8C98] dark:text-[#8B949E] block font-mono">Memory Reduction</span>
                  <span className="text-xl font-bold text-[#4A4E69] dark:text-[#00D9FF] font-mono">{research.memoryReduction}</span>
                  <span className="text-[10px] text-[#9A8C98] dark:text-[#6E7681] block">Float32 → 2-4bit</span>
                </div>
                <div>
                  <span className="text-xs text-[#9A8C98] dark:text-[#8B949E] block font-mono">Accuracy Retention</span>
                  <span className="text-xl font-bold text-emerald-700 dark:text-[#3FB950] font-mono">{research.accuracyRetention}</span>
                  <span className="text-[10px] text-[#9A8C98] dark:text-[#6E7681] block">Recall@K vs Baseline</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Key Technical Highlights */}
          <motion.div
            className="lg:col-span-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {highlights.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl glass-card border border-[#C9ADA7] dark:border-[#30363D] hover:border-[#4A4E69]/60 dark:hover:border-[#00D9FF]/50 transition-all flex items-start gap-4"
              >
                <div className="p-2 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] text-[#4A4E69] dark:text-[#00D9FF] shrink-0 border border-[#C9ADA7] dark:border-[#30363D]">
                  {idx % 5 === 0 && <Cpu className="w-5 h-5" />}
                  {idx % 5 === 1 && <Zap className="w-5 h-5 text-[#4A4E69] dark:text-[#58A6FF]" />}
                  {idx % 5 === 2 && <Layers className="w-5 h-5 text-[#9A8C98] dark:text-[#F78166]" />}
                  {idx % 5 === 3 && <Database className="w-5 h-5 text-emerald-700 dark:text-[#3FB950]" />}
                  {idx % 5 === 4 && <BookOpen className="w-5 h-5 text-[#4A4E69] dark:text-[#D2A8FF]" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
