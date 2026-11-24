"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { Menu, X, Compass, UserRound, LogOut } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/mybookings" },
    { name: "Add Destination", href: "/add-destination" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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

  const NavItems = ({ mobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenu}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            isActive(link.href)
              ? "bg-cyan-50 text-cyan-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-cyan-700"
          } ${mobile ? "block w-full" : ""}`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
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
          <NavItems />
        </div>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-gray-100 px-3 py-2 transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <Avatar className="h-9 w-9">
                  <Avatar.Image
                    src={user.image || ""}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar.Fallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.name}
                </span>
              </Link>

              <Button
                onPress={handleSignOut}
                variant="bordered"
                className="rounded-full border-gray-200 font-semibold text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
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
                className="rounded-full bg-cyan-600 px-6 font-semibold text-white shadow-md shadow-cyan-600/20 transition hover:bg-cyan-700"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-xl p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-2">
            <NavItems mobile />

            <div className="my-2 border-t border-gray-100" />

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
                >
                  <Avatar className="h-10 w-10">
                    <Avatar.Image
                      src={user.image || ""}
                      alt={user.name || "User"}
                      referrerPolicy="no-referrer"
                    />
                    <Avatar.Fallback>
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </Link>

                <Button
                  onPress={handleSignOut}
                  variant="bordered"
                  className="mt-2 w-full rounded-xl border-red-200 font-semibold text-red-600"
                >
                  <LogOut size={17} />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Button
                  as={Link}
                  href="/login"
                  variant="bordered"
                  onPress={closeMenu}
                  className="flex-1 rounded-xl"
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  href="/signup"
                  onPress={closeMenu}
                  className="flex-1 rounded-xl bg-cyan-600 font-semibold text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
