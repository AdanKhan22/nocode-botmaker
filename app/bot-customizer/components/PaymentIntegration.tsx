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
import { toast } from "@/components/ui/use-toast";

export default function PaymentIntegration() {
  const [paymentProvider, setPaymentProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [currency, setCurrency] = useState("");

  const savePaymentSettings = () => {
    console.log("Saving payment settings:", {
      paymentProvider,
      apiKey,
      currency,
    });
    toast({
      title: "Payment Settings Saved",
      description:
        "Your payment integration settings have been saved successfully.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Integration</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Configure Payment Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="payment-provider">Payment Provider</Label>
            <Select value={paymentProvider} onValueChange={setPaymentProvider}>
              <SelectTrigger id="payment-provider">
                <SelectValue placeholder="Select a payment provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
            />
          </div>
          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select default currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={savePaymentSettings}>Save Payment Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
