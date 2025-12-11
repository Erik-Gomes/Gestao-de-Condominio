"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useCallback } from "react";
import { FaUsers, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

const menu_items = [
  { href: "/condominios", label: "Condomínios", icon: FaBuilding },
  { href: "/usuarios", label: "Usuarios", icon: FaUsers },
];

export default function Menu() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`); //pathname.startsWith garante exemplos usuarios/123
  }

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut(); // Promisse
    if (!error) window.location.href = "/";
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col p-4 shadow-xl shadow-stone-700 bg-gradient-to-b from-stone-300 to-stone-400 ">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-4 font-bold text-xl text-stone-900  ">
        Viva Condo
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col flex-1">
        <ul className="space-y-2">
          {menu_items.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all  ${
                    active
                      ? "bg-stone-200 font-bold text-stone-800"
                      : "text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active ? "text-stone-800" : "text-stone-600"
                    }`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <hr className="my-4 border-gray-100" />

        <div>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={logout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-left text-stone-800 transition-all hover:bg-gray-100"
              >
                <FaSignOutAlt className="h-4 w-4 font-bold text-stone-800" />
                Sair
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-auto flex flex-col items-center pb-7">
          <img
            src="/viva-condo-logo.svg"
            alt="Viva Condo"
            className="h-50 w-auto"
          />

          <div className="mt-10 p-4 rounded-md text-stone-700 text-center">
            <p className="font-semibold mb-1">Precisa de ajuda?</p>
            <p className="text-sm text-stone-600">contato@vivacondo.com</p>
          </div>

          <div className="mb-4 text-xs text-stone-500 text-center">
            Viva Condo © 2025
          </div>
        </div>
      </nav>
    </aside>
  );
}
