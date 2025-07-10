"use client";
import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function SigninOutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <form
      action="/auth/signout"
      method="post"
      onSubmit={() => setLoading(true)}
    >
      <button
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex justify-center"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "サインアウト"}
      </button>
    </form>
  );
}
