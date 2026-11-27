"use client";

import { Clock } from "lucide-react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

const TIME_OPTIONS = (() => {
  const times = [];
  const periods = ["AM", "PM"];
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (const period of periods) {
    for (const h of hours) {
      const hourStr = h.toString().padStart(2, "0");
      for (const m of ["00", "15", "30", "45"]) {
        times.push(`${hourStr}:${m} ${period}`);
      }
    }
  }
  return times;
})();

const DEFAULT_START = "09:00 AM";
const DEFAULT_END = "08:00 PM";
const DEFAULT_TIMING = `${DEFAULT_START} - ${DEFAULT_END}`;

function parseTimeRange(value) {
  if (!value || typeof value !== "string") {
    return { start: DEFAULT_START, end: DEFAULT_END };
  }

  const parts = value.split("-").map((p) => p.trim());
  if (parts.length === 2 && parts[0] && parts[1]) {
    return {
      start: parts[0],
      end: parts[1],
    };
  }

  return { start: DEFAULT_START, end: DEFAULT_END };
}

export function OperatingHoursInput({
  value = DEFAULT_TIMING,
  onChange,
  className = "",
}) {
  const { start, end } = parseTimeRange(value || DEFAULT_TIMING);

  const handleStartChange = (val) => {
    if (!val) return;
    const formatted = `${val} - ${end}`;
    if (onChange) onChange(formatted);
  };

  const handleEndChange = (val) => {
    if (!val) return;
    const formatted = `${start} - ${val}`;
    if (onChange) onChange(formatted);
  };

  const currentFormatted = `${start} - ${end}`;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            <Clock className="size-3 text-primary" /> Opens At
          </label>
          <Combobox
            items={TIME_OPTIONS}
            value={start}
            onValueChange={handleStartChange}
          >
            <ComboboxInput
              placeholder="09:00 AM"
              className="h-9 rounded-xl text-xs bg-card border-border/80 font-mono font-medium"
            />
            <ComboboxContent>
              <ComboboxEmpty>No time found.</ComboboxEmpty>
              <ComboboxList className="max-h-56">
                {TIME_OPTIONS.map((time) => (
                  <ComboboxItem key={`start-${time}`} value={time} className="text-xs font-mono">
                    {time}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            <Clock className="size-3 text-muted-foreground" /> Closes At
          </label>
          <Combobox
            items={TIME_OPTIONS}
            value={end}
            onValueChange={handleEndChange}
          >
            <ComboboxInput
              placeholder="08:00 PM"
              className="h-9 rounded-xl text-xs bg-card border-border/80 font-mono font-medium"
            />
            <ComboboxContent>
              <ComboboxEmpty>No time found.</ComboboxEmpty>
              <ComboboxList className="max-h-56">
                {TIME_OPTIONS.map((time) => (
                  <ComboboxItem key={`end-${time}`} value={time} className="text-xs font-mono">
                    {time}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-0.5 pt-0.5">
        <span>Operating format:</span>
        <span className="font-mono font-bold text-xs text-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/70">
          {currentFormatted}
        </span>
      </div>
    </div>
  );
}
