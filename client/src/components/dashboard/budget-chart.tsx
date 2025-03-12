import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { BudgetItem } from "@shared/schema";

export function BudgetChart() {
  const { data: budgetItems, isLoading } = useQuery<BudgetItem[]>({
    queryKey: ["/api/budget"],
  });

  if (isLoading) {
    return <Card className="w-full h-[500px] animate-pulse bg-muted" />;
  }

  // Format amount to show MAD currency
  const formattedData = budgetItems?.map(item => ({
    ...item,
    formattedAmount: `${(item.amount / 1000000).toFixed(2)} M MAD`
  }));

  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle>Allocation Budgétaire par Secteur</CardTitle>
        <CardDescription>
          Répartition du budget national par secteur d'activité pour l'année 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            >
              <Label value="Secteurs" position="bottom" offset={20} />
            </XAxis>
            <YAxis>
              <Label 
                value="Budget (Millions MAD)" 
                angle={-90} 
                position="insideLeft"
                offset={-20}
              />
            </YAxis>
            <Tooltip 
              formatter={(value) => `${(Number(value) / 1000000).toFixed(2)} M MAD`}
              labelStyle={{ color: 'var(--foreground)' }}
              contentStyle={{ 
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)'
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="hsl(var(--primary))"
              label={{ 
                position: 'top',
                formatter: (value) => `${(value / 1000000).toFixed(1)}M`,
                fill: 'var(--muted-foreground)'
              }}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Source: Ministère de l'Économie et des Finances du Maroc, 2024
        </p>
      </CardContent>
    </Card>
  );
}