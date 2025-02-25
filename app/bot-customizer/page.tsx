"use client";

import { useState, useEffect } from "react";
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
import {
  Bot,
  Command,
  Zap,
  Keyboard,
  Webhook,
  Shield,
  CreditCard,
  MessageSquare,
  BarChart2,
  Globe,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getDefaultBotConfiguration,
  type BotConfiguration,
} from "./config/deafultconfig";

const menuItems = [
  { id: "profile", label: "Bot Profile", icon: Bot },
  { id: "commands", label: "Manage Commands", icon: Command },
  { id: "inline", label: "Inline Queries", icon: Zap },
  { id: "keyboards", label: "Customize Keyboards", icon: Keyboard },
  { id: "webhooks", label: "Set Up Webhooks", icon: Webhook },
  { id: "permissions", label: "Manage Permissions", icon: Shield },
  { id: "payments", label: "Handle Payments", icon: CreditCard },
  { id: "autoresponses", label: "Auto-Responses", icon: MessageSquare },
  { id: "analytics", label: "Analytics and Logs", icon: BarChart2 },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "security", label: "Security Settings", icon: Lock },
];

export default function BotCustomizer() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [config, setConfig] = useState<BotConfiguration>(
    getDefaultBotConfiguration()
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateConfig = (section: keyof BotConfiguration, data: any) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [section]: data,
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <BotProfile
            config={config.botProfile}
            updateConfig={(data) => updateConfig("botProfile", data)}
          />
        );
      case "commands":
        return (
          <CommandManager
            config={config.commands}
            updateConfig={(data) => updateConfig("commands", data)}
          />
        );
      case "inline":
        return (
          <InlineQueryConfig
            config={config.inlineQueries}
            updateConfig={(data) => updateConfig("inlineQueries", data)}
          />
        );
      case "keyboards":
        return (
          <KeyboardCustomizer
            config={config.keyboard}
            updateConfig={(data) => updateConfig("keyboard", data)}
          />
        );
      case "webhooks":
        return (
          <WebhookSetup
            config={config.webhook}
            updateConfig={(data) => updateConfig("webhook", data)}
          />
        );
      case "permissions":
        return (
          <PermissionManager
            config={config.permissions}
            updateConfig={(data) => updateConfig("permissions", data)}
          />
        );
      case "payments":
        return (
          <PaymentIntegration
            config={config.payments}
            updateConfig={(data) => updateConfig("payments", data)}
          />
        );
      case "autoresponses":
        return (
          <AutoResponseConfig
            config={config.triggers}
            updateConfig={(data) => updateConfig("triggers", data)}
          />
        );
      case "analytics":
        return (
          <AnalyticsAndLogs
            config={config.analytics}
            updateConfig={(data) => updateConfig("analytics", data)}
          />
        );
      case "localization":
        return (
          <LocalizationManager
            config={config.localization}
            updateConfig={(data) => updateConfig("localization", data)}
          />
        );
      case "security":
        return (
          <SecuritySettings
            config={config.security}
            updateConfig={(data) => updateConfig("security", data)}
          />
        );
      default:
        return null;
    }
  };

  const downloadConfig = () => {
    const jsonConfig = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonConfig], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bot_config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <motion.div
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg"
      >
        <Sidebar
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={(section) => {
            setActiveSection(section);
            if (isMobile) setSidebarOpen(false);
          }}
        />
      </motion.div>
      <main
        className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Bot Customizer</h1>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden"
                >
                  {sidebarOpen ? "✕" : "☰"}
                </button>
              )}
            </div>
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
            <div className="mt-8">
              <Button onClick={downloadConfig}>
                Download Configuration (JSON)
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
