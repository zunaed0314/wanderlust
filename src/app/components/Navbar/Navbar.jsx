"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    closeMenu();

    const protectedRoutes = ["/mybookings", "/add-destination"];

    const isProtectedRoute =
      protectedRoutes.includes(pathname) ||
      /^\/destinations\/[^/]+$/.test(pathname);

    if (isProtectedRoute) {
      router.replace("/login");
    }

    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="shrink-0">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlust"
            width={150}
            height={60}
            priority
            className="h-auto w-32 sm:w-36"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavLinks isAdmin={isAdmin} />
        </div>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <UserMenu user={user} onSignOut={handleSignOut} />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Button
                as={Link}
                href="/signup"
                className="rounded-full bg-cyan-600 px-6 font-semibold text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-700"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          user={user}
          isAdmin={isAdmin}
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onClose={closeMenu}
          onSignOut={handleSignOut}
        />
      </div>
    </nav>
  );
};

export default Navbar;
