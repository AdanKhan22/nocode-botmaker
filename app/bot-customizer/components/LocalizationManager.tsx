"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface Translation {
  id: string;
  key: string;
  value: string;
}

export default function LocalizationManager() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [newTranslation, setNewTranslation] = useState({ key: "", value: "" });

  const addTranslation = () => {
    if (newTranslation.key && newTranslation.value) {
      setTranslations([
        ...translations,
        { ...newTranslation, id: Date.now().toString() },
      ]);
      setNewTranslation({ key: "", value: "" });
    }
  };

  const removeTranslation = (id: string) => {
    setTranslations(
      translations.filter((translation) => translation.id !== id)
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Localization Manager</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Manage Translations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language">Select Language</Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Choose a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="translation-key">Translation Key</Label>
            <Input
              id="translation-key"
              value={newTranslation.key}
              onChange={(e) =>
                setNewTranslation({ ...newTranslation, key: e.target.value })
              }
              placeholder="Enter translation key"
            />
          </div>
          <div>
            <Label htmlFor="translation-value">Translation Value</Label>
            <Textarea
              id="translation-value"
              value={newTranslation.value}
              onChange={(e) =>
                setNewTranslation({ ...newTranslation, value: e.target.value })
              }
              placeholder="Enter translation value"
              rows={3}
            />
          </div>
          <Button onClick={addTranslation}>
            <Plus className="mr-2 h-4 w-4" /> Add Translation
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {translations.map((translation) => (
          <Card key={translation.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">{translation.key}</h3>
                <p className="text-sm text-gray-500">{translation.value}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeTranslation(translation.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
