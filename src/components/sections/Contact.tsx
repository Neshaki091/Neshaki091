import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send, Github, Linkedin, Globe, CheckCircle, Copy, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useContentStore } from '../../stores/contentStore';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { contactInfo } = useContentStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`[Portfolio Contact] Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Luyện,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
      );
      const mailtoUrl = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#F2E9E4] dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">{t('contact.title')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22223B] dark:text-[#E6EDF3]">
            {t('contact.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-[#4A4E69] dark:bg-[#00D9FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Connections */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false}>
              <h3 className="text-lg font-bold text-[#22223B] dark:text-[#E6EDF3] mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
                {t('contact.directEmail')}
              </h3>

              <div className="flex items-center gap-2 mb-6">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#4A4E69] dark:text-[#00D9FF] font-mono text-sm hover:underline font-bold"
                >
                  {contactInfo.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-[#4A4E69] dark:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-[#3FB950]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <h4 className="text-sm font-bold text-[#22223B] dark:text-[#E6EDF3] mb-3 font-mono">
                {t('contact.socials')}
              </h4>
              <div className="space-y-3">
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
                >
                  <Github className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  <span className="font-mono">{contactInfo.github.replace('https://', '')}</span>
                </a>
                <a
                  href={contactInfo.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
                >
                  <Globe className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  <span className="font-mono">{contactInfo.huggingface.replace('https://', '')}</span>
                </a>
                <a
                  href={`https://${contactInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:border-[#4A4E69] dark:hover:border-[#00D9FF] transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-[#4A4E69] dark:text-[#00D9FF]" />
                  <span className="font-mono">{contactInfo.linkedin}</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-[#3FB950] mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-[#22223B] dark:text-[#E6EDF3]">Opening Email App...</h4>
                  <p className="text-sm text-[#9A8C98] dark:text-[#8B949E]">Opening your mail application to send direct email to {contactInfo.email}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 uppercase">
                      {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Huỳnh Công Luyện"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] text-sm focus:outline-none focus:border-[#4A4E69] dark:focus:border-[#00D9FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 uppercase">
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] text-sm focus:outline-none focus:border-[#4A4E69] dark:focus:border-[#00D9FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 uppercase">
                      {t('contact.formMessage')}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello, I would like to discuss..."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] text-sm focus:outline-none focus:border-[#4A4E69] dark:focus:border-[#00D9FF] transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Gửi Email Trực Tiếp ({'mailto:'})
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
