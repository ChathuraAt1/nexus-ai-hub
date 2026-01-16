import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const HexagonalGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Hexagon settings
    const hexSize = 40;
    const hexHeight = hexSize * Math.sqrt(3);
    const hexWidth = hexSize * 2;
    const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2;
    const rows = Math.ceil(canvas.height / hexHeight) + 2;

    interface Hexagon {
      x: number;
      y: number;
      opacity: number;
      targetOpacity: number;
      phase: number;
    }

    const hexagons: Hexagon[] = [];

    // Create hexagon grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth * 0.75;
        const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);
        hexagons.push({
          x,
          y,
          opacity: 0,
          targetOpacity: Math.random() * 0.15 + 0.02,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(127, 216, 220, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      hexagons.forEach((hex) => {
        // Pulsing effect
        const pulse = Math.sin(time * 0.5 + hex.phase) * 0.5 + 0.5;
        const opacity = hex.targetOpacity * pulse;
        drawHexagon(hex.x, hex.y, hexSize, opacity);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default HexagonalGrid;
