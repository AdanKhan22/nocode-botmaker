"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AnalyticsAndLogs() {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data
  const analyticsData = {
    totalUsers: 1234,
    activeUsers: 567,
    messagesSent: 8901,
    commandsUsed: 2345,
  };

  const errorLogs = [
    { id: 1, timestamp: "2023-06-01 14:30:00", message: "API request failed" },
    {
      id: 2,
      timestamp: "2023-06-02 09:15:00",
      message: "Database connection error",
    },
    { id: 3, timestamp: "2023-06-03 18:45:00", message: "Invalid user input" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analytics and Logs</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Total Users</p>
              <p className="text-2xl">{analyticsData.totalUsers}</p>
            </div>
            <div>
              <p className="font-semibold">Active Users</p>
              <p className="text-2xl">{analyticsData.activeUsers}</p>
            </div>
            <div>
              <p className="font-semibold">Messages Sent</p>
              <p className="text-2xl">{analyticsData.messagesSent}</p>
            </div>
            <div>
              <p className="font-semibold">Commands Used</p>
              <p className="text-2xl">{analyticsData.commandsUsed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {errorLogs.map((log) => (
              <div key={log.id} className="bg-gray-100 p-2 rounded">
                <p className="text-sm text-gray-500">{log.timestamp}</p>
                <p>{log.message}</p>
              </div>
            ))}
          </div>
          <Button className="mt-4">View All Logs</Button>
        </CardContent>
      </Card>
    </div>
  );
}
