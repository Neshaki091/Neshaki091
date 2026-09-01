import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { useLanguageStore } from '../../stores/languageStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const About: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { profile, timeline } = useContentStore();

  const activeTimeline = timeline && timeline.length > 0 ? timeline : [];

  return (
    <section id="about" className="py-20 relative bg-[#F2E9E4]/60 dark:bg-[#0D1117]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">{t('about.title')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22223B] dark:text-[#E6EDF3]">
            {t('about.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-[#4A4E69] dark:bg-[#00D9FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio & Education Summary */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="border-[#C9ADA7] dark:border-[#00D9FF]/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[#4A4E69]/10 dark:bg-[#00D9FF]/10 text-[#4A4E69] dark:text-[#00D9FF]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22223B] dark:text-[#E6EDF3] text-lg">{profile?.education || ''}</h3>
                  <p className="text-sm text-[#4A4E69] dark:text-[#00D9FF] font-medium">{profile?.degree || ''}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] mb-4">
                <span className="text-xs text-[#9A8C98] dark:text-[#8B949E] block">Academic Standing</span>
                <span className="text-xl font-mono font-bold text-emerald-700 dark:text-[#3FB950]">GPA: {profile?.gpa || '3.34 / 4.0'}</span>
              </div>

              <p className="text-sm text-[#4A4E69] dark:text-[#C9D1D9] leading-relaxed">
                {profile?.bio || ''}
              </p>
            </Card>

            {/* Core Values / Focus */}
            <Card hoverEffect={false}>
              <h4 className="font-bold text-[#22223B] dark:text-[#E6EDF3] mb-3 text-sm font-mono flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#4A4E69] dark:text-[#58A6FF]" />
                Core Engineering Philosophy
              </h4>
              <ul className="space-y-2 text-xs text-[#9A8C98] dark:text-[#8B949E]">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  SIMD Hardware acceleration & vector memory compression
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  Clean microservice separation with event-driven message queues
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  Empirical benchmarking & automated LLM evaluation
                </li>
              </ul>
            </Card>
          </div>

          {/* Timeline Milestones */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-[#22223B] dark:text-[#E6EDF3] mb-6 flex items-center gap-2 font-mono">
              <Calendar className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
              {t('about.timelineTitle')}
            </h3>

            <div className="relative border-l-2 border-[#C9ADA7] dark:border-[#30363D] pl-6 space-y-8 ml-2">
              {activeTimeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#F2E9E4] dark:bg-[#0D1117] border-2 border-[#4A4E69] dark:border-[#00D9FF] group-hover:scale-125 transition-transform" />

                  <Card className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4A4E69]/10 dark:bg-[#00D9FF]/10 text-[#4A4E69] dark:text-[#00D9FF] font-bold">
                        {item.year}
                      </span>
                      <Badge variant={item.type === 'achievement' ? 'orange' : 'dark'}>
                        {item.type.toUpperCase()}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3]">
                      {typeof item.title === 'string' ? item.title : (item.title?.[language] || item.title?.en || '')}
                    </h4>
                    <p className="text-xs font-mono text-[#4A4E69] dark:text-[#58A6FF] mb-2">
                      {typeof item.subtitle === 'string' ? item.subtitle : (item.subtitle?.[language] || item.subtitle?.en || '')}
                    </p>
                    <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] leading-relaxed">
                      {typeof item.description === 'string' ? item.description : (item.description?.[language] || item.description?.en || '')}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
