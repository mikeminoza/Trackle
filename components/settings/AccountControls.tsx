"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AccountControls({ user }: { user: SupabaseUser }) {
  const supabase = createClient();
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) {
        toast.error(`Failed to delete account: ${error.message}`);
      } else {
        toast.success("Your account has been deleted.");
        window.location.href = "/";
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <span className="font-semibold text-destructive">
          This action is permanent and cannot be undone.
        </span>{" "}
        Please proceed with extreme caution.
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Once deleted, all your data will be permanently removed. This includes transactions,
                budgets, and profile information.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-pretty">
                    <span>
                      This action <span className="font-bold text-destructive">cannot</span> be
                      undone. Your account and all associated data will be erased forever.
                    </span>
                    <Input
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      placeholder="Type DELETE to confirm"
                      className="mt-3"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-white hover:bg-destructive/90"
                    disabled={confirmation !== "DELETE" || isDeleting}
                    onClick={handleDelete}
                  >
                    <div className="flex items-center gap-2">
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Delete Account"
                      )}
                    </div>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
