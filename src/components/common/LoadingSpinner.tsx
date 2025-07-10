import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
