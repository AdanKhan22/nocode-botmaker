"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface AutoResponse {
  id: string;
  trigger: string;
  response: string;
}

export default function AutoResponseConfig() {
  const [autoResponses, setAutoResponses] = useState<AutoResponse[]>([]);
  const [newResponse, setNewResponse] = useState({ trigger: "", response: "" });

  const addAutoResponse = () => {
    if (newResponse.trigger && newResponse.response) {
      setAutoResponses([
        ...autoResponses,
        { ...newResponse, id: Date.now().toString() },
      ]);
      setNewResponse({ trigger: "", response: "" });
    }
  };

  const removeAutoResponse = (id: string) => {
    setAutoResponses(autoResponses.filter((response) => response.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configure Auto-Responses</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Auto-Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="trigger">Trigger (Keyword or Phrase)</Label>
            <Input
              id="trigger"
              value={newResponse.trigger}
              onChange={(e) =>
                setNewResponse({ ...newResponse, trigger: e.target.value })
              }
              placeholder="Enter trigger keyword or phrase"
            />
          </div>
          <div>
            <Label htmlFor="response">Auto-Response</Label>
            <Textarea
              id="response"
              value={newResponse.response}
              onChange={(e) =>
                setNewResponse({ ...newResponse, response: e.target.value })
              }
              placeholder="Enter auto-response message"
              rows={4}
            />
          </div>
          <Button onClick={addAutoResponse}>
            <Plus className="mr-2 h-4 w-4" /> Add Auto-Response
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {autoResponses.map((response) => (
          <Card key={response.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">Trigger: {response.trigger}</h3>
                <p className="text-sm text-gray-500">
                  Response: {response.response}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeAutoResponse(response.id)}
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
