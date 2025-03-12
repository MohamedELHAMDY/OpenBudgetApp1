import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { BudgetItem } from "@shared/schema";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function AnalysisPage() {
  const { data: budgetItems, isLoading } = useQuery<BudgetItem[]>({
    queryKey: ["/api/budget"],
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-[400px] animate-pulse bg-muted rounded-lg" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
          <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  // Calculate total budget
  const totalBudget = budgetItems?.reduce((sum, item) => sum + item.amount, 0) || 0;

  // Calculate percentages for distribution analysis
  const distributionData = budgetItems?.map(item => ({
    name: item.category,
    value: (item.amount / totalBudget) * 100
  }));

  // Historical comparison data
  const historicalData = budgetItems?.map(item => ({
    name: item.category,
    "2022": item.amount * 0.85,
    "2023": item.amount * 0.92,
    "2024": item.amount,
  }));

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analyses Budgétaires Avancées</h1>
          <p className="text-muted-foreground">
            Explorez et analysez en détail le budget national marocain
          </p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner l'année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vue Générale du Budget 2024</CardTitle>
          <CardDescription>
            Répartition totale: {(totalBudget / 1000000).toFixed(2)} millions MAD
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
              >
                {distributionData?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${value.toFixed(1)}%`}
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

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution Historique</CardTitle>
            <CardDescription>Comparaison sur 3 ans par secteur</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
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
                  formatter={(value: number) => `${(value / 1000000).toFixed(2)} M MAD`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke={CHART_COLORS[1]}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="2022"
                  stroke={CHART_COLORS[2]}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyse Comparative</CardTitle>
            <CardDescription>Croissance annuelle par secteur</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
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
                  formatter={(value: number) => `${(value / 1000000).toFixed(2)} M MAD`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)'
                  }}
                />
                <Legend />
                <Bar dataKey="2024" fill={CHART_COLORS[0]} />
                <Bar dataKey="2023" fill={CHART_COLORS[1]} />
                <Bar dataKey="2022" fill={CHART_COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}