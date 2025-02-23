"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function PermissionManager() {
  const [permissions, setPermissions] = useState({
    receiveAllMessages: false,
    groupAdmin: false,
    channelAdmin: false,
    allowJoinRequests: false,
    messagePreviews: true,
  });

  const handlePermissionChange = (permission: string) => {
    setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));
  };

  const savePermissions = () => {
    console.log("Saving permissions:", permissions);
    toast({
      title: "Permissions Saved",
      description: "Your bot's permissions have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Permissions</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Bot Privacy and Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="receive-all-messages">Receive all messages</Label>
            <Switch
              id="receive-all-messages"
              checked={permissions.receiveAllMessages}
              onCheckedChange={() =>
                handlePermissionChange("receiveAllMessages")
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="group-admin">Allow bot to be group admin</Label>
            <Switch
              id="group-admin"
              checked={permissions.groupAdmin}
              onCheckedChange={() => handlePermissionChange("groupAdmin")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="channel-admin">Allow bot to be channel admin</Label>
            <Switch
              id="channel-admin"
              checked={permissions.channelAdmin}
              onCheckedChange={() => handlePermissionChange("channelAdmin")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="join-requests">Allow join requests</Label>
            <Switch
              id="join-requests"
              checked={permissions.allowJoinRequests}
              onCheckedChange={() =>
                handlePermissionChange("allowJoinRequests")
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="message-previews">Enable message previews</Label>
            <Switch
              id="message-previews"
              checked={permissions.messagePreviews}
              onCheckedChange={() => handlePermissionChange("messagePreviews")}
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={savePermissions}>Save Permissions</Button>
    </div>
  );
}
