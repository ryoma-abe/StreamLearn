'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoUpload from '@/components/course/video-upload';
import { Button } from '@/components/ui/button';

interface CourseFormProps {
  instructorId: string;
}

export default function CourseForm({ instructorId }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    videoUrl: ''
  });

  const handleVideoUpload = (videoUrl: string) => {
    setFormData(prev => ({ ...prev, videoUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          instructorId
        })
      });

      if (!response.ok) throw new Error('Failed to create course');

      const { id } = await response.json();
      router.push(`/courses/${id}`);
    } catch (error) {
      console.error('Error creating course:', error);
      alert('コースの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          コースタイトル
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          説明
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          価格（円）
        </label>
        <input
          type="number"
          required
          min="0"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          動画
        </label>
        <VideoUpload 
          courseId="temp" // 実際にはコース作成後にアップロードするか、一時IDを使用
          onUploadComplete={handleVideoUpload}
        />
        {formData.videoUrl && (
          <p className="mt-2 text-sm text-green-600">
            動画がアップロードされました
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={loading || !formData.videoUrl}
        className="w-full"
      >
        {loading ? '作成中...' : 'コースを作成'}
      </Button>
    </form>
  );
}