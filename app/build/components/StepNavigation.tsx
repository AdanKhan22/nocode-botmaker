"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function StepNavigation({ steps, currentStep, setCurrentStep }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t md:hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">Navigation</span>
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="p-4 space-y-2">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                index === currentStep
                  ? "text-primary-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => {
                setCurrentStep(index);
                setIsOpen(false);
              }}
            >
              {step}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
