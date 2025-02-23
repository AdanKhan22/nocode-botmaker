"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import BotProfile from "./components/BotProfile";
import CommandManager from "./components/CommandManager";
import InlineQueryConfig from "./components/InlineQueryConfig";
import KeyboardCustomizer from "./components/KeyboardCustomizer";
import WebhookSetup from "./components/WebhookSetup";
import PermissionManager from "./components/PermissionManager";
import PaymentIntegration from "./components/PaymentIntegration";
import AutoResponseConfig from "./components/AutoResponseConfig";
import AnalyticsAndLogs from "./components/AnalyticsAndLogs";
import LocalizationManager from "./components/LocalizationManager";
import SecuritySettings from "./components/SecuritySettings";

const menuItems = [
  { id: "profile", label: "Bot Profile" },
  { id: "commands", label: "Manage Commands" },
  { id: "inline", label: "Inline Queries" },
  { id: "keyboards", label: "Customize Keyboards" },
  { id: "webhooks", label: "Set Up Webhooks" },
  { id: "permissions", label: "Manage Permissions" },
  { id: "payments", label: "Handle Payments" },
  { id: "autoresponses", label: "Auto-Responses" },
  { id: "analytics", label: "Analytics and Logs" },
  { id: "localization", label: "Localization" },
  { id: "security", label: "Security Settings" },
];

export default function BotCustomizer() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <BotProfile />;
      case "commands":
        return <CommandManager />;
      case "inline":
        return <InlineQueryConfig />;
      case "keyboards":
        return <KeyboardCustomizer />;
      case "webhooks":
        return <WebhookSetup />;
      case "permissions":
        return <PermissionManager />;
      case "payments":
        return <PaymentIntegration />;
      case "autoresponses":
        return <AutoResponseConfig />;
      case "analytics":
        return <AnalyticsAndLogs />;
      case "localization":
        return <LocalizationManager />;
      case "security":
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-dark-100">
      <Sidebar
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
