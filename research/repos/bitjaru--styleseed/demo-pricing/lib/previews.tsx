import type { ReactNode } from "react";
import {
  Bell,
  CreditCard,
  Package,
  TrendingUp,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Home,
  Settings,
} from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@engine/components/ui/alert";
import { Avatar, AvatarFallback } from "@engine/components/ui/avatar";
import { Badge } from "@engine/components/ui/badge";
import { Button } from "@engine/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@engine/components/ui/card";
import { Checkbox } from "@engine/components/ui/checkbox";
import { Input } from "@engine/components/ui/input";
import { Label } from "@engine/components/ui/label";
import { Progress } from "@engine/components/ui/progress";
import { Separator } from "@engine/components/ui/separator";
import { Skeleton } from "@engine/components/ui/skeleton";
import { Switch } from "@engine/components/ui/switch";
import { Textarea } from "@engine/components/ui/textarea";
import { Toggle } from "@engine/components/ui/toggle";

import { BottomNav } from "@engine/components/patterns/bottom-nav";
import { EmptyState } from "@engine/components/patterns/empty-state";
import { HeroCard } from "@engine/components/patterns/hero-card";
import { ListItem } from "@engine/components/patterns/list-item";
import { ProgressBar } from "@engine/components/patterns/progress-bar";
import { SectionCard } from "@engine/components/patterns/section-card";
import { StatCard } from "@engine/components/patterns/stat-card";
import { TopBar } from "@engine/components/patterns/top-bar";
import { ValueDisplay } from "@engine/components/patterns/value-display";

export const previews: Record<string, ReactNode> = {
  // UI primitives
  button: (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
  alert: (
    <Alert>
      <CheckCircle2 className="size-4" />
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>Your transaction has been processed.</AlertDescription>
    </Alert>
  ),
  card: (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input placeholder="Email" />
        <Button className="mt-2">Continue</Button>
      </CardContent>
    </Card>
  ),
  avatar: (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
    </div>
  ),
  separator: (
    <div className="flex flex-col gap-3" style={{ width: 240 }}>
      <span className="text-sm">Above</span>
      <Separator />
      <span className="text-sm">Below</span>
    </div>
  ),
  skeleton: (
    <div className="flex flex-col gap-2" style={{ width: 240 }}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  ),
  input: <Input placeholder="name@example.com" className="max-w-xs" />,
  label: (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" className="max-w-xs" />
    </div>
  ),
  textarea: (
    <Textarea placeholder="Tell us what you think..." className="max-w-md" rows={4} />
  ),
  switch: (
    <div className="flex items-center gap-2">
      <Switch defaultChecked />
      <Label>Notifications</Label>
    </div>
  ),
  toggle: <Toggle defaultPressed>Bold</Toggle>,
  checkbox: (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">I accept the terms</Label>
    </div>
  ),
  progress: <Progress value={66} className="w-64" />,

  // Patterns
  "stat-card": (
    <StatCard
      icon={CreditCard}
      label="Today's Revenue"
      value="48.2"
      unit="K"
      trend={{ value: "+8.2%", direction: "up" }}
    />
  ),
  "hero-card": (
    <HeroCard
      icon={Wallet}
      label="Total Revenue This Month"
      value="3.8"
      unit="M"
      trend={{ value: "+12.4%", direction: "up", label: "vs last month" }}
      watermarkIcon={Wallet}
    />
  ),
  "empty-state": (
    <EmptyState
      icon={Package}
      title="No orders yet"
      description="Add a new order to get started."
      action={<Button>Add Order</Button>}
    />
  ),
  "section-card": (
    <SectionCard title="Recent Activity">
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        3 new updates since yesterday.
      </p>
    </SectionCard>
  ),
  "list-item": (
    <div className="rounded-2xl" style={{ background: "var(--card)" }}>
      <ListItem
        title="Acme Corp"
        status={{ label: "Completed", color: "#22C55E" }}
        trailing={<span className="font-bold text-[17px]">$8.4K</span>}
      />
    </div>
  ),
  "progress-bar": (
    <div className="w-64">
      <ProgressBar value={72} />
    </div>
  ),
  "value-display": <ValueDisplay value={3842} prefix="$" />,
  "top-bar": (
    <div className="w-full max-w-[430px] rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <TopBar
        logo={<span className="text-[18px] font-bold">Acme</span>}
        subtitle="March 30, 2026"
      />
    </div>
  ),
  "bottom-nav": (
    <div className="w-full max-w-[430px] rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <BottomNav
        items={[
          { name: "Home", icon: Home },
          { name: "Orders", icon: Package },
          { name: "Analytics", icon: TrendingUp },
          { name: "Settings", icon: Settings },
          { name: "Alerts", icon: Bell },
        ]}
        activeIndex={0}
      />
    </div>
  ),
};

export function hasPreview(id: string): boolean {
  return id in previews;
}
