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
    return <Card className="w-full h-full animate-pulse bg-muted" />;
  }

  // Format amount to show MAD currency
  const formattedData = budgetItems?.map(item => ({
    ...item,
    formattedAmount: `${(item.amount / 1000000).toFixed(2)} M MAD`
  }));

  return (
    <Card className="w-full h-full p-6">
      <h3 className="text-lg font-semibold mb-4">Allocation Budgétaire</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `${(Number(value) / 1000000).toFixed(2)} M MAD`} />
          <Bar dataKey="amount" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}