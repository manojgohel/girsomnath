import { Badge } from "@/components/ui/badge";

export function PageHeader({ title, description, icon: Icon, badge, action }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="size-5 text-primary shrink-0" />}
          <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
          {badge && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground leading-snug">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
