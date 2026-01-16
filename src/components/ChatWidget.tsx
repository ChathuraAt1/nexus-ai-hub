import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-80 glass-dark rounded-2xl shadow-2xl overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-cyber-primary p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">HT-NEXUS Support</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-64 overflow-y-auto">
              <div className="glass p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm text-foreground">
                  👋 Welcome to HT-NEXUS AI Support! How can I help you optimize your supply chain today?
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="bg-background/50 text-sm" />
                <Button size="icon" className="bg-accent hover:bg-accent/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-accent to-cyber-primary text-white shadow-lg flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-accent/50 animate-ping opacity-30" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
