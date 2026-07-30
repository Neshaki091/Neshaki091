import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Cpu, ShieldCheck, User } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { profile } = useContentStore();
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9A8C98]/20 dark:bg-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#C9ADA7]/30 dark:bg-[#58A6FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro Text */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Row: Avatar + Badges */}
            <div className="flex items-center gap-4">
              {/* Profile Avatar Frame */}
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-[#4A4E69] to-[#9A8C98] dark:from-[#00D9FF] dark:to-[#58A6FF] shadow-lg shadow-[#4A4E69]/20 dark:shadow-[#00D9FF]/20 group-hover:scale-105 transition-transform duration-300">
                  {!imgError ? (
                    <img
                      src={profile.avatarUrl || '/avatar.jpg'}
                      alt={profile.name}
                      onError={() => setImgError(true)}
                      className="w-full h-full rounded-full object-cover bg-[#F2E9E4] dark:bg-[#161B22]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#FAF6F0] dark:bg-[#161B22] flex items-center justify-center text-[#4A4E69] dark:text-[#00D9FF]">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#F2E9E4] dark:border-[#0D1117]" title="Available for opportunities" />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-2">
                  <Badge variant="cyan" className="text-xs px-2.5 py-0.5">
                    <Cpu className="w-3 h-3 mr-1 animate-pulse" />
                    {profile?.badge || 'Backend & AI Software Engineer'}
                  </Badge>
                  <Badge variant="green" className="text-xs px-2.5 py-0.5">
                    GPA {profile?.gpa || '3.26 / 4.0'}
                  </Badge>
                </div>
                <span className="text-xs font-mono text-[#9A8C98] dark:text-[#8B949E]">
                  {profile?.education || 'University of Transport Ho Chi Minh City'}
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#22223B] dark:text-[#E6EDF3] tracking-tight leading-none">
              {profile?.titlePrefix || 'Hello, I am '}
              <span className="text-gradient block mt-2">
                {profile?.name || 'Huỳnh Công Luyện'}
              </span>
            </h1>

            <p className="text-xl text-[#4A4E69] dark:text-[#00D9FF] font-mono font-medium max-w-2xl">
              {profile?.tagline || ''}
            </p>

            <p className="text-base text-[#9A8C98] dark:text-[#8B949E] leading-relaxed max-w-xl">
              {profile?.subtext || ''}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                {t('hero.ctaProjects')}
              </Button>

              <a href="#contact">
                <Button variant="secondary" size="lg">
                  {t('hero.ctaContact')}
                </Button>
              </a>
            </div>

            {/* Features Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#C9ADA7]/40 dark:border-[#30363D]/40">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4A4E69] dark:text-[#C9D1D9]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#3FB950]" />
                <span>Rust SIMD AVX2</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4A4E69] dark:text-[#C9D1D9]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#3FB950]" />
                <span>Vector Quantization</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4A4E69] dark:text-[#C9D1D9]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#3FB950]" />
                <span>Waterbase BaaS</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: SIMD Rust Code Terminal */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl overflow-hidden bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] shadow-2xl">
              <div className="px-4 py-3 bg-[#0D1117] border-b border-[#30363D] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-[#8B949E]">arq_rag_engine.rs</span>
                </div>
                <Badge variant="green" className="text-[10px] px-2 py-0.5 font-mono">
                  AVX2 Accelerated
                </Badge>
              </div>

              <div className="p-4 font-mono text-xs text-[#E6EDF3] leading-relaxed overflow-x-auto">
                <p className="text-[#8B949E]">// TurboQuant Vector Quantization & ADC Search</p>
                <p className="text-[#F78166] mt-2">#[target_feature(enable = <span className="text-[#00D9FF]">"avx2"</span>)]</p>
                <p><span className="text-[#FF7B72]">pub unsafe fn</span> <span className="text-[#D2A8FF]">quantize_and_search_avx2</span>(</p>
                <p className="pl-4">query: <span className="text-[#79C0FF]">&[f32]</span>,</p>
                <p className="pl-4">codebook: <span className="text-[#79C0FF]">&[u8]</span>,</p>
                <p className="pl-4">adc_lut: <span className="text-[#79C0FF]">&[f32; 256]</span>,</p>
                <p>) -&gt; <span className="text-[#79C0FF]">Vec&lt;SearchResult&gt;</span> &#123;</p>
                
                <p className="pl-4 text-[#8B949E] mt-2">// 256-bit SIMD intrinsic parallel dot product</p>
                <p className="pl-4"><span className="text-[#FF7B72]">let</span> v_query = _mm256_loadu_ps(query.as_ptr());</p>
                <p className="pl-4"><span className="text-[#FF7B72]">let</span> v_lut = _mm256_loadu_ps(adc_lut.as_ptr());</p>
                <p className="pl-4"><span className="text-[#FF7B72]">let</span> score = _mm256_fmadd_ps(v_query, v_lut, _mm256_setzero_ps());</p>

                <p className="pl-4 text-[#3FB950] mt-2">// 8x Memory footprint reduction (Float32 -&gt; 4bit)</p>
                <p className="pl-4">_mm256_storeu_ps(res.as_mut_ptr(), score);</p>
                <p className="pl-4">res</p>
                <p>&#125;</p>
              </div>

              <div className="px-4 py-2 bg-[#0D1117] border-t border-[#30363D] flex items-center justify-between text-[11px] font-mono text-[#8B949E]">
                <span>Status: <span className="text-[#3FB950]">8x Quantized Memory</span></span>
                <span>Recall@K: <span className="text-[#00D9FF]">&gt; 95.4%</span></span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
