import { Button } from "@heroui/react";
import { X, Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import Link from "next/link";

const MobileMenu = ({
  user,
  isAdmin,
  isOpen,
  onToggle,
  onClose,
  onSignOut,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="relative z-50 rounded-xl p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-40 w-full border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <NavLinks mobile onClick={onClose} isAdmin={isAdmin} />

            <div className="my-2 border-t border-gray-100" />

            {user ? (
              <UserMenu
                user={user}
                mobile
                onClose={onClose}
                onSignOut={onSignOut}
              />
            ) : (
              <div className="flex gap-3 pt-2">
                <Button
                  as={Link}
                  href="/login"
                  variant="bordered"
                  onPress={onClose}
                  className="flex-1 rounded-xl"
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  href="/signup"
                  onPress={onClose}
                  className="flex-1 rounded-xl bg-cyan-600 font-semibold text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
