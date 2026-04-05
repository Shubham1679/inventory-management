import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5 text-red-500">Failed to fetch data</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl flex flex-col">
      {isLoading ? (
        <div className="m-5 text-gray-700 dark:text-gray-300">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-6 pt-5 text-gray-900 dark:text-white">
              Sales Summary
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* BODY */}
          <div className="px-6 py-4">
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Value</p>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  $
                  {(totalValueSum / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>

              <select
                className="shadow-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded text-sm focus:outline-none"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#374151" strokeOpacity={0.3} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--chart-text, #6b7280)" }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tick={{ fill: "var(--chart-text, #6b7280)" }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    borderColor: "var(--tooltip-border, #e5e7eb)",
                    color: "var(--tooltip-text, #111827)",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between items-center text-sm px-6 py-3 text-gray-600 dark:text-gray-400">
              <p>{salesData.length || 0} days</p>
              <p>
                Highest Sales:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {highestValueDate}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;