import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Route, Shield, BarChart3, Globe, Cpu, Truck } from "lucide-react";
import { useRef, MouseEvent } from "react";

const features = [
  {
    icon: Route,
    title: "Predictive Routing",
    description:
      "AI-powered route optimization that anticipates delays, weather impacts, and traffic patterns before they happen.",
    span: "col-span-1 md:col-span-2",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Auto-Compliance",
    description:
      "Automatic regulatory compliance checks across 150+ countries with real-time updates.",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Live dashboards with actionable insights, cost breakdowns, and performance metrics.",
    span: "col-span-1",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to 500+ carriers and logistics partners worldwide for seamless operations.",
    span: "col-span-1",
  },
  {
    icon: Cpu,
    title: "AI Decision Engine",
    description:
      "Machine learning models trained on billions of data points for intelligent automation.",
    span: "col-span-1 md:col-span-2",
    highlight: true,
  },
  {
    icon: Truck,
    title: "Fleet Management",
    description:
      "End-to-end visibility and control over your entire fleet with IoT integration.",
    span: "col-span-1",
  },
];

interface FeatureCardProps {
  feature: (typeof features)[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${feature.span} group relative`}
    >
      <div
        className={`h-full p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
          feature.highlight
            ? "glass border-primary/30 hover:border-primary/50"
            : "glass border-border/50 hover:border-primary/30"
        }`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              feature.highlight
                ? "bg-gradient-to-br from-accent to-cyber-primary"
                : "bg-primary/20"
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                feature.highlight ? "text-white" : "text-primary"
              }`}
            />
          </div>

          <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {feature.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Decorative corner */}
        {feature.highlight && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your supply chain into a
            competitive advantage.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
