import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
  } from "recharts";
  import { Skeleton } from "@/components/ui/skeleton";
import { BudgetForecast } from "@/@types/types";

  
  interface ForecastChartProps {
    data: BudgetForecast[];
    isLoading: boolean;
  }
  
  export function ForecastChart({ data, isLoading }: ForecastChartProps) {
    if (isLoading) {
      return <Skeleton className="w-full h-[300px]" />;
    }
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend />
          <Bar dataKey="projectedSpending" fill="#8884d8" name="Projected" />
          <Bar dataKey="averageSpending" fill="#82ca9d" name="Average" />
          <ReferenceLine
            y={data[0]?.suggestedBudget}
            label="Suggested Budget"
            stroke="#ff7300"
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }