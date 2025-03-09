import { Sidebar } from "@/components/layout/sidebar";
import { BudgetChart } from "@/components/dashboard/budget-chart";
import { Chatbot } from "@/components/dashboard/chatbot";
import { NewsFeed } from "@/components/dashboard/news-feed";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Budget Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to Mizaniyatona: Open Budget Lab
            </p>
          </div>

          <div className="col-span-2 h-[400px]">
            <BudgetChart />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Latest Updates</h2>
            <NewsFeed />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Budget Assistant</h2>
            <Chatbot />
          </div>
        </div>
      </main>
    </div>
  );
}
