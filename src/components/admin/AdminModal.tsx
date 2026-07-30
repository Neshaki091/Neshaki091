import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Lock, Key, Mail, Database, ShieldCheck, Server, Edit3, Plus, Trash2, Save, RefreshCw, Languages, Globe, ShieldAlert, Sun, Moon, Cpu, Code, BookOpen, Link, UserCheck, Upload, Archive } from 'lucide-react';
import { isSupabaseConfigured, supabase, saveTranslationToSupabase, verifyAdminSecretFromSupabase, updateAdminSecretOnSupabase, uploadAvatarToImageBucket } from '../../lib/supabase';
import { useContentStore, ResearchHighlightItem } from '../../stores/contentStore';
import { useThemeStore } from '../../stores/themeStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Project, SkillCategory } from '../../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'research' | 'i18n' | 'messages' | 'env'>('profile');
  
  const [messages, setMessages] = useState<any[]>([]);
  const {
    profile,
    projects,
    skills,
    research,
    contactInfo,
    updateProfile,
    updateProject,
    addProject,
    deleteProject,
    updateSkills,
    updateResearch,
    addResearchHighlight,
    deleteResearchHighlight,
    updateContactInfo,
    backupToRecoveryBucket,
  } = useContentStore();

  // Profile Form States
  const [profAvatarUrl, setProfAvatarUrl] = useState(profile.avatarUrl || '/avatar.jpg');
  const [profBadge, setProfBadge] = useState(profile.badge);
  const [profTitlePrefix, setProfTitlePrefix] = useState(profile.titlePrefix);
  const [profName, setProfName] = useState(profile.name);
  const [profTagline, setProfTagline] = useState(profile.tagline);
  const [profSubtext, setProfSubtext] = useState(profile.subtext);
  const [profBio, setProfBio] = useState(profile.bio);
  const [profEducation, setProfEducation] = useState(profile.education);
  const [profDegree, setProfDegree] = useState(profile.degree);
  const [profGpa, setProfGpa] = useState(profile.gpa);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Technical Skills Editing State
  const [editableSkills, setEditableSkills] = useState<SkillCategory[]>(skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [newSkillDescVi, setNewSkillDescVi] = useState('');
  const [newSkillDescEn, setNewSkillDescEn] = useState('');
  const [selectedCatIdx, setSelectedCatIdx] = useState(0);

  // Research & Contact Editing States
  const [editResVi, setEditResVi] = useState(research.abstractVi);
  const [editResEn, setEditResEn] = useState(research.abstractEn);
  const [editMemRed, setEditMemRed] = useState(research.memoryReduction);
  const [editAccRet, setEditAccRet] = useState(research.accuracyRetention);

  const [newResTitle, setNewResTitle] = useState('');
  const [newResDesc, setNewResDesc] = useState('');

  const [editEmail, setEditEmail] = useState(contactInfo.email);
  const [editGithub, setEditGithub] = useState(contactInfo.github);
  const [editWaterbase, setEditWaterbase] = useState(contactInfo.waterbase);

  const [newSecretPasscode, setNewSecretPasscode] = useState('');
  const [secretChangeStatus, setSecretChangeStatus] = useState('');

  const [jsonLang, setJsonLang] = useState<'en' | 'vi'>('en');
  const [jsonContent, setJsonContent] = useState(() => JSON.stringify(i18n.getResourceBundle('en', 'translation') || {}, null, 2));
  const [jsonError, setJsonError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    setEditableSkills(skills);
  }, [skills]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    const isValid = await verifyAdminSecretFromSupabase(passcode);
    setIsVerifying(false);

    if (isValid) {
      setIsAuthenticated(true);
      setAuthError('');
      fetchMessages();
    } else {
      setAuthError('Mật khẩu Secret Passcode không khớp trên Supabase!');
    }
  };

  const fetchMessages = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
  };

  // Avatar Image Upload to Supabase 'image' Bucket
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    const res = await uploadAvatarToImageBucket(file);
    setUploadingAvatar(false);

    if (res.success && res.url) {
      setProfAvatarUrl(res.url);
      updateProfile({ avatarUrl: res.url });
      setSaveSuccess('Đã tải ảnh Avatar mới lên Bucket `image` trên Supabase thành công!');
      setTimeout(() => setSaveSuccess(''), 3500);
    } else {
      alert('Lỗi tải ảnh lên Supabase: ' + JSON.stringify(res.error));
    }
  };

  // Backup Snapshot to Supabase 'recovery' Bucket
  const handleCreateBackup = async () => {
    const res = await backupToRecoveryBucket();
    if (res.success) {
      setSaveSuccess(`Đã tạo file sao lưu backup "${res.fileName}" trong Bucket recovery trên Supabase thành công!`);
    } else {
      setSaveSuccess('Lỗi tạo backup: ' + JSON.stringify(res.error));
    }
    setTimeout(() => setSaveSuccess(''), 4500);
  };

  const handleSaveProfile = () => {
    updateProfile({
      avatarUrl: profAvatarUrl,
      badge: profBadge,
      titlePrefix: profTitlePrefix,
      name: profName,
      tagline: profTagline,
      subtext: profSubtext,
      bio: profBio,
      education: profEducation,
      degree: profDegree,
      gpa: profGpa,
    });
    updateContactInfo({ email: editEmail, github: editGithub, waterbase: editWaterbase });
    setSaveSuccess('Đã cập nhật toàn bộ Profile (Avatar, Badge, Bio, Education) lên Supabase!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveResearch = () => {
    updateResearch({
      abstractVi: editResVi,
      abstractEn: editResEn,
      memoryReduction: editMemRed,
      accuracyRetention: editAccRet,
    });
    setSaveSuccess('Đã lưu thông tin Luận văn & Nghiên cứu ARQ-RAG lên Supabase!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleAddResearchHighlight = () => {
    if (!newResTitle) return;
    const newItem: ResearchHighlightItem = {
      id: `res-${Date.now()}`,
      title: newResTitle,
      desc: newResDesc || newResTitle,
    };
    addResearchHighlight(newItem);
    setNewResTitle('');
    setNewResDesc('');
    setSaveSuccess('Đã thêm điểm nổi bật nghiên cứu mới!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveProject = (p: Project) => {
    updateProject(p.id, p);
    setSaveSuccess(`Đã lưu thay đổi cho dự án "${p.title}" lên Supabase & Website!`);
    setEditingProject(null);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleCreateNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newP: Project = {
      id: newId,
      title: 'New Project Title',
      subtitle: 'Project Subtitle / Catchphrase',
      type: 'Personal Project',
      role: 'Full-stack Developer',
      description: {
        en: 'Detailed project description in English...',
        vi: 'Mô tả chi tiết dự án bằng tiếng Việt...'
      },
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      features: {
        en: ['Feature 1: Real-time sync', 'Feature 2: Clean API design'],
        vi: ['Tính năng 1: Đồng bộ thời gian thực', 'Tính năng 2: Thiết kế API chuẩn']
      },
      metrics: {
        en: ['⚡ High performance & scalability'],
        vi: ['⚡ Hiệu năng cao và có khả năng mở rộng']
      },
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/neshaki091'
      },
      featured: true
    };
    addProject(newP);
    setEditingProject(newP);
  };

  const handleAddSkill = () => {
    if (!newSkillName) return;
    const next = [...editableSkills];
    next[selectedCatIdx].items.push({
      name: newSkillName,
      level: newSkillLevel || 'Proficient',
      description: {
        vi: newSkillDescVi || newSkillName,
        en: newSkillDescEn || newSkillName,
      },
    });
    setEditableSkills(next);
    updateSkills(next);
    setNewSkillName('');
    setNewSkillLevel('');
    setNewSkillDescVi('');
    setNewSkillDescEn('');
    setSaveSuccess('Đã thêm kỹ năng mới thành công!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleDeleteSkill = (catIdx: number, skillIdx: number) => {
    const next = [...editableSkills];
    next[catIdx].items.splice(skillIdx, 1);
    setEditableSkills(next);
    updateSkills(next);
    setSaveSuccess('Đã xóa kỹ năng thành công!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleLangChange = (lang: 'en' | 'vi') => {
    setJsonLang(lang);
    const currentBundle = i18n.getResourceBundle(lang, 'translation') || {};
    setJsonContent(JSON.stringify(currentBundle, null, 2));
    setJsonError('');
  };

  const handleSaveTranslations = async () => {
    try {
      const parsed = JSON.parse(jsonContent);
      setJsonError('');

      i18n.addResourceBundle(jsonLang, 'translation', parsed, true, true);

      if (isSupabaseConfigured) {
        await saveTranslationToSupabase(jsonLang, parsed);
        setSaveSuccess(`Đã lưu bản dịch ${jsonLang.toUpperCase()} lên Cloud Supabase CSDL!`);
      } else {
        setSaveSuccess(`Đã cập nhật bản dịch ${jsonLang.toUpperCase()} thành công!`);
      }

      setTimeout(() => setSaveSuccess(''), 3500);
    } catch (err: any) {
      setJsonError('Cú pháp JSON không hợp lệ: ' + err.message);
    }
  };

  const handleUpdateSecretOnSupabase = async () => {
    if (!newSecretPasscode) return;
    const res = await updateAdminSecretOnSupabase(newSecretPasscode);
    if (res.success) {
      setSecretChangeStatus('Đã cập nhật Secret Passcode mới lên Supabase CSDL thành công!');
      setNewSecretPasscode('');
    } else {
      setSecretChangeStatus('Lỗi khi lưu Secret lên Supabase: ' + JSON.stringify(res.error));
    }
    setTimeout(() => setSecretChangeStatus(''), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-[#F2E9E4] dark:bg-[#0D1117] overflow-y-auto flex flex-col font-sans text-[#22223B] dark:text-[#E6EDF3] transition-colors duration-300">
      
      {/* Full Screen Top Navigation Header */}
      <header className="px-6 py-4 border-b border-[#C9ADA7] dark:border-[#30363D] bg-[#FAF6F0] dark:bg-[#161B22] flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Quay Lại Trang Chủ Website
          </Button>

          <div className="hidden sm:flex items-center gap-2 font-mono font-bold text-base text-[#22223B] dark:text-[#E6EDF3]">
            <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-[#00D9FF]" />
            <span>Supabase Cloud CMS Admin Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSupabaseConfigured ? (
            <Badge variant="green" className="hidden md:inline-flex">
              Cloud Supabase Active
            </Badge>
          ) : (
            <Badge variant="orange" className="hidden md:inline-flex">
              Local Mode (No Supabase)
            </Badge>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#F2E9E4] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] hover:border-indigo-600 dark:hover:border-[#00D9FF]"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4A4E69]" />}
          </button>
        </div>
      </header>

      {/* Main Full Page Content Container */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-hidden">
        
        {!isAuthenticated ? (
          /* Full Page Login Screen */
          <div className="my-auto max-w-md w-full mx-auto p-8 rounded-2xl glass-card border border-[#C9ADA7] dark:border-[#30363D] text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-[#00D9FF]/10 text-indigo-600 dark:text-[#00D9FF] flex items-center justify-center mx-auto border border-indigo-300 dark:border-[#00D9FF]/30">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#22223B] dark:text-[#E6EDF3]">Đăng Nhập CMS Quản Trị</h2>
              <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1.5 leading-relaxed">
                Nhập Secret Passcode để quản lý toàn bộ Profile, Dự Án, Kỹ Năng và Luận Văn trên Cloud Supabase.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Secret Passcode (Mặc định: neshaki091)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#E6EDF3] text-center font-mono focus:outline-none focus:border-indigo-600 dark:focus:border-[#00D9FF]"
                />
                {authError && (
                  <p className="text-xs text-rose-500 font-mono mt-2">{authError}</p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full font-bold" disabled={isVerifying} icon={<Key className="w-5 h-5" />}>
                {isVerifying ? 'Đang xác thực với Supabase...' : 'Đăng Nhập Quản Trị Trực Tiếp'}
              </Button>
            </form>
          </div>
        ) : (
          /* Full Page Admin Dashboard Layout */
          <div className="flex-1 flex flex-col glass-card rounded-2xl border border-[#C9ADA7] dark:border-[#30363D] overflow-hidden shadow-2xl">
            
            {/* Notification Banner */}
            {saveSuccess && (
              <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-mono text-center font-bold animate-pulse">
                ✓ {saveSuccess}
              </div>
            )}

            {/* Admin Full-Width Tabs */}
            <div className="flex border-b border-[#C9ADA7] dark:border-[#30363D] bg-[#FAF6F0] dark:bg-[#161B22] px-6 gap-6 text-xs font-mono overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'profile'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <UserCheck className="w-4 h-4" /> 👤 Hồ Sơ Cá Nhân & Avatar
              </button>

              <button
                onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'projects'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <Edit3 className="w-4 h-4" /> 📝 Dự Án Trọng Điểm
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'skills'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <Cpu className="w-4 h-4" /> 🛠️ Kỹ Năng (Skills)
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'research'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <BookOpen className="w-4 h-4" /> 📚 Luận Văn & Nghiên Cứu
              </button>

              <button
                onClick={() => setActiveTab('i18n')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'i18n'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <Languages className="w-4 h-4" /> 🌐 Từ Điển Supabase (Key-Value)
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'messages'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <Mail className="w-4 h-4" /> 📩 Hộp Thư Mail ({messages.length})
              </button>

              <button
                onClick={() => setActiveTab('env')}
                className={`py-4 flex items-center gap-2 border-b-2 shrink-0 font-bold transition-colors ${
                  activeTab === 'env'
                    ? 'border-indigo-600 dark:border-[#00D9FF] text-indigo-600 dark:text-[#00D9FF]'
                    : 'border-transparent text-[#9A8C98] dark:text-[#8B949E] hover:text-[#22223B]'
                }`}
              >
                <Server className="w-4 h-4" /> ⚙️ Supabase Config
              </button>
            </div>

            {/* Full Screen Tab Contents */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* TAB 1: PROFILE CMS EDITOR & AVATAR BUCKET */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-600 dark:text-[#00D9FF]" />
                        Quản Lý Hồ Sơ Cá Nhân & Upload Avatar (Bucket `image` & `recovery`)
                      </h3>
                      <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1">
                        Tải ảnh chân dung lên Supabase Bucket `image`, cập nhật Badge, Họ tên, Tagline, Bio, GPA và sao lưu Backup vào Bucket `recovery`.
                      </p>
                    </div>

                    <Button variant="secondary" size="sm" onClick={handleCreateBackup} icon={<Archive className="w-4 h-4" />}>
                      Tạo Backup Trong Bucket Recovery
                    </Button>
                  </div>

                  <Card hoverEffect={false} className="p-6 space-y-6">
                    
                    {/* Avatar Upload Block */}
                    <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-600 dark:border-[#00D9FF] shrink-0">
                        <img src={profAvatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <h4 className="font-bold text-sm text-[#22223B] dark:text-[#E6EDF3] font-mono">
                          Ảnh Chân Dung (Avatar Image Bucket)
                        </h4>
                        <p className="text-xs text-[#9A8C98] dark:text-[#8B949E]">
                          Tải ảnh cá nhân của bạn lên Bucket <code className="text-indigo-600 dark:text-[#00D9FF]">image</code> trên Supabase Cloud:
                        </p>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 dark:bg-[#00D9FF] text-white dark:text-[#0D1117] text-xs font-mono font-bold hover:opacity-90 transition-opacity">
                            <Upload className="w-4 h-4" />
                            {uploadingAvatar ? 'Đang tải ảnh...' : 'Chọn Ảnh Chân Dung Để Upload'}
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarFileChange} disabled={uploadingAvatar} />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Danh Xưng Professional Badge</label>
                        <input
                          type="text"
                          value={profBadge}
                          onChange={(e) => setProfBadge(e.target.value)}
                          placeholder="VD: Backend & AI Software Engineer"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Họ và Tên (Full Name)</label>
                        <input
                          type="text"
                          value={profName}
                          onChange={(e) => setProfName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Tiền Đề Lời Chào (Title Prefix)</label>
                        <input
                          type="text"
                          value={profTitlePrefix}
                          onChange={(e) => setProfTitlePrefix(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Slogan Tiêu Đề Chính (Tagline)</label>
                      <input
                        type="text"
                        value={profTagline}
                        onChange={(e) => setProfTagline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#E6EDF3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Đoạn Mô Tả Dưới Hero (Subtext)</label>
                      <textarea
                        rows={2}
                        value={profSubtext}
                        onChange={(e) => setProfSubtext(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-xs text-[#22223B] dark:text-[#E6EDF3]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Trường Đại Học (Education)</label>
                        <input
                          type="text"
                          value={profEducation}
                          onChange={(e) => setProfEducation(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Bằng Cấp (Degree)</label>
                        <input
                          type="text"
                          value={profDegree}
                          onChange={(e) => setProfDegree(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Điểm GPA Academic</label>
                        <input
                          type="text"
                          value={profGpa}
                          onChange={(e) => setProfGpa(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Đoạn Giới Thiệu Bản Thân Giàu Kinh Nghiệm (Bio)</label>
                      <textarea
                        rows={4}
                        value={profBio}
                        onChange={(e) => setProfBio(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-xs text-[#22223B] dark:text-[#E6EDF3] leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Trực Tiếp
                        </label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase flex items-center gap-1">
                          <Link className="w-3.5 h-3.5 text-indigo-600" /> Link GitHub Profile
                        </label>
                        <input
                          type="text"
                          value={editGithub}
                          onChange={(e) => setEditGithub(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase flex items-center gap-1">
                          <Link className="w-3.5 h-3.5 text-indigo-600" /> Link Waterbase BaaS
                        </label>
                        <input
                          type="text"
                          value={editWaterbase}
                          onChange={(e) => setEditWaterbase(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-[#C9ADA7]/40 dark:border-[#30363D]/40">
                      <Button variant="primary" size="lg" onClick={handleSaveProfile} icon={<Save className="w-5 h-5" />}>
                        Lưu Toàn Bộ Profile & Avatar Lên Supabase CSDL
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* TAB 2: PROJECTS EDITOR */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono">
                      Quản Lý Các Dự Án ({projects.length})
                    </h3>
                    <Button variant="primary" size="md" onClick={handleCreateNewProject} icon={<Plus className="w-4 h-4" />}>
                      Thêm Dự Án Mới
                    </Button>
                  </div>

                  {editingProject ? (
                    <Card hoverEffect={false} className="p-8 space-y-6 border-indigo-600 dark:border-[#00D9FF]">
                      <div className="flex items-center justify-between border-b border-[#C9ADA7] dark:border-[#30363D] pb-4">
                        <h4 className="font-bold text-base text-[#22223B] dark:text-[#E6EDF3]">
                          Chỉnh Sửa Dự Án: <span className="text-indigo-600 dark:text-[#00D9FF]">{editingProject.title}</span>
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>Hủy bỏ</Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-mono">
                        <div>
                          <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold">Tên Dự Án (Title)</label>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold">Tiêu Đề Phụ (Subtitle)</label>
                          <input
                            type="text"
                            value={editingProject.subtitle}
                            onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold">Loại Dự Án (Type)</label>
                          <input
                            type="text"
                            value={editingProject.type}
                            onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold">Vai Trò (Role)</label>
                          <input
                            type="text"
                            value={editingProject.role}
                            onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Mô Tả Tiếng Việt</label>
                        <textarea
                          rows={3}
                          value={editingProject.description.vi}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            description: { ...editingProject.description, vi: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Technologies (Phân cách bằng dấu phẩy)</label>
                        <input
                          type="text"
                          value={editingProject.technologies.join(', ')}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map((s) => s.trim())
                          })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-sm text-[#22223B] dark:text-[#E6EDF3] font-mono"
                        />
                      </div>

                      <div className="flex justify-end gap-4 pt-4 border-t border-[#C9ADA7]/40 dark:border-[#30363D]/40">
                        <Button variant="ghost" size="md" onClick={() => setEditingProject(null)}>Hủy bỏ</Button>
                        <Button variant="primary" size="md" onClick={() => handleSaveProject(editingProject)} icon={<Save className="w-5 h-5" />}>
                          Lưu Dự Án Lên Supabase & Website
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className="p-6 rounded-2xl bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <Badge variant="cyan">{p.type}</Badge>
                              <span className="text-xs font-mono text-[#9A8C98] dark:text-[#8B949E]">{p.role}</span>
                            </div>
                            <h4 className="font-bold text-base text-[#22223B] dark:text-[#E6EDF3]">{p.title}</h4>
                            <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] line-clamp-3 leading-relaxed">{p.description.vi}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#C9ADA7]/40 dark:border-[#30363D]/40">
                            <Button variant="outline" size="sm" onClick={() => setEditingProject(p)} icon={<Edit3 className="w-4 h-4" />}>
                              Sửa Dự Án Trực Tiếp
                            </Button>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title="Xóa dự án này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TECHNICAL SKILLS CMS EDITOR */}
              {activeTab === 'skills' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-600 dark:text-[#00D9FF]" />
                        Trình Quản Lý Kỹ Năng Chuyên Môn (Technical Skills CMS)
                      </h3>
                      <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1">
                        Chỉnh sửa danh sách ngôn ngữ lập trình, frameworks, vector DBs và công cụ DevOps hiển thị ở mục Skills.
                      </p>
                    </div>
                  </div>

                  <Card hoverEffect={false} className="p-6 space-y-4 border-indigo-600/40 dark:border-[#00D9FF]/40">
                    <h4 className="font-bold text-sm text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                      <Plus className="w-4 h-4 text-indigo-600 dark:text-[#00D9FF]" />
                      Thêm Kỹ Năng / Công Nghệ Mới
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Danh Mục Skills</label>
                        <select
                          value={selectedCatIdx}
                          onChange={(e) => setSelectedCatIdx(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        >
                          {editableSkills.map((c, idx) => (
                            <option key={c.category} value={idx}>
                              {c.title.vi}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Tên Kỹ Năng (VD: Rust, Go, PyTorch)</label>
                        <input
                          type="text"
                          placeholder="Tên công nghệ..."
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Nhãn Trình Độ (VD: Advanced, Core)</label>
                        <input
                          type="text"
                          placeholder="Advanced / Core / Proficient..."
                          value={newSkillLevel}
                          onChange={(e) => setNewSkillLevel(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Chi Tiết Ứng Dụng (Tiếng Việt)</label>
                        <input
                          type="text"
                          placeholder="Nội dung chuyên môn ứng dụng..."
                          value={newSkillDescVi}
                          onChange={(e) => setNewSkillDescVi(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Application Details (English)</label>
                        <input
                          type="text"
                          placeholder="Detailed proficiency details..."
                          value={newSkillDescEn}
                          onChange={(e) => setNewSkillDescEn(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button variant="primary" size="sm" onClick={handleAddSkill} icon={<Plus className="w-4 h-4" />}>
                        Thêm Kỹ Năng Này
                      </Button>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editableSkills.map((cat, catIdx) => (
                      <div
                        key={cat.category}
                        className="p-6 rounded-2xl bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-3">
                          <h4 className="font-bold text-sm text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                            <Code className="w-4 h-4 text-indigo-600 dark:text-[#00D9FF]" />
                            {cat.title.vi}
                          </h4>
                          <Badge variant="cyan">{cat.items.length} Techs</Badge>
                        </div>

                        <div className="space-y-3">
                          {cat.items.map((item, itemIdx) => (
                            <div
                              key={item.name}
                              className="p-3 rounded-lg bg-[#F2E9E4] dark:bg-[#0D1117] border border-[#C9ADA7]/60 dark:border-[#30363D]/60 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold font-mono text-[#22223B] dark:text-[#E6EDF3]">{item.name}</span>
                                  {item.level && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-[#00D9FF]/10 text-indigo-700 dark:text-[#00D9FF]">
                                      {item.level}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-[11px] text-[#9A8C98] dark:text-[#8B949E] truncate">
                                    {item.description.vi}
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => handleDeleteSkill(catIdx, itemIdx)}
                                className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 shrink-0"
                                title="Xóa kỹ năng này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 4: RESEARCH & THESIS CMS EDITOR */}
              {activeTab === 'research' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-[#00D9FF]" />
                        Trình Quản Lý Luận Văn Nghiên Cứu ARQ-RAG
                      </h3>
                      <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1">
                        Chỉnh sửa bài tóm tắt (Abstract), chỉ số hiệu năng và thêm bớt các điểm kỹ thuật nổi bật của nghiên cứu.
                      </p>
                    </div>
                  </div>

                  <Card hoverEffect={false} className="p-6 space-y-4 border-indigo-600/40 dark:border-[#00D9FF]/40">
                    <h4 className="font-bold text-sm text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                      <Plus className="w-4 h-4 text-indigo-600 dark:text-[#00D9FF]" />
                      Thêm Đề Tài / Điểm Nổi Bật Nghiên Cứu Mới
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Tiêu Đề Đề Tài / Thuật Toán (Title)</label>
                        <input
                          type="text"
                          placeholder="VD: SIMD AVX2 Quantization Engine..."
                          value={newResTitle}
                          onChange={(e) => setNewResTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1 font-bold">Mô Tả Kỹ Thuật (Description)</label>
                        <input
                          type="text"
                          placeholder="VD: Custom Rust SIMD intrinsics optimization..."
                          value={newResDesc}
                          onChange={(e) => setNewResDesc(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button variant="primary" size="sm" onClick={handleAddResearchHighlight} icon={<Plus className="w-4 h-4" />}>
                        Thêm Đề Tài Nghiên Cứu Mới
                      </Button>
                    </div>
                  </Card>

                  <Card hoverEffect={false} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Chỉ Số Nén Bộ Nhớ (Memory Reduction)</label>
                        <input
                          type="text"
                          value={editMemRed}
                          onChange={(e) => setEditMemRed(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Độ Chính Xác Giữ Lại (Accuracy Retention)</label>
                        <input
                          type="text"
                          value={editAccRet}
                          onChange={(e) => setEditAccRet(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3] font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Tóm Tắt Nghiên Cứu (Abstract - Tiếng Việt)</label>
                      <textarea
                        rows={4}
                        value={editResVi}
                        onChange={(e) => setEditResVi(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-xs text-[#22223B] dark:text-[#E6EDF3] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9A8C98] dark:text-[#8B949E] mb-1.5 font-bold uppercase">Research Abstract (English)</label>
                      <textarea
                        rows={4}
                        value={editResEn}
                        onChange={(e) => setEditResEn(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-xs text-[#22223B] dark:text-[#E6EDF3] leading-relaxed"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button variant="primary" size="md" onClick={handleSaveResearch} icon={<Save className="w-4 h-4" />}>
                        Lưu Thông Tin Nghiên Cứu Lên Supabase
                      </Button>
                    </div>
                  </Card>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono">
                      Danh Sách Các Điểm Nổi Bật Nghiên Cứu ({research.highlights?.length || 0})
                    </h4>

                    <div className="space-y-3">
                      {(research.highlights || []).map((h) => (
                        <div
                          key={h.id}
                          className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] flex items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1">
                            <h5 className="font-bold font-mono text-[#22223B] dark:text-[#E6EDF3]">{h.title}</h5>
                            <p className="text-[#9A8C98] dark:text-[#8B949E]">{h.desc}</p>
                          </div>
                          <button
                            onClick={() => deleteResearchHighlight(h.id)}
                            className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 shrink-0"
                            title="Xóa điểm nghiên cứu này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: FULL PAGE I18N TRANSLATION JSON EDITOR */}
              {activeTab === 'i18n' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-600 dark:text-[#00D9FF]" />
                        Trình Chỉnh Sửa Từ Điển Key-Value Supabase Cloud ({jsonLang.toUpperCase()})
                      </h3>
                      <p className="text-xs text-[#9A8C98] dark:text-[#8B949E] mt-1">
                        Sửa toàn bộ các từ khóa hiển thị trên giao diện. Khi lưu, dữ liệu được đẩy thẳng lên Cloud Supabase!
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#FAF6F0] dark:bg-[#161B22] p-1.5 rounded-xl border border-[#C9ADA7] dark:border-[#30363D] shrink-0">
                      <button
                        onClick={() => handleLangChange('en')}
                        className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors ${
                          jsonLang === 'en' ? 'bg-indigo-600 dark:bg-[#00D9FF] text-white dark:text-[#0D1117]' : 'text-[#9A8C98]'
                        }`}
                      >
                        English (Primary Key-Value)
                      </button>
                    </div>
                  </div>

                  {jsonError && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
                      ⚠ {jsonError}
                    </div>
                  )}

                  <textarea
                    rows={20}
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    className="w-full p-5 rounded-2xl bg-[#22223B] text-[#F2E9E4] dark:bg-[#0D1117] dark:text-[#E6EDF3] text-xs font-mono leading-relaxed border border-[#C9ADA7] dark:border-[#30363D] focus:outline-none focus:border-indigo-600 dark:focus:border-[#00D9FF] resize-none shadow-inner"
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="primary" size="lg" onClick={handleSaveTranslations} icon={<Save className="w-5 h-5" />}>
                      Lưu Từ Điển Lên Cloud Supabase
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 6: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 dark:border-[#30363D]/40 pb-4">
                    <h3 className="text-base font-bold text-[#22223B] dark:text-[#E6EDF3] font-mono">
                      Hộp Thư Nhận Tin Nhắn Từ Nhà Tuyển Dụng
                    </h3>
                    <Button variant="secondary" size="sm" onClick={fetchMessages}>Làm mới inbox</Button>
                  </div>

                  {messages.length === 0 ? (
                    <Card hoverEffect={false} className="text-center py-16 text-xs text-[#9A8C98] dark:text-[#8B949E]">
                      Hệ thống liên hệ hiện tại kích hoạt gửi email trực tiếp tới {contactInfo.email} qua nút mailto:.
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl bg-[#FAF6F0] dark:bg-[#161B22] border border-[#C9ADA7] dark:border-[#30363D] text-xs space-y-2">
                          <div className="flex justify-between border-b border-[#C9ADA7]/40 pb-2">
                            <span className="font-bold text-[#22223B] dark:text-[#E6EDF3] text-sm">{msg.name}</span>
                            <span className="font-mono text-[#9A8C98]">{new Date(msg.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-indigo-600 dark:text-[#00D9FF] font-mono font-bold">Email: {msg.email}</p>
                          <p className="mt-2 text-[#4A4E69] dark:text-[#C9D1D9] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: SUPABASE & SECRET CONFIG */}
              {activeTab === 'env' && (
                <div className="space-y-6 text-xs font-mono">
                  <Card hoverEffect={false} className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Database className="w-6 h-6 text-indigo-600 dark:text-[#00D9FF]" />
                      <span className="font-bold text-base text-[#22223B] dark:text-[#E6EDF3]">Trạng Thái Cấu Hình Supabase Cloud</span>
                    </div>

                    <p className="text-[#9A8C98] dark:text-[#8B949E] text-sm">
                      Khóa Anon Key & URL dự án Supabase đã được kết nối sẵn trong file .env!
                    </p>

                    <pre className="p-4 rounded-xl bg-[#22223B] text-[#F2E9E4] dark:bg-[#0D1117] text-xs overflow-x-auto leading-relaxed border border-[#C9ADA7] dark:border-[#30363D]">
{`VITE_SUPABASE_URL=https://gxgtmbwjzikslteltwdp.supabase.co
VITE_ADMIN_SECRET=neshaki091`}
                    </pre>
                  </Card>

                  {/* Secret Passcode Manager Card */}
                  <Card hoverEffect={false} className="p-6 space-y-4 border-indigo-600/40 dark:border-[#00D9FF]/40">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-6 h-6 text-indigo-600 dark:text-[#00D9FF]" />
                      <span className="font-bold text-base text-[#22223B] dark:text-[#E6EDF3]">Đổi Secret Passcode Trên Supabase DB</span>
                    </div>

                    <p className="text-[#9A8C98] dark:text-[#8B949E] text-sm">
                      Nhập mật khẩu Secret mới và bấm lưu để cập nhật trực tiếp vào bảng <code className="text-indigo-600 dark:text-[#00D9FF]">admin_settings</code> trên Supabase:
                    </p>

                    <div className="flex items-center gap-4 max-w-lg">
                      <input
                        type="password"
                        placeholder="Mật khẩu Secret Passcode mới..."
                        value={newSecretPasscode}
                        onChange={(e) => setNewSecretPasscode(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-[#FAF6F0] dark:bg-[#0D1117] border border-[#C9ADA7] dark:border-[#30363D] text-[#22223B] dark:text-[#E6EDF3]"
                      />
                      <Button variant="primary" size="md" onClick={handleUpdateSecretOnSupabase} icon={<Save className="w-4 h-4" />}>
                        Cập Nhật Mật Khẩu Supabase
                      </Button>
                    </div>

                    {secretChangeStatus && (
                      <p className="text-xs font-bold text-emerald-600 dark:text-[#3FB950] pt-1">
                        ✓ {secretChangeStatus}
                      </p>
                    )}
                  </Card>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
