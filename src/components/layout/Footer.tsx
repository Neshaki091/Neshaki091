import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Mail, Rocket, Lock } from 'lucide-react';
import { AdminModal } from '../admin/AdminModal';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Keyboard shortcut listener Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <footer className="border-t border-[#C9ADA7] dark:border-[#30363D] bg-[#F2E9E4] dark:bg-[#0D1117] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#C9ADA7]/60 dark:border-[#30363D]/60">
          <div>
            <h3 className="text-lg font-mono font-bold text-[#22223B] dark:text-[#E6EDF3] flex items-center gap-2">
              <span className="text-[#4A4E69] dark:text-[#00D9FF]">Huỳnh Công Luyện</span>
            </h3>
            <p className="text-sm text-[#9A8C98] dark:text-[#8B949E] mt-1 max-w-md">
              {t('hero.tagline')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/neshaki091"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://web.waterbase.click"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
              title="Waterbase BaaS"
            >
              <Rocket className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
            </a>
            <a
              href="mailto:neshaki091@gmail.com"
              className="p-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9A8C98] dark:text-[#6E7681]">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} Huỳnh Công Luyện. {t('footer.rights')}</p>
            {/* Hidden Admin Lock Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1 rounded opacity-40 hover:opacity-100 text-[#4A4E69] dark:text-[#00D9FF] transition-opacity"
              title="Admin Control Panel (Ctrl+Shift+A)"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-mono italic text-[#4A4E69] dark:text-[#8B949E]">
            "{t('footer.quote')}"
          </p>
        </div>
      </div>

      {/* Secret Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
};
