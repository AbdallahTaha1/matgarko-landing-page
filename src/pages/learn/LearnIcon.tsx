import type { LearnIcon as LearnIconName } from "@/data/learn";
import { ClipboardList, LayoutTemplate, Package, Palette, Rocket, Target, Ticket, Truck } from "lucide-react";

const icons = {
  rocket: Rocket,
  package: Package,
  orders: ClipboardList,
  truck: Truck,
  ticket: Ticket,
  target: Target,
  palette: Palette,
  layout: LayoutTemplate,
} satisfies Record<LearnIconName, typeof Rocket>;

export function LearnIcon({ name, className }: { name: LearnIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
