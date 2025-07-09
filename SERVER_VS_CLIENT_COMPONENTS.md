# Server Component vs Client Component - 最小構成ガイド

Next.js 14 (App Router) における Server Component と Client Component の最小構成とデータ取得パターンを解説します。

## 📋 基本ルール

| コンポーネント | データ取得方法 | 実行場所 | 特徴 |
|---------------|---------------|----------|------|
| **Server Component** | 直接Prismaアクセス | サーバー | `async function`, `"use client"`なし |
| **Client Component** | API経由でfetch | ブラウザ | `"use client"`必須, React Hooks使用 |

---

## 🖥️ Server Component - 最小構成

### 基本パターン

```typescript
// src/app/courses/page.tsx
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  // 直接Prismaでデータ取得
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>コース一覧</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 認証付きパターン

```typescript
// src/app/account/page.tsx
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const supabase = await createClient();
  
  // 認証チェック
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return <div>ログインが必要です</div>;
  }

  // 認証後のデータ取得
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ユーザー: {dbUser?.name}</p>
      <p>役割: {dbUser?.role}</p>
    </div>
  );
}
```

### エラーハンドリング付きパターン

```typescript
// src/app/courses/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function CoursePage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  if (!course) {
    notFound(); // 404ページに遷移
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>価格: ¥{course.price}</p>
    </div>
  );
}
```

---

## 🌐 Client Component - 最小構成

### 基本パターン

```typescript
// src/components/course-list.tsx
"use client";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>コース一覧</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>価格: ¥{course.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### インタラクション付きパターン

```typescript
// src/components/course-form.tsx
"use client";
import { useState } from "react";

export default function CourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        alert('コースが作成されました');
      }
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>コース作成</h1>
      <input
        type="text"
        placeholder="コース名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? '作成中...' : 'コースを作成'}
      </button>
    </form>
  );
}
```

### エラーハンドリング付きパターン

```typescript
// src/components/course-list-with-error.tsx
"use client";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
}

export default function CourseListWithError() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError(null);
        const response = await fetch('/api/courses');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1>コース一覧</h1>
      {courses.length === 0 ? (
        <p>コースがありません</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

---

## 🔧 対応するAPI Route

Client Componentで使用するAPI Routeの最小構成：

```typescript
// src/app/api/courses/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

// GET - データ取得
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - データ作成
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 認証チェック
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, description } = await request.json();
    
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: 0,
        instructorId: user.id,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

---

## 📊 比較表

| 項目 | Server Component | Client Component |
|------|------------------|------------------|
| **宣言** | `export default async function` | `"use client"` + `export default function` |
| **データ取得** | `await prisma.course.findMany()` | `fetch('/api/courses')` |
| **React Hooks** | ❌ 使用不可 | ✅ 使用可能 |
| **イベントハンドラー** | ❌ 使用不可 | ✅ 使用可能 |
| **状態管理** | ❌ 使用不可 | ✅ useState, useEffect等 |
| **実行場所** | サーバー | ブラウザ |
| **SEO** | ✅ 最適 | ⚠️ 制限あり |
| **初期読み込み** | ✅ 高速 | ⚠️ 遅い |
| **インタラクション** | ❌ 制限あり | ✅ 豊富 |

---

## 🎯 使い分けの指針

### Server Component を使う場合
- ✅ データ表示がメイン
- ✅ SEOが重要
- ✅ 初期読み込み速度を重視
- ✅ 認証チェック + データ取得

### Client Component を使う場合
- ✅ ユーザーインタラクションが必要
- ✅ フォーム入力・送信
- ✅ 動的な状態変更
- ✅ リアルタイム更新

---

## 📝 まとめ

### Server Component の最小構成
```typescript
import { prisma } from "@/lib/prisma";

export default async function MyPage() {
  const data = await prisma.model.findMany();
  return <div>{/* render data */}</div>;
}
```

### Client Component の最小構成
```typescript
"use client";
import { useState, useEffect } from "react";

export default function MyComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{/* render data */}</div>;
}
```

**重要**: Server Componentは直接Prisma、Client ComponentはAPI経由。この原則を守ることで、Next.js 14の恩恵を最大限に活用できます。