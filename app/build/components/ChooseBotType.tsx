"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, HelpCircle, ShoppingCart } from "lucide-react";

const botTypes = [
  {
    id: "chatbot",
    name: "Chatbot",
    icon: MessageSquare,
    description: "General purpose conversational bot",
  },
  {
    id: "support",
    name: "Support Bot",
    icon: HelpCircle,
    description: "Specialized in customer support",
  },
  {
    id: "ecommerce",
    name: "E-commerce Assistant",
    icon: ShoppingCart,
    description: "Helps with online shopping",
  },
];

export default function ChooseBotType({ formData, updateFormData }) {
  const [selectedType, setSelectedType] = useState(formData.botType || "");

  const handleSelect = (type) => {
    setSelectedType(type);
    updateFormData({ botType: type });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose Bot Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {botTypes.map((bot) => (
          <motion.div
            key={bot.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer ${
                selectedType === bot.id
                  ? "border-primary-500 bg-primary-50"
                  : ""
              }`}
              onClick={() => handleSelect(bot.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <bot.icon className="mr-2" />
                  {bot.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{bot.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
