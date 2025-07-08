"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  onSelect: (range: DateRange | undefined) => void;
  initialFrom?: Date | string;
  initialTo?: Date | string;
  className?: string;
}

export function DateRangePicker({
  onSelect,
  initialFrom,
  initialTo,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: initialFrom ? new Date(initialFrom) : undefined,
    to: initialTo ? new Date(initialTo) : undefined,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onSelect(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          side="bottom"
        >
          <div className="relative">
            <DayPicker
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              className="w-full"
              classNames={{
                months: "flex  flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0 p-5 mt-3 ",
                month: "space-y-4 ",
                caption: "flex flex-col  items-center ",
                caption_label: "text-sm text-green-600 text-2xl flex justify-center font-medium mt-6",
                nav: "space-x-1  flex items-center absolute top-0 left-0 right-0 z-10 justify-between px-3",
                nav_button: "h-7 w-7  bg-transparent p-0 opacity-50 hover:opacity-100",
                table: "w-full border-collapse  space-y-1",
                head_row: "flex",
                head_cell: " rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                  "relative p-0 text-center  text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                  "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                ),
                day: "h-8 w-8 p-0 font-normal  aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                day_selected: "bg-gray-200 text-black rounded-full",
                day_today: "bg-accent text-red-500 font-semibold",
                day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: " opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              
              components={
                {
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any
              }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}