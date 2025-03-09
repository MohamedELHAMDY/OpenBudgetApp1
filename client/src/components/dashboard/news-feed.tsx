import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ForumPost } from "@shared/schema";

export function NewsFeed() {
  const { data: posts, isLoading } = useQuery<ForumPost[]>({
    queryKey: ["/api/forum"],
  });

  if (isLoading) {
    return (
      <Card className="w-full h-[500px] animate-pulse bg-muted" />
    );
  }

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Latest Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {posts?.map((post) => (
            <div key={post.id} className="mb-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {post.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
