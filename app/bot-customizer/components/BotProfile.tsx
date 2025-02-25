"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const response = await fetch("/api/bot-config");

        if (!response.ok) {
          throw new Error("Failed to fetch bot configuration.");
        }

        const data = await response.json();

        setBotName(data.botProfile?.name || "");
        setBotUsername(data.botProfile?.username || "");
        setBotDescription(data.botProfile?.description || "");
      } catch (error) {
        console.error("Error fetching bot config:", error);
        toast({
          title: "Error",
          description: "Failed to load bot configuration.",
          variant: "destructive",
        });
      }
    };

    fetchBotConfig();
  }, []);

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

    const updatedConfig = {
      botProfile: {
        name: botName,
        username: botUsername,
        description: botDescription,
      },
    };

    try {
      const response = await fetch("api/bot-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedConfig),
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: "Success", description: "Bot profile updated!" });
      } else {
        throw new Error(result.error || "Failed to update bot config.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update bot config.",
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
