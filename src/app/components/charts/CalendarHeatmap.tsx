"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CalendarHeatmapProps {
  data: { date: string; value: number }[];
  width?: number;
  height?: number;
}

export function CalendarHeatmap({ data, width = 800, height = 200 }: CalendarHeatmapProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || !data.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Parse dates
    const parsedData = data.map(d => ({
      date: new Date(d.date),
      value: d.value
    }));

    // Set up dimensions
    const cellSize = 15;
    const dayPadding = 2;
    const weekPadding = 5;

    // Create color scale
    const maxValue = d3.max(parsedData, d => d.value) || 1;
    const colorScale = d3.scaleSequential(d3.interpolateOranges)
      .domain([0, maxValue]);

    // Group data by year and month
    const groupedByYear = d3.group(parsedData, d => d.date.getFullYear());
    
    let yOffset = 0;
    
    groupedByYear.forEach((yearData, year) => {
      // Add year label
      svg.append("text")
        .attr("x", 0)
        .attr("y", yOffset + 15)
        .text(year)
        .style("font-size", "12px")
        .style("fill", "#666");

      yOffset += 25;

      // Group by month within the year
      const groupedByMonth = d3.group(yearData, d => d.date.getMonth());
      
      groupedByMonth.forEach((monthData, month) => {
        const monthName = new Date(2000, month, 1).toLocaleString('default', { month: 'short' });
        
        // Add month label
        svg.append("text")
          .attr("x", 0)
          .attr("y", yOffset + 15)
          .text(monthName)
          .style("font-size", "12px")
          .style("fill", "#666");

        // Calculate positions for each day
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        const daysInMonth = monthEnd.getDate();
        const firstDay = monthStart.getDay();

        // Create a grid for the month
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const dayOfWeek = date.getDay();
          const weekOfMonth = Math.floor((day + firstDay - 1) / 7);
          
          // Find data for this date
          const dayData = monthData.find(d => 
            d.date.getDate() === day && 
            d.date.getMonth() === month && 
            d.date.getFullYear() === year
          );
          
          const value = dayData?.value || 0;
          
          // Draw cell
          svg.append("rect")
            .attr("x", 50 + dayOfWeek * (cellSize + dayPadding))
            .attr("y", yOffset + weekOfMonth * (cellSize + weekPadding))
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", colorScale(value))
            .attr("rx", 2)
            .attr("ry", 2)
            .append("title")
            .text(`${date.toDateString()}: ${value.toFixed(2)}`);
        }

        yOffset += (Math.ceil((daysInMonth + firstDay) / 7) * (cellSize + weekPadding) + 10);
      });
    });

  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
}