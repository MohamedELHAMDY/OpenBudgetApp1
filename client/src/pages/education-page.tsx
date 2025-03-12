import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { BudgetTerm } from "@shared/schema";
import { Search } from "lucide-react";

// Sample budget terms (will be replaced with API data)
const sampleTerms: BudgetTerm[] = [
  {
    id: 1,
    term: "Budget Général",
    definition: "Le document financier qui présente l'ensemble des recettes et des dépenses de l'État pour une année.",
    category: "Concepts de Base"
  },
  {
    id: 2,
    term: "Loi de Finances",
    definition: "Le texte législatif qui prévoit et autorise l'ensemble des ressources et des charges de l'État.",
    category: "Législation"
  },
  {
    id: 3,
    term: "Dépenses d'Investissement",
    definition: "Les dépenses destinées à accroître le patrimoine de l'État et à améliorer les équipements publics.",
    category: "Dépenses"
  }
];

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // This will be replaced with actual API call
  const { data: terms = sampleTerms } = useQuery<BudgetTerm[]>({
    queryKey: ["/api/budget-terms"],
  });

  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="grid gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Éducation Budgétaire
            </h1>
            <p className="text-muted-foreground">
              Comprendre le budget national et ses concepts clés
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Glossaire Budgétaire</CardTitle>
                <CardDescription>
                  Explorez les termes et concepts essentiels du budget national
                </CardDescription>
                <div className="relative mt-4">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un terme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredTerms.map((term) => (
                      <div key={term.id} className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold text-lg">{term.term}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {term.definition}
                        </p>
                        <span className="text-xs text-primary mt-2 inline-block">
                          {term.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guide du Budget National</CardTitle>
                  <CardDescription>
                    Comprendre le processus budgétaire du Maroc
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert">
                    <h3>Le Cycle Budgétaire</h3>
                    <p>
                      Le cycle budgétaire au Maroc comprend quatre phases principales :
                      la préparation, l'approbation, l'exécution et le contrôle.
                    </p>
                    
                    <h3>La Loi de Finances</h3>
                    <p>
                      Document fondamental qui définit les ressources et les charges
                      de l'État pour une année fiscale.
                    </p>

                    <h3>La Participation Citoyenne</h3>
                    <p>
                      Les citoyens peuvent participer au processus budgétaire à travers
                      des consultations publiques et des plateformes de dialogue.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ressources Éducatives</CardTitle>
                  <CardDescription>
                    Documents et guides pour approfondir vos connaissances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">📄</span>
                      Guide de lecture du budget
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">📊</span>
                      Comprendre les graphiques budgétaires
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">📚</span>
                      Lexique des termes financiers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
