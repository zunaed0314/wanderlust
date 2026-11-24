import React from "react";
import { Controller } from "react-hook-form";
import { Button } from "@heroui/react";
import { Save, X, RotateCcw } from "lucide-react";

const ProfileForm = ({
  user,
  control,
  errors,
  isSubmitting,
  isDirty,
  onReset,
  onCancel,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold">Full Name</label>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-cyan-500"
            />
          )}
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Profile Image URL
        </label>

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter your image URL"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-cyan-500"
            />
          )}
        />

        {errors.image && (
          <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Email Address
        </label>

        <input
          type="email"
          value={user.email}
          disabled
          className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
        />

        <p className="mt-2 text-xs text-gray-400">
          Email cannot be changed from this form.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          className="bg-cyan-600 text-white"
        >
          <Save size={17} />
          Save Changes
        </Button>

        <Button
          type="button"
          variant="secondary"
          isDisabled={!isDirty || isSubmitting}
          onPress={onReset}
        >
          <RotateCcw size={17} />
          Reset
        </Button>

        <Button
          type="button"
          variant="secondary"
          isDisabled={isSubmitting}
          onPress={onCancel}
        >
          <X size={17} />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
