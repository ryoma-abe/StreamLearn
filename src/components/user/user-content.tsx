"use client";

import { Course } from "@prisma/client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function UserContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/user/");
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

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      {courses.length === 0 ? (
        <p>まだコースがありません</p>
      ) : (
        <ul>
          {courses.map((course: Course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
