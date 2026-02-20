"use client";
import Link from "next/link";
import { SiteHeader } from "./components/site-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Footer } from "./components/Footer";
import Pricing from "./components/Pricing";
import {
  Zap,
  Command,
  Scale,
  Bot,
  Shield,
  Sparkles,
  Check,
} from "lucide-react";
import Chatbot from './ai/Chatbot';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="flex min-h-screen flex-col items-center justify-center space-y-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container flex flex-col items-center justify-center gap-6 text-center"
          >
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="#"
              className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
            >
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              Introducing BotForge
            </motion.a>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]"
            >
              Build Telegram Bots
              <br />
              Without Code
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
            >
              Create, deploy, and scale Telegram bots without writing a single
              line of code.
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
             <Link href="/bot-customizer">
                  <Button size="lg" className="h-12 px-8">
                            Start Building
                  </Button>
             </Link>
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <Separator className="my-12" />

        <section className="container mx-auto space-y-12 py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Features built for scale
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              BotForge provides all the tools you need to create powerful
              Telegram bots that can scale to millions of users.
            </p>
          </motion.div>
          <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  rotateX: index % 2 === 0 ? 5 : -5,
                  rotateY: index % 3 === 0 ? 5 : -5,
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        <section id="pricing" className="container mx-auto py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the plan that's right for you and start building amazing
              Telegram bots today.
            </p>
          </motion.div>

          <Pricing></Pricing>
        </section>

        <Separator className="my-12" />

        <section className="container mx-auto py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Ready to get started?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Create your first Telegram bot in minutes. No credit card
              required.
            </p>
            <Button size="lg" className="mt-4">
              Start Building Now
            </Button>
          </motion.div>
        </section>

        <section>
          <Chatbot />
        </section>
      </main>
      <Footer />
    </div>
  );
}

const features = [
  {
    name: "Easy Setup",
    description:
      "Get your bot up and running in minutes with our intuitive interface.",
    icon: Zap,
  },
  {
    name: "Powerful Commands",
    description: "Create complex commands with our visual command builder.",
    icon: Command,
  },
  {
    name: "Scale Infinitely",
    description: "Built to handle millions of users and messages.",
    icon: Scale,
  },
  {
    name: "AI-Powered",
    description:
      "Leverage artificial intelligence to create smarter responses.",
    icon: Bot,
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade security to protect your bot and users.",
    icon: Shield,
  },
  {
    name: "Custom Features",
    description: "Build custom features without touching any code.",
    icon: Sparkles,
  },
] as const;
