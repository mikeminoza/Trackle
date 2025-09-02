"use client";

import { ContentHeader } from "@/components/sidebar/content-header";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CalendarFilter from "@/components/transactions/CalendarFilter";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";

export default function Page() {
  const hasTransactions = true;

  return (
    <>
      <ContentHeader title="Transactions" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col my-6 px-6">
        {/* Top Controls */}
        <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <CalendarFilter />
              <TransactionFilter />
              <TransactionDialog />
            </div>
          </div>
        </MotionEffect>

        <div className="space-y-6">
          {/* Transactions List */}
          {hasTransactions ? (
            <div className="space-y-6">
              {/* Group: Today */}
              <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
                <section>
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                    Today • Spent ₱1,250
                  </h2>
                  <ul className="divide-y rounded-xl border bg-card">
                    <li className="flex items-center justify-between p-4 hover:bg-accent/50 transition rounded-t-xl">
                      <div>
                        <p className="font-medium">Jollibee Lunch</p>
                        <p className="text-sm text-muted-foreground">Food </p>
                      </div>
                      <p className="font-semibold text-red-400">-₱350</p>
                    </li>
                    <li className="flex items-center justify-between p-4 hover:bg-accent/50 transition rounded-b-xl">
                      <div>
                        <p className="font-medium">Salary</p>
                        <p className="text-sm text-muted-foreground">Income </p>
                      </div>
                      <p className="font-semibold text-green-400">+₱20,000</p>
                    </li>
                  </ul>
                </section>
              </MotionEffect>

              {/* Group: Yesterday */}
              <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.4}>
                <section>
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                    Yesterday • Spent ₱600
                  </h2>
                  <ul className="divide-y rounded-xl border bg-card">
                    <li className="flex items-center justify-between p-4 hover:bg-accent/50 transition rounded-xl">
                      <div>
                        <p className="font-medium">Grab Ride</p>
                        <p className="text-sm text-muted-foreground">Transport </p>
                      </div>
                      <p className="font-semibold text-red-400">-₱200</p>
                    </li>
                  </ul>
                </section>
              </MotionEffect>
            </div>
          ) : (
            // Empty State
            <MotionEffect fade zoom slide={{ direction: "up" }} delay={0.3} inView>
              <div className="text-center py-16 text-muted-foreground">
                <p className="mb-3">No transactions yet.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add your first transaction
                </Button>
              </div>
            </MotionEffect>
          )}
        </div>
      </div>
    </>
  );
}
