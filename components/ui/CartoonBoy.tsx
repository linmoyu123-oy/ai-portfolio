"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CartoonBoy() {
  const [isClicked, setIsClicked] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / 80;
    const y = (e.clientY - centerY) / 80;
    setMouseOffset({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  };

  const eyeX = mouseOffset.x * 3;
  const eyeY = mouseOffset.y * 2;
  const headX = mouseOffset.x * 4;
  const headY = mouseOffset.y * 3;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="relative bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                点关于我，来了解我更多哦 👋
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isClicked ? { y: [0, -5, 0] } : {}}
      >
        <svg
          width="160"
          height="200"
          viewBox="0 0 160 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body - Suit */}
          <motion.g
            animate={isClicked ? { rotate: [0, -3, 3, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Legs */}
            <rect x="50" y="150" width="22" height="45" rx="4" fill="#1e293b" />
            <rect x="88" y="150" width="22" height="45" rx="4" fill="#1e293b" />
            {/* Shoes */}
            <ellipse cx="61" cy="195" rx="14" ry="5" fill="#0f172a" />
            <ellipse cx="99" cy="195" rx="14" ry="5" fill="#0f172a" />
          </motion.g>

          {/* Torso - Suit jacket */}
          <path
            d="M45 95 L80 110 L115 95 L115 155 L45 155 Z"
            fill="#1e293b"
          />
          {/* Shirt */}
          <path d="M65 95 L80 105 L95 95 L95 130 L65 130 Z" fill="#f8fafc" />
          {/* Tie */}
          <path d="M78 105 L82 105 L83 130 L80 135 L77 130 Z" fill="#dc2626" />

          {/* Left arm - pointing when clicked */}
          <motion.g
            animate={
              isClicked
                ? { rotate: [0, -45, -45, 0], x: [0, -10, -10, 0] }
                : { rotate: 0, x: 0 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "45px 100px" }}
          >
            <rect x="25" y="95" width="22" height="55" rx="8" fill="#1e293b" />
            {/* Hand */}
            <motion.g
              animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <circle cx="36" cy="155" r="10" fill="#fcd9b6" />
              {/* Pointing finger */}
              {isClicked && (
                <motion.rect
                  x="18"
                  y="152"
                  width="20"
                  height="6"
                  rx="3"
                  fill="#fcd9b6"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: -15 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
              )}
            </motion.g>
          </motion.g>

          {/* Right arm */}
          <motion.g
            animate={isClicked ? { rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "115px 100px" }}
          >
            <rect x="113" y="95" width="22" height="55" rx="8" fill="#1e293b" />
            <circle cx="124" cy="155" r="10" fill="#fcd9b6" />
          </motion.g>

          {/* Head - follows mouse */}
          <motion.g
            animate={{ x: headX, y: headY }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <circle cx="80" cy="60" r="35" fill="#fcd9b6" />

            {/* Hair */}
            <path
              d="M45 50 Q45 25 80 25 Q115 25 115 50 Q115 40 100 38 Q90 55 80 55 Q70 55 60 38 Q45 40 45 50"
              fill="#1e293b"
            />

            {/* Eyes - follow mouse */}
            <motion.g
              animate={
                isClicked
                  ? { scaleY: [1, 0.1, 1] }
                  : {}
              }
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {/* Eye whites */}
              <ellipse cx="68" cy="58" rx="6" ry="7" fill="white" />
              <ellipse cx="92" cy="58" rx="6" ry="7" fill="white" />
              {/* Pupils - follow mouse */}
              <circle
                cx={68 + eyeX}
                cy={58 + eyeY}
                r="3.5"
                fill="#1e293b"
              />
              <circle
                cx={92 + eyeX}
                cy={58 + eyeY}
                r="3.5"
                fill="#1e293b"
              />
              {/* Eye shine - follows mouse slightly */}
              <circle
                cx={70 + eyeX * 0.5}
                cy={56 + eyeY * 0.5}
                r="1.5"
                fill="white"
              />
              <circle
                cx={94 + eyeX * 0.5}
                cy={56 + eyeY * 0.5}
                r="1.5"
                fill="white"
              />
            </motion.g>

            {/* Eyebrows */}
            <motion.path
              d={isClicked ? "M60 48 Q68 44 76 48" : "M60 50 Q68 48 76 50"}
              stroke="#1e293b"
              strokeWidth="2"
              fill="none"
              animate={{ y: mouseOffset.y * 2 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
            <motion.path
              d={isClicked ? "M84 48 Q92 44 100 48" : "M84 50 Q92 48 100 50"}
              stroke="#1e293b"
              strokeWidth="2"
              fill="none"
              animate={{ y: mouseOffset.y * 2 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />

            {/* Mouth */}
            <motion.path
              d={isClicked ? "M70 72 Q80 82 90 72" : "M70 72 Q80 78 90 72"}
              stroke="#1e293b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{ y: mouseOffset.y * 1.5 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />

            {/* Blush */}
            <ellipse cx="58" cy="68" rx="6" ry="3" fill="#fda4af" opacity="0.5" />
            <ellipse cx="102" cy="68" rx="6" ry="3" fill="#fda4af" opacity="0.5" />
          </motion.g>
        </svg>
      </motion.div>

      <motion.p
        className="mt-2 text-sm text-zinc-500 dark:text-zinc-400"
        animate={isClicked ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 1, repeat: isClicked ? Infinity : 0 }}
      >
        {isClicked ? "👆 点上面的按钮" : "移动鼠标或点击我"}
      </motion.p>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-4"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              关于我 →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
