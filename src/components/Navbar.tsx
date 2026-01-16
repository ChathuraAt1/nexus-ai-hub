import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#journey", label: "Journey" },
  { href: "#insights", label: "Insights" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-dark py-3 shadow-lg shadow-background/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <Cpu className="w-8 h-8 text-primary" />
            <Zap className="w-3 h-3 text-accent absolute -top-1 -right-1" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="text-primary">HT-NEXUS</span>
            <span className="text-accent ml-1">AI</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium relative group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            Login
          </Button>
          <Button className="bg-gradient-to-r from-accent to-cyber-primary text-accent-foreground font-semibold px-6 hover:opacity-90 transition-opacity">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-center">
                  Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-accent to-cyber-primary text-accent-foreground">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
