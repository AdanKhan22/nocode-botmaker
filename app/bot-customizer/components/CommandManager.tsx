"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Command {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function CommandManager() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [newCommand, setNewCommand] = useState({
    name: "",
    description: "",
    category: "",
  });

  const addCommand = () => {
    if (newCommand.name && newCommand.description) {
      setCommands([...commands, { ...newCommand, id: Date.now().toString() }]);
      setNewCommand({ name: "", description: "", category: "" });
    }
  };

  const removeCommand = (id: string) => {
    setCommands(commands.filter((cmd) => cmd.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Commands</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Command</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="command-name">Command Name</Label>
              <Input
                id="command-name"
                value={newCommand.name}
                onChange={(e) =>
                  setNewCommand({ ...newCommand, name: e.target.value })
                }
                placeholder="Enter command name"
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: /start, /help, /settings
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Command names should start with a forward slash (/) and contain
                only lowercase letters, numbers, and underscores.
              </p>
            </div>
            <div>
              <Label htmlFor="command-description">Description</Label>
              <Input
                id="command-description"
                value={newCommand.description}
                onChange={(e) =>
                  setNewCommand({ ...newCommand, description: e.target.value })
                }
                placeholder="Enter command description"
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: Start the bot, Display help menu, Adjust user settings
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Provide a clear and concise description of what the command
                does.
              </p>
            </div>
            <div>
              <Label htmlFor="command-category">Category</Label>
              <Input
                id="command-category"
                value={newCommand.category}
                onChange={(e) =>
                  setNewCommand({ ...newCommand, category: e.target.value })
                }
                placeholder="Enter command category"
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: General, Settings, Admin, Fun
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Categorize your commands to organize them better. Leave blank if
                not applicable.
              </p>
            </div>
            <Button onClick={addCommand}>
              <Plus className="mr-2 h-4 w-4" /> Add Command
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {commands.map((command) => (
          <Card key={command.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">{command.name}</h3>
                <p className="text-sm text-gray-500">{command.description}</p>
                <p className="text-xs text-gray-400">
                  Category: {command.category || "N/A"}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCommand(command.id)}
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
