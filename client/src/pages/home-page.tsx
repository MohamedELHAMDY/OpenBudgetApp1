import { Sidebar } from "@/components/layout/sidebar";
import { BudgetChart } from "@/components/dashboard/budget-chart";
import { AdvancedCharts } from "@/components/dashboard/advanced-charts";
import { Chatbot } from "@/components/dashboard/chatbot";
import { NewsFeed } from "@/components/dashboard/news-feed";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="grid gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
              alt="Drapeau du Maroc"
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Tableau de Bord Budgétaire
              </h1>
              <p className="text-muted-foreground">
                Bienvenue sur Mizaniyatona: Laboratoire du Budget Ouvert
              </p>
            </div>
          </div>

          <div className="h-[400px]">
            <BudgetChart />
          </div>

          <AdvancedCharts />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Dernières Mises à Jour</h2>
              <NewsFeed />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Assistant Budgétaire</h2>
              <Chatbot />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}