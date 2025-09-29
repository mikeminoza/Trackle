"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProfileForm from "@/hooks/forms/useProfileForm";
import { Form } from "../ui/form";
import { FormInput } from "../FormInput";
import { useRef } from "react";

interface ProfileSectionProps {
  user: SupabaseUser;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const { form, onSubmit, isLoading, previewUrl, setPreviewUrl } = useProfileForm(user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      form.setValue("avatar", file, { shouldDirty: true, shouldValidate: true });
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={previewUrl || "/images/logo.png"} />
                  <AvatarFallback className="flex items-center justify-center bg-muted text-muted-foreground border">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  type="button"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Profile Picture</p>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 5MB.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                control={form.control}
                name="full_name"
                label="Full Name"
                placeholder="Enter Full Name"
              />
              <FormInput
                control={form.control}
                name="email"
                label="email"
                placeholder="Enter mail"
              />
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading || !form.formState.isDirty}
            >
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Save Changes"
                )}
              </div>
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
