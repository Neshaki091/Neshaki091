import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Terminal, Sun, Moon } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { useThemeStore } from '../../stores/themeStore';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguageStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#research', label: t('nav.research') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleToggleLang = () => {
    const nextLang = language === 'en' ? 'vi' : 'en';
    toggleLanguage();

    // Trigger Google Smart Auto-Translate
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = nextLang;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-mono text-lg font-bold text-slate-800 dark:text-[#E6EDF3] hover:text-indigo-600 dark:hover:text-[#00D9FF] transition-colors"
        >
          <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-[#00D9FF]/10 text-indigo-600 dark:text-[#00D9FF] border border-indigo-200 dark:border-[#00D9FF]/30">
            <Terminal className="w-5 h-5" />
          </span>
          <span>Neshaki<span className="text-indigo-600 dark:text-[#00D9FF]">091</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4A4E69] dark:text-[#C9D1D9] hover:text-[#22223B] dark:hover:text-[#00D9FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#4A4E69]" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={handleToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-xs font-mono text-[#22223B] dark:text-[#E6EDF3] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
            title="Switch Language (EN / VI)"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-[#00D9FF]" />
            <span className={language === 'en' ? 'font-bold text-indigo-600 dark:text-[#00D9FF]' : 'text-slate-500 dark:text-gray-400'}>EN</span>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className={language === 'vi' ? 'font-bold text-indigo-600 dark:text-[#00D9FF]' : 'text-slate-500 dark:text-gray-400'}>VI</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.ctaContact')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D]"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4A4E69]" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-xs font-mono text-indigo-600 dark:text-[#00D9FF]"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 dark:text-[#E6EDF3]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-[#C9ADA7] dark:border-[#30363D] px-4 pt-4 pb-6 mt-3 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 dark:text-[#E6EDF3] hover:text-indigo-600 dark:hover:text-[#00D9FF] border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
