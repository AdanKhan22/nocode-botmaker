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
import { Plus, Trash2 } from "lucide-react";

interface KeyboardButton {
  id: string;
  text: string;
  type: "url" | "command" | "callback";
  value: string;
}

export default function KeyboardCustomizer() {
  const [buttons, setButtons] = useState<KeyboardButton[]>([]);
  const [newButton, setNewButton] = useState<KeyboardButton>({
    id: "",
    text: "",
    type: "command",
    value: "",
  });

  const addButton = () => {
    if (newButton.text && newButton.value) {
      setButtons([...buttons, { ...newButton, id: Date.now().toString() }]);
      setNewButton({ id: "", text: "", type: "command", value: "" });
    }
  };

  const removeButton = (id: string) => {
    setButtons(buttons.filter((btn) => btn.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customize Keyboards</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Button</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={newButton.text}
                onChange={(e) =>
                  setNewButton({ ...newButton, text: e.target.value })
                }
                placeholder="Enter button text"
              />
            </div>
            <div>
              <Label htmlFor="button-type">Button Type</Label>
              <Select
                value={newButton.type}
                onValueChange={(value: "url" | "command" | "callback") =>
                  setNewButton({ ...newButton, type: value })
                }
              >
                <SelectTrigger id="button-type">
                  <SelectValue placeholder="Select button type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="command">Command</SelectItem>
                  <SelectItem value="callback">Callback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="button-value">Button Value</Label>
              <Input
                id="button-value"
                value={newButton.value}
                onChange={(e) =>
                  setNewButton({ ...newButton, value: e.target.value })
                }
                placeholder={`Enter ${
                  newButton.type === "url"
                    ? "URL"
                    : newButton.type === "command"
                    ? "command"
                    : "callback data"
                }`}
              />
            </div>
            <Button onClick={addButton}>
              <Plus className="mr-2 h-4 w-4" /> Add Button
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {buttons.map((button) => (
          <Card key={button.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">{button.text}</h3>
                <p className="text-sm text-gray-500">
                  Type: {button.type}, Value: {button.value}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeButton(button.id)}
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
