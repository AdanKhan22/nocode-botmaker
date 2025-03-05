import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Unlimited Bots",
      "Deploy Yourself",
      "Basic Commands",
      "Email Support",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: 20,
    features: [
      "3 Bots",
      "Unlimited Users",
      "Advanced Commands",
      "Priority Support",
    ],
    buttonText: "Choose Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited Bots",
      "Unlimited Users",
      "Custom Features",
      "Dedicated Support",
    ],
    buttonText: "Contact Us",
  },
] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 mx-12">
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-md"
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                <span className="ml-1 text-xl font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="mt-6 space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-8 w-full">{plan.buttonText}</Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
