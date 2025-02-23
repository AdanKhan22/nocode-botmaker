"use client";
import { Button } from "@/components/ui/button";

export default function Sidebar({
  menuItems,
  activeSection,
  setActiveSection,
}) {
  return (
    <nav className="w-64 bg-dark shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Bot Customizer</h1>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeSection === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
