"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePasswordForm from "@/hooks/forms/usePasswordForm";
import { Form } from "../ui/form";
import { FormInput } from "../FormInput";

export function PasswordSection() {
  const { form, onSubmit, isLoading } = usePasswordForm();

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Password & Security
            </CardTitle>
            <CardDescription>Update your password and manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <FormInput
              control={form.control}
              name="current_password"
              label="Current Password"
              placeholder="Enter current password"
              variant="password"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                control={form.control}
                name="new_password"
                label="New Password"
                placeholder="Enter new password"
                variant="password"
              />
              <FormInput
                control={form.control}
                name="confirm_password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                variant="password"
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
                  "Change Password"
                )}
              </div>
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
