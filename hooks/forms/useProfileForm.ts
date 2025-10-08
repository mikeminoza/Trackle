"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { ProfileFields, ProfileSchema } from "@/lib/schemas/auth";
import { useState } from "react";
import { toast } from "sonner";
 
export default function useProfileForm(user: SupabaseUser) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.user_metadata.avatar_url ?? null
  );
  const [avatarPath, setAvatarPath] = useState<string | null>(
    user.user_metadata.avatar_path ?? null
  ); 

  const form = useForm<ProfileFields>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      full_name: user.user_metadata.full_name ?? "",
      email: user.email ?? "",
      avatar: undefined, 
    },
  });

  const onSubmit: SubmitHandler<ProfileFields> = async (values) => {
    setIsLoading(true);

    const oauthProvider = "google";  
    if (user.app_metadata?.provider === oauthProvider && values.email !== user.email) {
      toast.error(`You cannot change your email because you signed up via ${oauthProvider}.`);
      setIsLoading(false);
      return;  
    }

    try {
      let avatar_url: string | undefined = undefined;
      let newFilePath: string | undefined = undefined;
 
      if (values.avatar) {
        
        const file = values.avatar as File;
        const fileExt = file.name.split(".").pop();
        newFilePath = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(newFilePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          toast.error(`Upload profile image failed: ${uploadError.message}`);
          return;  
        }

        const { data } = supabase.storage.from("avatars").getPublicUrl(newFilePath);
        avatar_url = data.publicUrl; 
        setPreviewUrl(avatar_url);

        if (avatarPath && avatarPath !== newFilePath) {
          await supabase.storage.from("avatars").remove([avatarPath]);
        }
      }
  
      const { error: updateUserError } = await supabase.auth.updateUser({
        email: user.app_metadata?.provider ? user.email : values.email,
        data: {
          full_name: values.full_name ?? undefined,
          avatar_url: avatar_url ?? user.user_metadata.avatar_url,
          avatar_path: newFilePath ?? avatarPath, 
        },
      });

      if (updateUserError) {
        toast.error(`Update User failed: ${updateUserError.message}`);
        return;
      }
      if (newFilePath) {
        setAvatarPath(newFilePath);
      }
 
      toast.success("Profile updated successfully!");
    } catch  {
      toast.error("Something went wrong while updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    previewUrl,   
    setPreviewUrl  
  };
}
