"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";
import Link from "next/link";
import { Course } from "@prisma/client";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 削除処理
  const deleteCourse = async (id: string) => {
    const res = await fetch(`/api/courses/course/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Ok");
    }
  };
  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">コース一覧</h2>
      {courses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600">
                価格:{" "}
                <span className="font-bold">
                  ¥{course.price.toLocaleString()}
                </span>
              </p>
              <Button asChild>
                <Link href={`/courses/${course.id}/edit`}>編集する</Link>
              </Button>
              <Button
                onClick={() => deleteCourse(course.id)}
                variant={"secondary"}
              >
                削除する
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">コースが見つかりません</p>
      )}
    </div>
  );
}
