import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    return <Card className="w-full h-[300px] animate-pulse bg-muted" />;
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
      <Card className="w-full h-[300px]">
        <CardHeader>
          <CardTitle>Répartition du Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full h-[300px]">
        <CardHeader>
          <CardTitle>Tendances Budgétaires</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line type="monotone" dataKey="thisYear" stroke="hsl(var(--primary))" />
              <Line type="monotone" dataKey="lastYear" stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(2)} M MAD`} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
