import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BudgetItem } from "@shared/schema";

export function BudgetChart() {
  const { data: budgetItems, isLoading } = useQuery<BudgetItem[]>({
    queryKey: ["/api/budget"],
  });

  if (isLoading) {
    return (
      <Card className="w-full h-full animate-pulse bg-muted" />
    );
  }

  return (
    <Card className="w-full h-full p-6">
      <h3 className="text-lg font-semibold mb-4">Budget Allocation</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={budgetItems}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
