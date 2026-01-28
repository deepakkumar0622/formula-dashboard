"use client";

import {
  LayoutDashboard,
  Folder,
  FileText,
  Search,
  Database,
  Settings,
  Bell,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  name?: string;
  icon?: any;
  href?: string;
  divider?: boolean;
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Workspaces", icon: Folder, href: "/workspaces" },
    { name: "Formulas", icon: FileText, href: "/formula" },
    { name: "Search", icon: Search, href: "/search" },
    { divider: true },
    { name: "Masters", icon: Database, href: "/masters" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div
      className={`h-full transition-all duration-300 ease-in-out overflow-hidden z-50 pointer-events-auto
  ${isOpen ? "w-64" : "w-20"}`}
    >
      <aside
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between relative"
      >
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200 ">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center" />
            {isOpen && (
              <span className="ml-3 text-lg font-semibold tracking-tight text-black">
                Formula Builder
              </span>
            )}
          </div>

          <nav className="mt-4 pr-5 space-y-1">
            {menuItems.map((item, i) =>
              item.divider ? (
                <div key={i} className="my-5  border-t border-gray-200 " />
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`group  relative flex items-center gap-3 px-3 mx-4 py-2 rounded-xl transition-all
                ${
                  pathname === item.href
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }
                ${isOpen ? "w-full" : "w-fit"}`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      pathname === item.href ? "text-white" : "text-gray-500"
                    }`}
                  />

                  {isOpen && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}

                  {!isOpen && (
                    <span className="absolute left-full ml-3 px-2 py-1 text-xs rounded-md bg-gray-900 text-white opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-2  mb-3">
          <div className="group relative flex items-center gap-3 px-3 py-2  rounded-xl hover:bg-gray-100 cursor-pointer">
            <div className="w-9 h-9 rounded-full relative bg-gray-200 flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </div>
            {isOpen && (
              <span className="text-sm text-black">Notifications</span>
            )}

            {!isOpen && (
              <span className="absolute left-full ml-3 px-2 py-1 text-xs rounded-md bg-gray-900 text-white opacity-0 group-hover:opacity-100">
                Notifications
              </span>
            )}
          </div>

          <div className="group relative flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>

            {isOpen && (
              <div className="leading-tight">
                <p className="font-medium text-sm text-black">Dr. Elena Ruiz</p>
                <p className="text-xs text-gray-500">Senior Perfumer</p>
              </div>
            )}

            {!isOpen && (
              <span className="absolute left-full ml-3 px-2 py-1 text-xs rounded-md bg-gray-900 text-white opacity-0 group-hover:opacity-100">
                Profile
              </span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
