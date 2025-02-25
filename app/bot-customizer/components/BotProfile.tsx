"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function BotProfile({ config, updateConfig }) {
  const [botName, setBotName] = useState(config.name);
  const [botUsername, setBotUsername] = useState(config.username);
  const [botDescription, setBotDescription] = useState(config.description);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    setBotName(config.name);
    setBotUsername(config.username);
    setBotDescription(config.description);
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedConfig = {
      ...config,
      name: botName,
      username: botUsername,
      description: botDescription,
      profilePicture: profilePicture
        ? URL.createObjectURL(profilePicture)
        : config.profilePicture,
    };
    updateConfig(updatedConfig);
    toast({
      title: "Bot Profile Updated",
      description: "Your bot's profile has been successfully updated.",
    });
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
