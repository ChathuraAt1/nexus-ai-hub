import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started with AI logistics.",
    monthlyPrice: 299,
    annualPrice: 249,
    features: [
      "Up to 1,000 shipments/month",
      "Basic route optimization",
      "Email support",
      "Standard analytics dashboard",
      "2 user seats",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing companies that need advanced automation.",
    monthlyPrice: 799,
    annualPrice: 649,
    features: [
      "Up to 10,000 shipments/month",
      "Advanced predictive routing",
      "Priority support 24/7",
      "Real-time analytics & API access",
      "10 user seats",
      "Auto-compliance checks",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex supply chains.",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Unlimited shipments",
      "Full AI suite with custom models",
      "Dedicated success manager",
      "White-glove onboarding",
      "Unlimited user seats",
      "SLA guarantees",
      "On-premise deployment option",
      "Custom development",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm ${
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span
              className={`text-sm ${
                isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "glass border-2 border-primary/50"
                  : "glass border-border/50"
              }`}
            >
              {/* Popular badge with shine effect */}
              {plan.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent to-cyber-primary text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                  {/* Animated shine border */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-shine" />
                  </div>
                </>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground h-10">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                {plan.monthlyPrice ? (
                  <>
                    <span className="font-display text-5xl font-bold text-foreground">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually
                      </p>
                    )}
                  </>
                ) : (
                  <span className="font-display text-3xl font-bold text-foreground">
                    Custom Pricing
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-accent to-cyber-primary text-white hover:opacity-90"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
