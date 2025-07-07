import { Button } from "./ui/button";

export default function InstructorContent() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>教材管理</h3>
          <Button>教材投稿する</Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">教材一覧</h4>
          <p className="text-muted-foreground text-sm">
            まだ教材を投稿していません
          </p>
        </div>
      </div>
    </div>
  );
}
