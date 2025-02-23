"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function SecuritySettings() {
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataRetentionDays, setDataRetentionDays] = useState("");

  const saveSecuritySettings = () => {
    console.log("Saving security settings:", {
      ipWhitelist,
      twoFactorAuth,
      dataRetentionDays,
    });
    toast({
      title: "Security Settings Saved",
      description:
        "Your bot's security settings have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Configure Security Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ip-whitelist">IP Whitelist (comma-separated)</Label>
            <Input
              id="ip-whitelist"
              value={ipWhitelist}
              onChange={(e) => setIpWhitelist(e.target.value)}
              placeholder="Enter IP addresses to whitelist"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth">
              Enable Two-Factor Authentication
            </Label>
            <Switch
              id="two-factor-auth"
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>
          <div>
            <Label htmlFor="data-retention">Data Retention Period (days)</Label>
            <Input
              id="data-retention"
              type="number"
              value={dataRetentionDays}
              onChange={(e) => setDataRetentionDays(e.target.value)}
              placeholder="Enter number of days"
            />
          </div>
          <Button onClick={saveSecuritySettings}>Save Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
