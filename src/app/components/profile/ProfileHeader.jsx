import React from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const isValidImageUrl = (value) => {
    if (!value) return false;

    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  };

  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-100 bg-gray-100">
        {isValidImageUrl(user.image) ? (
          <Image
            key={user.image}
            src={user.image}
            alt={user.name || "Profile picture"}
            width={112}
            height={112}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <UserRound size={48} className="text-gray-400" />
        )}
      </div>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>

      <p className="mt-1 text-sm text-gray-500">{user.email}</p>
    </div>
  );
};

export default ProfileHeader;
