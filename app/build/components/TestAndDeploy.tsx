"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function TestAndDeploy({ formData }) {
  const [testMessage, setTestMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setBotResponse(
      `This is a sample response from your ${formData.botType} bot named ${formData.name}. It's using a ${formData.personality} tone and responding in ${formData.language}.`
    );
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Test & Deploy Your Bot</h2>
      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Bot Type:</strong> {formData.botType}
          </p>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Language:</strong> {formData.language}
          </p>
          <p>
            <strong>Personality:</strong> {formData.personality}
          </p>
        </CardContent>
      </Card>
      <div>
        <Textarea
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          placeholder="Enter a test message for your bot"
          rows={4}
        />
      </div>
      <Button onClick={handleTest} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          "Test Bot"
        )}
      </Button>
      {botResponse && (
        <Card>
          <CardHeader>
            <CardTitle>Bot Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{botResponse}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
