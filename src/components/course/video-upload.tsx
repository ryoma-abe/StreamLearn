'use client';

import { useState } from 'react';
import { uploadVideo } from '@/utils/supabase/storage';
import { Button } from '@/components/ui/button';

interface VideoUploadProps {
  courseId: string;
  onUploadComplete: (videoUrl: string) => void;
}

export default function VideoUpload({ courseId, onUploadComplete }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック（例: 500MB）
    if (file.size > 500 * 1024 * 1024) {
      alert('ファイルサイズは500MB以下にしてください');
      return;
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('video/')) {
      alert('動画ファイルを選択してください');
      return;
    }

    setUploading(true);
    try {
      const publicUrl = await uploadVideo(file, courseId);
      onUploadComplete(publicUrl);
      alert('動画のアップロードが完了しました');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('アップロードに失敗しました');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <Button 
            as="span" 
            disabled={uploading}
            className="cursor-pointer"
          >
            {uploading ? 'アップロード中...' : '動画を選択'}
          </Button>
        </label>
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <p className="text-sm text-gray-500">
        対応フォーマット: MP4, WebM, MOV（最大500MB）
      </p>
    </div>
  );
}