"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
];
const personalities = [
  "Friendly",
  "Professional",
  "Humorous",
  "Empathetic",
  "Concise",
];

export default function ConfigureSettings({ formData, updateFormData }) {
  const [name, setName] = useState(formData.name || "");
  const [language, setLanguage] = useState(formData.language || "");
  const [personality, setPersonality] = useState(formData.personality || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
    updateFormData({ name: e.target.value });
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    updateFormData({ language: value });
  };

  const handlePersonalityChange = (value) => {
    setPersonality(value);
    updateFormData({ personality: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Configure Bot Settings</h2>
      <div>
        <Label htmlFor="bot-name">Bot Name</Label>
        <Input
          id="bot-name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter bot name"
        />
      </div>
      <div>
        <Label htmlFor="bot-language">Primary Language</Label>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger id="bot-language">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="bot-personality">Bot Personality</Label>
        <Select value={personality} onValueChange={handlePersonalityChange}>
          <SelectTrigger id="bot-personality">
            <SelectValue placeholder="Select a personality" />
          </SelectTrigger>
          <SelectContent>
            {personalities.map((pers) => (
              <SelectItem key={pers} value={pers}>
                {pers}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
