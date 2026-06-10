"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Brain, ClipboardList, Home, Library, MessageCircle, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/lesson", label: "Lesson", icon: BookOpen },
  { href: "/review", label: "Review", icon: Brain },
  { href: "/phrasebook", label: "Phrases", icon: Library },
  { href: "/practice", label: "Practice", icon: MessageCircle },
  { href: "/quiz", label: "Quiz", icon: ClipboardList },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/settings", label: "Data", icon: Settings }
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-paper/95 px-2 py-2 shadow-[0_-10px_24px_rgba(23,32,27,0.08)] backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-8 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring flex min-h-14 flex-col items-center justify-center rounded-md px-1 text-[11px] font-semibold ${
                active ? "bg-moss text-white" : "text-ink/70 hover:bg-black/5"
              }`}
              title={item.label}
            >
              <Icon size={19} strokeWidth={2.2} />
              <span className="mt-1 hidden leading-none sm:block">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
