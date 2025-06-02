import * as React from "react";
import { cn } from "@/lib/utils.tsx";

interface LeagueData {
  id: number;
  name: string;
}

function LeagueRow({
  leagueData,
  className,
  ...props
}: {
  leagueData: LeagueData;
  className?: string;
} & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card w-6xl text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    >
      <LeagueRowHeader>
        <LeagueRowTitle>{leagueData.name}</LeagueRowTitle>
      </LeagueRowHeader>
    </div>
  );
}

function LeagueRowHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6 w-full items-center", className)}
      {...props}
    />
  );
}

function LeagueRowTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold text-xl", className)}
      {...props}
    />
  );
}

function LeagueRowDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function LeagueRowFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  LeagueRow,
  LeagueRowHeader,
  LeagueRowFooter,
  LeagueRowTitle,
  LeagueRowDescription
};
