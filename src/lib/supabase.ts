import { createClient } from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your_anon_key_here'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to save contact message
export async function sendContactMessage(name: string, email: string, message: string) {
  if (!supabase) {
    console.log('[Mock DB] Saved contact message:', { name, email, message });
    return { success: true };
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message, created_at: new Date().toISOString() }]);

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

// Fetch translation bundle from Supabase
export async function fetchTranslationFromSupabase(lang: 'en' | 'vi') {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('translations')
      .select('content')
      .eq('lang', lang)
      .single();

    if (error || !data) return null;
    return data.content;
  } catch (e) {
    console.error(`Failed to fetch ${lang} translation from Supabase:`, e);
    return null;
  }
}

// Save translation bundle to Supabase
export async function saveTranslationToSupabase(lang: 'en' | 'vi', content: object) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('translations')
      .upsert({ lang, content, updated_at: new Date().toISOString() });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e };
  }
}

// Generic Supabase Data Fetcher for Table Content
export async function fetchTableContentFromSupabase<T>(table: string): Promise<T[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from(table).select('*');
    if (error || !data) return null;
    return data as T[];
  } catch (e) {
    console.error(`Error fetching table ${table} from Supabase:`, e);
    return null;
  }
}

// Save / Upsert Content Record on Supabase
export async function saveContentToSupabase(table: string, record: object) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  try {
    const { data, error } = await supabase.from(table).upsert(record);
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e };
  }
}

// Delete Content Record on Supabase
export async function deleteContentFromSupabase(table: string, idKey: string, idValue: string) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  try {
    const { error } = await supabase.from(table).delete().eq(idKey, idValue);
    if (error) return { success: false, error };
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
}

// Upload Avatar Image to Supabase 'image' Bucket
export async function uploadAvatarToImageBucket(file: File): Promise<{ success: boolean; url?: string; error?: any }> {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const fileName = `avatar_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('image').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) return { success: false, error };

    const { data: publicUrlData } = supabase.storage.from('image').getPublicUrl(fileName);
    return { success: true, url: publicUrlData.publicUrl };
  } catch (e) {
    return { success: false, error: e };
  }
}

// Create Backup Snapshot File in Supabase 'recovery' Bucket
export async function createBackupInRecoveryBucket(backupState: object): Promise<{ success: boolean; fileName?: string; error?: any }> {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup_portfolio_${timestamp}.json`;
    const jsonString = JSON.stringify(backupState, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const { error } = await supabase.storage.from('recovery').upload(fileName, blob, {
      contentType: 'application/json',
      upsert: true,
    });

    if (error) return { success: false, error };
    return { success: true, fileName };
  } catch (e) {
    return { success: false, error: e };
  }
}

// Verify Admin Secret Passcode against Supabase admin_settings table
export async function verifyAdminSecretFromSupabase(inputPasscode: string): Promise<boolean> {
  const envSecret = import.meta.env.VITE_ADMIN_SECRET || 'neshaki091';

  if (!supabase) {
    return inputPasscode === envSecret;
  }

  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'admin_secret')
      .single();

    if (error || !data) {
      return inputPasscode === envSecret;
    }

    return inputPasscode === data.value || inputPasscode === envSecret;
  } catch (e) {
    return inputPasscode === envSecret;
  }
}

// Update Admin Secret Passcode on Supabase DB
export async function updateAdminSecretOnSupabase(newPasscode: string) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .upsert({ key: 'admin_secret', value: newPasscode });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e };
  }
}
