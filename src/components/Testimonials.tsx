import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "HT-NEXUS AI transformed our logistics operations. We've seen a 42% reduction in shipping costs and our delivery times improved by 35%.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "Global Retail Corp",
    avatar: "SC",
  },
  {
    quote:
      "The predictive routing feature alone saved us millions. The AI anticipates delays before they happen, allowing us to proactively reroute shipments.",
    author: "Marcus Johnson",
    role: "Supply Chain Director",
    company: "TechFlow Industries",
    avatar: "MJ",
  },
  {
    quote:
      "Implementation was seamless and the ROI was visible within the first quarter. The platform's intelligence grows smarter every day.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "FastShip Logistics",
    avatar: "ER",
  },
  {
    quote:
      "We've automated 80% of our compliance checks. What used to take days now happens in seconds with complete accuracy.",
    author: "David Park",
    role: "Compliance Manager",
    company: "Continental Freight",
    avatar: "DP",
  },
  {
    quote:
      "The real-time analytics dashboard gives us visibility we never had before. Decision-making is now data-driven and instantaneous.",
    author: "Amanda Foster",
    role: "Head of Analytics",
    company: "Summit Distribution",
    avatar: "AF",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - visibleCount + 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - visibleCount : prev - 1
    );
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of companies that have transformed their supply chain
            with HT-NEXUS AI.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden mx-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                >
                  <div className="h-full glass p-8 rounded-2xl border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <Quote className="w-10 h-10 text-primary/30 mb-4" />

                    <p className="text-foreground/90 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-primary/30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-primary/30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: testimonials.length - visibleCount + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
