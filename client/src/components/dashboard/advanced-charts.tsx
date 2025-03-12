import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from "recharts";
import { BudgetItem } from "@shared/schema";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function AdvancedCharts() {
  const { data: budgetItems, isLoading } = useQuery<BudgetItem[]>({
    queryKey: ["/api/budget"],
  });

  if (isLoading) {
    return <div className="grid gap-6 md:grid-cols-2">
      <Card className="w-full h-[400px] animate-pulse bg-muted" />
      <Card className="w-full h-[400px] animate-pulse bg-muted" />
    </div>;
  }

  // Calculate percentages for pie chart
  const total = budgetItems?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const pieData = budgetItems?.map(item => ({
    name: item.category,
    value: (item.amount / total) * 100
  }));

  // Prepare trend data (simulated for now)
  const trendData = budgetItems?.map((item, index) => ({
    name: item.category,
    thisYear: item.amount,
    lastYear: item.amount * 0.9, // Simulated last year's data
    trend: ((item.amount - item.amount * 0.9) / (item.amount * 0.9)) * 100
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Répartition du Budget</CardTitle>
          <CardDescription>Distribution en pourcentage par secteur</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
                labelLine={true}
              >
                {pieData?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value.toFixed(1)}%`}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>Tendances Budgétaires</CardTitle>
          <CardDescription>Comparaison avec l'année précédente</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis>
                <Label 
                  value="Budget (Millions MAD)" 
                  angle={-90} 
                  position="insideLeft"
                  offset={-20}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => `${(value / 1000000).toFixed(2)} M MAD`}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)'
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="thisYear" 
                name="2024"
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="lastYear" 
                name="2023"
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                dot={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}