import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ForumPost } from "@shared/schema";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export function NewsFeed() {
  const { data: posts, isLoading } = useQuery<ForumPost[]>({
    queryKey: ["/api/forum"],
  });

  const shareOnTwitter = (post: ForumPost) => {
    const text = encodeURIComponent(`${post.title}\n\nVia Mizaniyatona - Budget Transparency Platform`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnFacebook = (post: ForumPost) => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[500px] animate-pulse bg-muted" />
    );
  }

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Espace de Participation Citoyenne</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="mb-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnTwitter(post)}
                      className="flex items-center gap-2"
                    >
                      <FaTwitter className="h-4 w-4" />
                      Partager
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareOnFacebook(post)}
                      className="flex items-center gap-2"
                    >
                      <FaFacebook className="h-4 w-4" />
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}