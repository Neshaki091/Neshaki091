import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText, CheckCircle2, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { useLanguageStore } from '../../stores/languageStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { projects } = useContentStore();

  return (
    <section id="projects" className="py-20 relative bg-[#F2E9E4]/40 dark:bg-[#0D1117]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">{t('projects.title')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22223B] dark:text-[#E6EDF3]">
            {t('projects.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-[#4A4E69] dark:bg-[#00D9FF] mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Cards List */}
        <div className="space-y-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="p-8 border-[#C9ADA7] dark:border-[#30363D] hover:border-[#4A4E69]/60 dark:hover:border-[#00D9FF]/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Details & Tech Stack */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="cyan">
                        {typeof project.type === 'string'
                          ? project.type
                          : (project.type?.[language] || project.type?.en || '')}
                      </Badge>
                      {project.id === 'hackathon-ai' && (
                        <Badge variant="orange" className="flex items-center gap-1 font-bold">
                          <Zap className="w-3 h-3 text-[#4A4E69] dark:text-[#F78166]" /> 36h Working Demo ⚡
                        </Badge>
                      )}
                      <span className="text-xs font-mono text-[#9A8C98] dark:text-[#8B949E]">
                        Role: {typeof project.role === 'string'
                          ? project.role
                          : (project.role?.[language] || project.role?.en || '')}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#22223B] dark:text-[#E6EDF3] flex items-center gap-2">
                        {project.title}
                        <span className="text-[#4A4E69] dark:text-[#00D9FF] text-lg font-mono font-normal">
                          — {typeof project.subtitle === 'string'
                            ? project.subtitle
                            : (project.subtitle?.[language] || project.subtitle?.en || '')}
                        </span>
                      </h3>
                    </div>

                    <p className="text-sm text-[#4A4E69] dark:text-[#C9D1D9] leading-relaxed">
                      {typeof project.description === 'string'
                        ? project.description
                        : (project.description?.[language] || project.description?.en || '')}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(project.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-[#FAF6F0] dark:bg-[#21262D] border border-[#C9ADA7] dark:border-[#30363D] text-xs font-mono text-[#4A4E69] dark:text-[#58A6FF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Features */}
                    <div className="pt-4 space-y-2">
                      <h4 className="text-xs font-mono font-bold text-[#22223B] dark:text-[#E6EDF3] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF]" />
                        {t('projects.keyFeatures')}
                      </h4>
                      <div className="grid grid-cols-1 gap-2 text-xs text-[#9A8C98] dark:text-[#8B949E]">
                        {(Array.isArray(project.features)
                          ? project.features
                          : (project.features?.[language] || project.features?.en || [])
                        ).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A4E69] dark:text-[#00D9FF] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Metrics & Links */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-[#C9ADA7]/60 lg:dark:border-[#30363D]/60 lg:pl-8">
                    
                    {/* Metrics Box */}
                    {project.metrics && (
                      <div className="p-4 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#00D9FF]/30 space-y-2">
                        <h4 className="text-xs font-mono font-bold text-emerald-800 dark:text-[#3FB950] uppercase flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {t('projects.results')}
                        </h4>
                        <ul className="space-y-1.5 text-xs text-[#22223B] dark:text-[#C9D1D9] font-mono">
                          {(Array.isArray(project.metrics)
                            ? project.metrics
                            : (project.metrics?.[language] || project.metrics?.en || [])
                          ).map((m, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <span className="text-[#4A4E69] dark:text-[#00D9FF] font-bold">›</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Links Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#C9ADA7]/40 dark:border-[#30363D]/40">
                      {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                            {t('projects.viewDemo')}
                          </Button>
                        </a>
                      )}
                      {project.links.docs && (
                        <a href={project.links.docs} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" icon={<FileText className="w-4 h-4" />}>
                            {t('projects.viewDocs')}
                          </Button>
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="secondary" size="sm" icon={<Github className="w-4 h-4" />}>
                            {t('projects.viewGithub')}
                          </Button>
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
