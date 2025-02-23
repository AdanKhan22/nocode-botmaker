"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SiteHeader } from "../../app/components/site-header";
import { Footer } from "../../app/components/Footer";
import ProgressBar from "./components/ProgressBar";
import StepNavigation from "./components/StepNavigation";
import ChooseBotType from "./components/ChooseBotType";
import ConfigureSettings from "./components/ConfigureSettings";
import ConnectAPIs from "./components/ConnectAPIs";
import TestAndDeploy from "./components/TestAndDeploy";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const steps = [
  "Choose Bot Type",
  "Configure Settings",
  "Connect APIs",
  "Test & Deploy",
];

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    botType: "",
    name: "",
    personality: "",
    language: "",
    openaiKey: "",
    langchainKey: "",
    customWebhook: "",
  });
  const router = useRouter();

  useEffect(() => {
    const savedProgress = localStorage.getItem("botCreationProgress");
    if (savedProgress) {
      const { step, data } = JSON.parse(savedProgress);
      setCurrentStep(step);
      setFormData(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "botCreationProgress",
      JSON.stringify({ step: currentStep, data: formData })
    );
  }, [currentStep, formData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting bot configuration:", formData);
    toast({
      title: "Bot Created Successfully!",
      description: "Your AI-powered bot has been created and deployed.",
    });
    router.push("/dashboard");
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-8">
            Create Your AI-Powered Bot
          </h1>
          <ProgressBar steps={steps} currentStep={currentStep} />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <ChooseBotType
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 1 && (
                  <ConfigureSettings
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 2 && (
                  <ConnectAPIs
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 3 && (
                  <TestAndDeploy
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-between">
            <Button onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Create Bot</Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
