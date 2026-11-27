"use client";

import { Clock } from "lucide-react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import { DEFAULT_OPERATING_HOURS } from "@/lib/constants";

const HOURS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
const PERIODS = ["AM", "PM"];

function parseTimeRange(value) {
  const defaultValue = DEFAULT_OPERATING_HOURS || "09:00 AM - 08:00 PM";
  const str = value && typeof value === "string" ? value : defaultValue;
  const parts = str.split("-").map((p) => p.trim());

  const parsePart = (part, fallbackHour, fallbackMin, fallbackPeriod) => {
    if (!part) return { hour: fallbackHour, minute: fallbackMin, period: fallbackPeriod };
    const match = part.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return { hour: fallbackHour, minute: fallbackMin, period: fallbackPeriod };
    return {
      hour: match[1].padStart(2, "0"),
      minute: match[2],
      period: match[3].toUpperCase(),
    };
  };

  const start = parsePart(parts[0], "09", "00", "AM");
  const end = parsePart(parts[1], "08", "00", "PM");

  return { start, end };
}

export function OperatingHoursInput({
  value = DEFAULT_OPERATING_HOURS,
  onChange,
  className = "",
}) {
  const { start, end } = parseTimeRange(value || DEFAULT_OPERATING_HOURS);

  const update = (updates) => {
    const nextStart = { ...start, ...(updates.start || {}) };
    const nextEnd = { ...end, ...(updates.end || {}) };
    const formatted = `${nextStart.hour}:${nextStart.minute} ${nextStart.period} - ${nextEnd.hour}:${nextEnd.minute} ${nextEnd.period}`;
    if (onChange) onChange(formatted);
  };

  const currentFormatted = `${start.hour}:${start.minute} ${start.period} - ${end.hour}:${end.minute} ${end.period}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="w-full rounded-2xl border border-border/80 bg-muted/20 p-2 sm:p-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between gap-1 sm:gap-1.5 min-w-fit">
          <div className="flex items-center gap-1 shrink-0">
            <Clock className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mr-0.5" />
            <Combobox
              items={HOURS}
              value={start.hour}
              onValueChange={(val) => val && update({ start: { hour: val } })}
            >
              <ComboboxInput
                placeholder="09"
                className="h-8 w-11 sm:w-12 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="max-h-48 min-w-16">
                  {HOURS.map((h) => (
                    <ComboboxItem key={`start-h-${h}`} value={h} className="text-xs font-mono">
                      {h}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <span className="text-xs font-bold text-muted-foreground select-none">:</span>

            <Combobox
              items={MINUTES}
              value={start.minute}
              onValueChange={(val) => val && update({ start: { minute: val } })}
            >
              <ComboboxInput
                placeholder="00"
                className="h-8 w-11 sm:w-12 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="max-h-48 min-w-16">
                  {MINUTES.map((m) => (
                    <ComboboxItem key={`start-m-${m}`} value={m} className="text-xs font-mono">
                      {m}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Combobox
              items={PERIODS}
              value={start.period}
              onValueChange={(val) => val && update({ start: { period: val } })}
            >
              <ComboboxInput
                placeholder="AM"
                className="h-8 w-12 sm:w-14 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="min-w-16">
                  {PERIODS.map((p) => (
                    <ComboboxItem key={`start-p-${p}`} value={p} className="text-xs font-mono">
                      {p}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase px-1 select-none shrink-0">
            TO
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <Combobox
              items={HOURS}
              value={end.hour}
              onValueChange={(val) => val && update({ end: { hour: val } })}
            >
              <ComboboxInput
                placeholder="08"
                className="h-8 w-11 sm:w-12 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="max-h-48 min-w-16">
                  {HOURS.map((h) => (
                    <ComboboxItem key={`end-h-${h}`} value={h} className="text-xs font-mono">
                      {h}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <span className="text-xs font-bold text-muted-foreground select-none">:</span>

            <Combobox
              items={MINUTES}
              value={end.minute}
              onValueChange={(val) => val && update({ end: { minute: val } })}
            >
              <ComboboxInput
                placeholder="00"
                className="h-8 w-11 sm:w-12 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="max-h-48 min-w-16">
                  {MINUTES.map((m) => (
                    <ComboboxItem key={`end-m-${m}`} value={m} className="text-xs font-mono">
                      {m}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Combobox
              items={PERIODS}
              value={end.period}
              onValueChange={(val) => val && update({ end: { period: val } })}
            >
              <ComboboxInput
                placeholder="PM"
                className="h-8 w-12 sm:w-14 px-1 rounded-xl text-xs bg-card border-border/80 font-mono font-medium [&_svg]:size-3 [&_button]:size-5 [&_input]:text-center [&_input]:p-0"
              />
              <ComboboxContent>
                <ComboboxList className="min-w-16">
                  {PERIODS.map((p) => (
                    <ComboboxItem key={`end-p-${p}`} value={p} className="text-xs font-mono">
                      {p}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
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
