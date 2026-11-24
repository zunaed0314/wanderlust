import React from "react";
import { Button } from "@heroui/react";
import { Pencil, ArrowLeft, UserRound, Mail } from "lucide-react";

const ProfileDetails = ({ user, onEdit, onBack }) => {
  const details = [
    { label: "Full Name", value: user.name, icon: UserRound },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Profile Image URL", value: user.image, icon: Pencil },
  ];

  return (
    <div className="space-y-5">
      {details.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-xl bg-gray-50 p-5"
        >
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <Icon className="text-cyan-600" size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-1 truncate font-semibold text-gray-800">
              {value || "Not provided"}
            </p>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
        <Button onPress={onEdit} className="bg-cyan-600 text-white">
          <Pencil size={17} />
          Edit Profile
        </Button>

        <Button variant="secondary" onPress={onBack}>
          <ArrowLeft size={17} />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
