import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaTwitter } from "react-icons/fa";

// Simulated social media posts for demonstration
const socialPosts = [
  {
    id: 1,
    platform: "twitter",
    author: "@MinistereFinances",
    content: "Découvrez les dernières mises à jour du budget national 2024 sur Mizaniyatona #TransparenceBudgétaire #Maroc",
    date: new Date(2024, 2, 10),
    verified: true,
  },
  {
    id: 2,
    platform: "twitter",
    author: "@OpenBudgetMaroc",
    content: "Nouveau rapport sur la transparence budgétaire au Maroc. Consultez l'analyse complète sur notre plateforme.",
    date: new Date(2024, 2, 8),
    verified: true,
  },
  {
    id: 3,
    platform: "twitter",
    author: "@EconomieMaroc",
    content: "Participation citoyenne : votre avis compte dans l'élaboration du budget 2025 #DémocratieBudgétaire",
    date: new Date(2024, 2, 5),
    verified: true,
  },
];

export function SocialFeed() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaTwitter className="h-5 w-5" />
          Actualités Budgétaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {socialPosts.map((post) => (
              <div key={post.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold">{post.author}</p>
                  <span className="text-xs text-muted-foreground">
                    {post.date.toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm">{post.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}