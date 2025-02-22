"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ConnectAPIs({ formData, updateFormData }) {
  const [telegramToken, setTelegramToken] = useState(
    formData.telegramToken || ""
  );
  const [customWebhook, setCustomWebhook] = useState(
    formData.customWebhook || ""
  );

  const handleTelegramTokenChange = (e) => {
    setTelegramToken(e.target.value);
    updateFormData({ telegramToken: e.target.value });
  };

  const handleCustomWebhookChange = (e) => {
    setCustomWebhook(e.target.value);
    updateFormData({ customWebhook: e.target.value });
  };

  const validateTelegramToken = async () => {
    if (!telegramToken) {
      toast({
        title: "Error",
        description: "Telegram Bot API token is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramToken}/getMe`
      );
      const data = await response.json();

      if (data.ok) {
        toast({
          title: "Success",
          description: `Connected to Telegram bot: ${data.result.username}`,
        });
      } else {
        toast({
          title: "Invalid Token",
          description: "Please check your Telegram Bot API token.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description:
          "Failed to connect to Telegram. Check your network or token.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Connect Telegram Bot</h2>
      <div>
        <Label htmlFor="telegram-token">Telegram Bot API Token</Label>
        <div className="flex space-x-2">
          <Input
            id="telegram-token"
            type="password"
            value={telegramToken}
            onChange={handleTelegramTokenChange}
            placeholder="Enter Telegram Bot API token"
          />
          <Button onClick={validateTelegramToken}>Validate</Button>
        </div>
      </div>
      <div>
        <Label htmlFor="custom-webhook">Custom Webhook URL (Optional)</Label>
        <Input
          id="custom-webhook"
          value={customWebhook}
          onChange={handleCustomWebhookChange}
          placeholder="Enter custom webhook URL"
        />
      </div>
    </div>
  );
}
