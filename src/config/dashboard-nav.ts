import {
  Bell,
  CalendarDays,
  CreditCard,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserRound,
  Bookmark,
} from "lucide-react";

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/profile", icon: UserRound },
  { title: "Applications", href: "/dashboard/applications", icon: FileText },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  { title: "Documents", href: "/dashboard/documents", icon: FolderOpen },
  { title: "Saved", href: "/dashboard/saved", icon: Bookmark },
  { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;
