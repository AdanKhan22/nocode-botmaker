"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface BotData {
  first_name: string;
  last_name?: string;
  username: string;
  id: number;
}

export default function ConnectAPIs({ formData, updateFormData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [botData, setBotData] = useState<BotData | null>(null);

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
    setLoading(true);
    setError(null);
    setBotData(null);

    if (!telegramToken) {
      toast({
        title: "Error",
        description: "Telegram Bot API token is required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const apiUrl = process.env.NODE_ENV === "production"
      ? "https://your-production-url.com/telegram/getMe"
      : "http://localhost:5000/telegram/getMe";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken: telegramToken }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.ok) {
        setBotData(data.result);
        toast({
          title: "Success",
          description: `Connected to Telegram bot: ${data.result.username}`,
        });
      } else {
        setError("Invalid token. Please check your Telegram Bot API token.");
        toast({
          title: "Invalid Token",
          description: "Please check your Telegram Bot API token.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to connect to Telegram. Check your network or token.");
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
          <Button onClick={validateTelegramToken} disabled={loading}>
            {loading ? "Loading..." : "Validate"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
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

      {loading && <p className="text-blue-500">Checking token...</p>}

      {botData && (
        <div className="mt-4 p-4 border rounded-md bg-dark-100">
          <h3 className="font-semibold">Bot Details</h3>
          <p>
            <strong>Name:</strong> {botData.first_name}
          </p>
          <p>
            <strong>Username:</strong> @{botData.username}
          </p>
          <p>
            <strong>Bot ID:</strong> {botData.id}
          </p>
        </div>
      )}
    </div>
  );
}
