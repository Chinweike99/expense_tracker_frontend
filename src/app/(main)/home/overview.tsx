import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { Card } from "@/components/ui/card";
  
  interface OverviewProps {
    data: {
      date: string;
      income: number;
      expenses: number;
    }[];
    className?: string;
  }
  
  export function Overview({ data, className }: OverviewProps) {
    return (
      <Card className={cn("p-6", className)}>
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#F44336"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
  }