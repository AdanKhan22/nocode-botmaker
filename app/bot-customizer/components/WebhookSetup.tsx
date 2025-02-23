"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

export default function WebhookSetup() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [updateMethod, setUpdateMethod] = useState("webhook");

  const testWebhook = () => {
    console.log("Testing webhook:", webhookUrl);
    toast({
      title: "Webhook Test",
      description: "Webhook test request sent successfully.",
    });
  };

  const saveSettings = () => {
    console.log("Saving settings:", { webhookUrl, updateMethod });
    toast({
      title: "Settings Saved",
      description: "Your webhook settings have been saved successfully.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Set Up Webhooks</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="Enter webhook URL"
            />
          </div>
          <div>
            <Label>Update Method</Label>
            <RadioGroup value={updateMethod} onValueChange={setUpdateMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webhook" id="webhook" />
                <Label htmlFor="webhook">Webhook</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="polling" id="polling" />
                <Label htmlFor="polling">Long Polling</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex space-x-4">
            <Button onClick={testWebhook}>Test Webhook</Button>
            <Button onClick={saveSettings}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
