import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  FileText,
  Landmark,
  MessageSquareQuote,
  CircleHelp,
  Images,
  Search,
  Settings,
  Mail,
  Shield,
  ChartColumn,
  ContactRound,
  UserCog,
} from "lucide-react";

export type AdminNavItem = {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** If set, only these roles see the item. Omit = all admin-area roles. */
  roles?: readonly ("admin" | "super_admin" | "employee")[];
};

/** Roles allowed to view customer callback / contact leads. */
export const LEADS_ACCESS_ROLES = ["admin", "super_admin"] as const;

export const adminNav: readonly AdminNavItem[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Analytics", href: "/admin/analytics", icon: ChartColumn },
  {
    title: "CRM / Leads",
    href: "/admin/leads",
    icon: ContactRound,
    roles: LEADS_ACCESS_ROLES,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Employees",
    href: "/admin/employees",
    icon: UserCog,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: BriefcaseBusiness,
  },
  { title: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Blogs", href: "/admin/blogs", icon: FileText },
  { title: "Services", href: "/admin/services", icon: Landmark },
  { title: "Schemes", href: "/admin/schemes", icon: Landmark },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { title: "FAQs", href: "/admin/faqs", icon: CircleHelp },
  { title: "Media", href: "/admin/media", icon: Images },
  { title: "SEO", href: "/admin/seo", icon: Search },
  { title: "Newsletter", href: "/admin/newsletter", icon: Mail },
  {
    title: "Roles",
    href: "/admin/roles",
    icon: Shield,
    roles: ["admin", "super_admin"],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin", "super_admin"],
  },
] as const;

export function canAccessAdminNavItem(
  item: AdminNavItem,
  role?: string | null,
) {
  if (!item.roles) return true;
  if (!role) return false;
  return (item.roles as readonly string[]).includes(role);
}
