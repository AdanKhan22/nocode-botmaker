"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface InlineQueryResult {
  id: string;
  title: string;
  description: string;
}

export default function InlineQueryConfig() {
  const [inlineMode, setInlineMode] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [results, setResults] = useState<InlineQueryResult[]>([]);
  const [newResult, setNewResult] = useState({ title: "", description: "" });

  const addResult = () => {
    if (newResult.title && newResult.description) {
      setResults([...results, { ...newResult, id: Date.now().toString() }]);
      setNewResult({ title: "", description: "" });
    }
  };

  const removeResult = (id: string) => {
    setResults(results.filter((result) => result.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configure Inline Queries</h2>
      <Card className="mb-4">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="inline-mode">Enable Inline Mode</Label>
            <Switch
              id="inline-mode"
              checked={inlineMode}
              onCheckedChange={setInlineMode}
            />
          </div>
          <div>
            <Label htmlFor="placeholder-text">Placeholder Text</Label>
            <Input
              id="placeholder-text"
              value={placeholderText}
              onChange={(e) => setPlaceholderText(e.target.value)}
              placeholder="Enter placeholder text for inline queries"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Define Inline Query Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="result-title">Result Title</Label>
              <Input
                id="result-title"
                value={newResult.title}
                onChange={(e) =>
                  setNewResult({ ...newResult, title: e.target.value })
                }
                placeholder="Enter result title"
              />
            </div>
            <div>
              <Label htmlFor="result-description">Result Description</Label>
              <Input
                id="result-description"
                value={newResult.description}
                onChange={(e) =>
                  setNewResult({ ...newResult, description: e.target.value })
                }
                placeholder="Enter result description"
              />
            </div>
            <Button onClick={addResult}>
              <Plus className="mr-2 h-4 w-4" /> Add Result
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">{result.title}</h3>
                <p className="text-sm text-gray-500">{result.description}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeResult(result.id)}
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
