"use client";
import { admin } from "@/app/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((res) => {
        if (res.ok) {
          toast.success("Allowed");
        } else {
          toast.error("Not Allowed");
        }
      })
      .catch((e) => {
        console.log("ERROR");
      });
  };
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader className="text-2xl font-semibold text-center">
        Admin
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin only API Routes</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
