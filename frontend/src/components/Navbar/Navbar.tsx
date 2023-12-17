"use client";
import Logo from "../Logo";
import PopupComponent from "./PopupComponent";
import { INavbarLinks } from "@/types/generated";
import MobileNav from "./MobileNav";

export function Navbar({
  links = [],
  logoUrl,
}: {
  links: Array<INavbarLinks>;
  logoUrl: string | null;
}) {
  return (
    <header className="w-screen">
      <nav className="container h-32">
        <div className="flex items-center justify-between h-full">
          <Logo src={logoUrl} />
          <div className="hidden sm:flex items-center gap-6">
            {links.map(({ label, children }) => (
              <PopupComponent
                key={label}
                triggerText={label}
                content={children}
              />
            ))}
          </div>
          <MobileNav logoUrl={logoUrl} navLinks={links} />
        </div>
      </nav>
    </header>
  );
}
