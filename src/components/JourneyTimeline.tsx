import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Zap, TrendingUp, Crown } from "lucide-react";

const milestones = [
  {
    year: "2022",
    title: "Inception",
    description:
      "Founded with a mission to revolutionize supply chain management through AI-driven solutions. Our first algorithms were born.",
    icon: Rocket,
    color: "from-cyber-primary to-cyber-light",
  },
  {
    year: "2023",
    title: "Beta Launch",
    description:
      "Launched our beta platform with 25 pilot customers. Achieved 35% average cost reduction in logistics operations.",
    icon: Zap,
    color: "from-primary to-cyber-lightest",
  },
  {
    year: "2024",
    title: "Scale",
    description:
      "Expanded to serve 150+ enterprise clients globally. Processed over 10 million routing decisions daily.",
    icon: TrendingUp,
    color: "from-accent to-cyber-primary",
  },
  {
    year: "Today",
    title: "AI Dominance",
    description:
      "Industry-leading AI platform processing real-time global logistics. Partnered with top Fortune 500 companies.",
    icon: Crown,
    color: "from-accent to-primary",
  },
];

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From a bold idea to industry leadership — witness our evolution in
            transforming global logistics.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="glass p-6 rounded-2xl hover:border-primary/30 transition-colors duration-300">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${milestone.color} text-white mb-3`}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-background">
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
