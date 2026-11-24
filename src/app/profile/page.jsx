"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useForm, useWatch, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileForm from "../components/profile/ProfileForm";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  image: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;

      try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    }, "Please enter a valid image URL."),
});

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
	mode: 'onChange',
    defaultValues: {
      name: "",
      image: "",
    },
  });

  // Original profile values.
  const originalName = user?.name || "";
  const originalImage = user?.image || "";

  // Subscribe to individual field changes.
  const currentName = useWatch({ control, name: "name" }) ?? "";
  const currentImage = useWatch({ control, name: "image" }) ?? "";

  // Check whether either field has changed.
  const isDirty =
    currentName !== originalName || currentImage !== originalImage;

  const handleEdit = () => {
    reset({
      name: originalName,
      image: originalImage,
    });

    setIsEditing(true);
  };

  const handleReset = () => {
    reset({
      name: originalName,
      image: originalImage,
    });
  };

  const handleCancel = () => {
    reset({
      name: originalName,
      image: originalImage,
    });

    setIsEditing(false);
  };

  const onSubmit = async (values) => {
    try {
      const { error } = await authClient.updateUser({
        name: values.name,
        image: values.image || null,
      });

      if (error) throw new Error(error.message);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Please log in first.</h1>
        <Button onPress={() => router.push("/login")}>Go to Login</Button>
      </div>
    );
  }

  const previewUser = {
    ...user,
    name: isEditing ? currentName : user.name,
    image: isEditing ? currentImage : user.image,
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-cyan-600 px-8 py-10 text-center text-white">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-cyan-100">Manage your personal information</p>
        </div>

        <div className="p-6 md:p-10">
          <ProfileHeader user={previewUser} />

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProfileForm
                user={user}
                control={control}
                errors={errors}
                currentName={currentName}
                currentImage={currentImage}
                isDirty={isDirty}
                onReset={handleReset}
                isSubmitting={isSubmitting}
                onCancel={handleCancel}
              />
            </form>
          ) : (
            <ProfileDetails
              user={user}
              onEdit={handleEdit}
              onBack={() => router.back()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
