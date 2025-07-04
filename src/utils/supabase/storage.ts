import { createClient } from '@/utils/supabase/client';

export async function uploadVideo(file: File, courseId: string) {
  const supabase = createClient();
  
  // ファイル名を生成（タイムスタンプ付き）
  const fileName = `${courseId}/${Date.now()}-${file.name}`;
  
  // Supabase Storageにアップロード
  const { data, error } = await supabase.storage
    .from('course-videos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  // 公開URLを取得
  const { data: { publicUrl } } = supabase.storage
    .from('course-videos')
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteVideo(videoPath: string) {
  const supabase = createClient();
  
  const { error } = await supabase.storage
    .from('course-videos')
    .remove([videoPath]);

  if (error) {
    console.error('Delete error:', error);
    throw error;
  }
}