import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Server, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { useLanguageStore } from '../../stores/languageStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const Skills: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { skills } = useContentStore();

  const categoryIcons: Record<string, React.ReactNode> = {
    languages: <Code className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />,
    frameworks: <Server className="w-5 h-5 text-[#4A4E69] dark:text-[#58A6FF]" />,
    ai_vector: <Cpu className="w-5 h-5 text-[#9A8C98] dark:text-[#F78166]" />,
    databases_devops: <Database className="w-5 h-5 text-emerald-700 dark:text-[#3FB950]" />,
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">{t('skills.title')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22223B] dark:text-[#E6EDF3]">
            {t('skills.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-[#4A4E69] dark:bg-[#00D9FF] mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-[#C9ADA7] dark:border-[#30363D]">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#C9ADA7] dark:border-[#30363D]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D]">
                      {categoryIcons[cat.category] || <Code className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />}
                    </div>
                    <h3 className="text-lg font-bold text-[#22223B] dark:text-[#E6EDF3]">
                      {typeof cat.title === 'string'
                        ? cat.title
                        : (cat.title?.[language] || cat.title?.en || '')}
                    </h3>
                  </div>
                  <Badge variant="dark" className="text-[11px]">
                    {(cat.items || []).length} {language === 'vi' ? 'Công nghệ' : 'Techs'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {(cat.items || []).map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-lg bg-[#FAF6F0]/80 dark:bg-[#161B22]/70 border border-[#C9ADA7]/60 dark:border-[#30363D]/60 hover:border-[#4A4E69]/60 dark:hover:border-[#00D9FF]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-bold font-mono text-[#22223B] dark:text-[#E6EDF3]">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#4A4E69]/10 dark:bg-[#00D9FF]/10 text-[#4A4E69] dark:text-[#00D9FF]">
                            {skill.level}
                          </span>
                        )}
                      </div>

                      {skill.description && (
                        <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] leading-relaxed flex items-start gap-1.5 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF] shrink-0 mt-0.5" />
                          <span>
                            {typeof skill.description === 'string'
                              ? skill.description
                              : (skill.description?.[language] || skill.description?.en || '')}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
