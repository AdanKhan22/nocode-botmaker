"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ steps, currentStep }) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
        <motion.div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
