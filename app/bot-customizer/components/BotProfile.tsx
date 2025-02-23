"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function BotProfile() {
  const [botName, setBotName] = useState("");
  const [botUsername, setBotUsername] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!botName || !botUsername) {
      toast({
        title: "Error",
        description: "Bot name and username are required.",
        variant: "destructive",
      });
      return;
    }

    const TELEGRAM_BOT_TOKEN = "";

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setMyName`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: botName }),
        }
      );

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setMyDescription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: botDescription }),
        }
      );

      toast({
        title: "Success",
        description: "Bot profile updated successfully on Telegram!",
      });
    } catch (error) {
      console.error("Error updating bot profile:", error);
      toast({
        title: "Error",
        description: "Failed to update bot profile on Telegram.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Set Up Bot Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="bot-name">Bot Name</Label>
          <Input
            id="bot-name"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter bot name"
          />
        </div>
        <div>
          <Label htmlFor="bot-username">Bot Username</Label>
          <Input
            id="bot-username"
            value={botUsername}
            onChange={(e) => setBotUsername(e.target.value)}
            placeholder="Enter bot username"
          />
        </div>
        <div>
          <Label htmlFor="bot-description">Bot Description</Label>
          <Textarea
            id="bot-description"
            value={botDescription}
            onChange={(e) => setBotDescription(e.target.value)}
            placeholder="Enter bot description"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="profile-picture">Profile Picture</Label>
          <Input
            id="profile-picture"
            type="file"
            onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
            accept="image/*"
          />
        </div>
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
}
