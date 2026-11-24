import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { LogOut } from "lucide-react";

const UserMenu = ({ user, onSignOut, onClose, mobile = false }) => {
  return (
    <div className={mobile ? "flex flex-col gap-3" : "flex items-center gap-3"}>
      <Link
        href="/profile"
        onClick={onClose}
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

        <div className="min-w-0">
          <p className="max-w-32 truncate text-sm font-semibold text-gray-700">
            {user.name}
          </p>

          {mobile && (
            <p className="max-w-52 truncate text-xs text-gray-500">
              {user.email}
            </p>
          )}
        </div>
      </Link>

      <Button
        onPress={onSignOut}
        variant="bordered"
        className="rounded-full border-gray-200 font-semibold text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
