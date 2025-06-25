"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download,
  Users,
  Target,
  BarChart3,
  Bell,
  Shield,
  Github,
  Mail,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Zap,
  Heart,
} from "lucide-react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useRef } from "react";
import { useMotionValue } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import { HTMLMotionProps } from "framer-motion";

function MagneticButton({
  children,
  ...props
}: { children: ReactNode } & HTMLMotionProps<"button">) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-400 text-white font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-600 focus:ring-offset-2"
      aria-label={typeof children === "string" ? children : "Action button"}
      {...props}
    >
      {children}
      <span className="absolute inset-0 rounded-full blur-xl opacity-40 bg-gradient-to-r from-fuchsia-400 to-cyan-300 -z-10" />
    </motion.button>
  );
}

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: Target,
      title: "Smart Habit Tracking",
      description:
        "Intelligent tracking that adapts to your lifestyle with AI-powered insights and personalized recommendations.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Beautiful visualizations and detailed progress reports to help you understand your patterns and growth.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Contextual reminders that appear at the perfect moment to help you stay on track with your goals.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data never leaves your device. End-to-end encryption ensures your personal information stays private.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const benefits = [
    "Track unlimited habits with detailed insights",
    "Beautiful, intuitive interface designed for focus",
    "Cross-platform sync across all your devices",
    "Advanced analytics and progress visualization",
    "Smart reminders and habit streak tracking",
    "Privacy-first with local data storage",
  ];

  const testimonials = [
    {
      quote:
        "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      context:
        "A reminder that it's never too late to start building better habits",
    },
    {
      quote:
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle",
      context:
        "The foundation of personal transformation through consistent action",
    },
    {
      quote:
        "Small changes, big results. Every habit you change is a step toward the person you want to become.",
      author: "HabitForge Philosophy",
      context: "Our core belief in the power of incremental progress",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-fuchsia-100 via-cyan-50 to-purple-100 dark:from-fuchsia-900 dark:via-cyan-900 dark:to-purple-900">
      {/* Animated gradient blobs background */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-fuchsia-400/30 to-cyan-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-4 sm:top-8 left-0 right-0 z-50 flex justify-center items-center">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl border border-white/50 dark:border-slate-700/50 max-w-fit">
          <Image
            src="/icon.png"
            alt="Logo"
            width={20}
            height={20}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-lg sm:rounded-xl flex-shrink-0"
          />
          <ul className="flex gap-2 sm:gap-3 md:gap-6 font-bold text-xs sm:text-sm md:text-lg">
            <li>
              <a
                href="#features"
                className="relative group text-slate-800 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 whitespace-nowrap"
              >
                Features
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </li>
            <li>
              <a
                href="#story"
                className="relative group text-slate-800 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 whitespace-nowrap"
              >
                Story
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </li>
            <li>
              <a
                href="#opensource"
                className="relative group text-slate-800 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 whitespace-nowrap"
              >
                Open Source
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center min-h-screen pt-32 pb-16 z-10"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-4">
          <div className="flex-1 space-y-8 max-w-7xl">
            <motion.h1
              id="hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-br from-fuchsia-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ letterSpacing: "-0.05em", opacity: 0, y: 60 }}
              animate={{ letterSpacing: "0.01em", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Break{" "}
              <motion.span
                className="inline-block"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                Bad Habits
              </motion.span>{" "}
              Forever
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Transform your life with{" "}
              <span className="font-bold">HabitForge</span>. Build better
              habits, break the bad ones, and become the person you want to be.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
              <MagneticButton>Download for Free</MagneticButton>
              <a
                href="#features"
                className="text-lg font-bold border-b-2 border-fuchsia-400 hover:border-cyan-400 transition-all duration-300 text-slate-700 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 text-center sm:text-left"
                aria-label="Watch demo of HabitForge features"
              >
                Watch Demo
              </a>
            </div>
          </div>
          <motion.div
            className="flex-1 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <Image
              src="/home_screen.png"
              alt="HabitForge app screenshot showing the main interface"
              width={350}
              height={700}
              className="rounded-3xl shadow-2xl border-4 border-fuchsia-200 dark:border-fuchsia-800 rotate-3 hover:rotate-0 transition-transform duration-500"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-fuchsia-50 to-cyan-50 dark:from-slate-800 dark:via-fuchsia-900/20 dark:to-cyan-900/20 overflow-hidden">
        {/* Floating elements background */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-fuchsia-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 rounded-full text-sm font-medium mb-6 border border-fuchsia-200 dark:border-fuchsia-700">
              <Heart className="w-4 h-4" />
              Inspiring Wisdom
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Words That{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Inspire
              </span>{" "}
              Change
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-fuchsia-200 dark:border-fuchsia-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>

                  <blockquote className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic font-medium text-center">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      — {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {testimonial.context}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-visible">
        {/* Animated diagonal background */}
        <motion.div
          className="absolute -top-32 left-0 w-full h-[120%] -z-10"
          initial={{ skewY: 8, scale: 1.1 }}
          animate={{ skewY: [8, 10, 8], scale: [1.1, 1.15, 1.1] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(120deg, #f0abfc 0%, #67e8f9 100%)",
            clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
            opacity: 0.18,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold text-center mb-20 bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent tracking-tight"
            initial={{ letterSpacing: "-0.05em", opacity: 0, y: 60 }}
            whileInView={{ letterSpacing: "0.01em", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            Features that{" "}
            <span className="border-b-4 border-fuchsia-400 pb-2">Empower</span>
          </motion.h2>

          <div className="relative w-full flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center">
            {/* Zigzag/overlapping cards */}
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className={`group relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-fuchsia-200 dark:border-fuchsia-700
                  px-8 py-12 w-full md:w-1/4
                  ${i % 2 === 0 ? "md:-mt-12" : "md:mt-12"}
                  hover:scale-105 hover:rotate-1 transition-transform duration-500
                  z-10`}
                initial={{ y: 80, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                style={{
                  boxShadow:
                    "0 8px 32px 0 rgba(240,171,252,0.15), 0 1.5px 8px 0 rgba(103,232,249,0.10)",
                }}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 mx-auto
                    bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-3 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
            {/* Animated SVG connectors (optional, for extra flair) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
            >
              <motion.path
                d="M 15% 30% Q 50% 10%, 85% 30%"
                stroke="#f0abfc"
                strokeWidth="4"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 15% 70% Q 50% 90%, 85% 70%"
                stroke="#67e8f9"
                strokeWidth="4"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-cyan-50 to-fuchsia-50 dark:from-slate-800 dark:via-cyan-900/20 dark:to-fuchsia-900/20 overflow-hidden">
        {/* Floating geometric shapes background */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-fuchsia-400/30 to-cyan-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Beautiful Design
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
              Beautiful &{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Intuitive
              </span>{" "}
              Interface
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience HabitForge&apos;s seamless interface designed to make
              habit tracking effortless and enjoyable.
            </p>
          </motion.div>

          <div className="relative">
            {/* 3D overlapping screenshots */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              <motion.div
                className="group relative"
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="relative transform perspective-1000">
                  <Image
                    src="/habits_screen.png"
                    alt="HabitForge Habits Tracking Screen"
                    width={280}
                    height={560}
                    className="rounded-3xl shadow-2xl border-4 border-fuchsia-200 dark:border-fuchsia-800 transform rotate-6 group-hover:rotate-0 transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/10 to-transparent rounded-3xl" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-lg border border-fuchsia-200 dark:border-fuchsia-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                    Smart Tracking
                  </h3>
                </div>
              </motion.div>

              <motion.div
                className="group relative md:mt-16"
                initial={{ opacity: 0, y: 100, rotateY: 0 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="relative transform perspective-1000">
                  <Image
                    src="/settings_screen.png"
                    alt="HabitForge Settings Screen"
                    width={280}
                    height={560}
                    className="rounded-3xl shadow-2xl border-4 border-cyan-200 dark:border-cyan-800 transform -rotate-3 group-hover:rotate-0 transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-3xl" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-lg border border-cyan-200 dark:border-cyan-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                    Personalization
                  </h3>
                </div>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="relative transform perspective-1000">
                  <Image
                    src="/password_screen.png"
                    alt="HabitForge Security Screen"
                    width={280}
                    height={560}
                    className="rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-800 transform rotate-6 group-hover:rotate-0 transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-3xl" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                    Privacy & Security
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
            >
              <motion.path
                d="M 25% 50% Q 50% 30%, 75% 50%"
                stroke="url(#screenshotGradient)"
                strokeWidth="3"
                strokeDasharray="10 5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient
                  id="screenshotGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f0abfc" />
                  <stop offset="50%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-32 overflow-hidden">
        {/* Diagonal background split */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-fuchsia-50 dark:from-slate-900 dark:to-fuchsia-900/20" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left side - Story content */}
            <motion.div
              className="space-y-8 lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                  Our{" "}
                  <span className="bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  We created HabitForge because we understand the struggle. Like
                  many of you, we&apos;ve battled with our own bad habits -
                  procrastination, unhealthy eating, and poor sleep patterns.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  After years of trying different methods, we realized that the
                  key to breaking bad habits isn&apos;t just willpower -
                  it&apos;s having the right tools, insights, and support
                  system.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xl font-semibold text-fuchsia-600 dark:text-fuchsia-400"
                >
                  That&apos;s why we built HabitForge. To give you the tools you
                  need to transform your life, one habit at a time.
                </motion.p>
              </div>
            </motion.div>

            {/* Right side - Benefits with animated connectors */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-fuchsia-200 dark:border-fuchsia-800 shadow-2xl">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                  Why Choose HabitForge?
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated SVG connectors */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
              >
                <motion.path
                  d="M 20% 20% Q 50% 10%, 80% 20%"
                  stroke="url(#storyGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M 20% 80% Q 50% 90%, 80% 80%"
                  stroke="url(#storyGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <defs>
                  <linearGradient
                    id="storyGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section
        id="opensource"
        className="relative py-32 bg-gradient-to-br from-slate-900 via-fuchsia-900 to-cyan-900 text-white overflow-hidden"
      >
        {/* Animated geometric background shapes */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 border-4 border-fuchsia-500/30 rotate-45"
            animate={{
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 border-4 border-cyan-500/30 -rotate-12"
            animate={{
              rotate: [-12, 348, -12],
              scale: [1, 0.8, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear",
              delay: 3,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-purple-500/40"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-500/20 text-fuchsia-200 rounded-full text-sm font-medium mb-6 border border-fuchsia-500/30">
              <Github className="w-4 h-4" />
              Open Source
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Open Source
              </span>{" "}
              & Community Driven
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We believe in transparency and community. That&apos;s why
              HabitForge is open source and free for everyone.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-500 hover:scale-105"
              variants={fadeInUp}
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Github className="w-16 h-16 text-fuchsia-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-white text-center">
                Open Source
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed text-center">
                Full source code available on GitHub. Contribute, fork, or learn
                from our implementation.
              </p>
              <a
                href="https://github.com/Eragon67360/habit-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 text-center group-hover:scale-105"
              >
                View on GitHub
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105"
              variants={fadeInUp}
              whileHover={{
                rotateY: -5,
                rotateX: 5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-white text-center">
                Community
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed text-center">
                Join our growing community of developers and users. Share ideas,
                report bugs, and contribute features.
              </p>
              <a
                href="#community"
                className="block w-full border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-2xl font-bold hover:bg-cyan-400 hover:text-white transition-all duration-300 text-center group-hover:scale-105"
              >
                Join Community
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105"
              variants={fadeInUp}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-white text-center">
                Free Forever
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed text-center">
                No hidden costs, no premium features. Everything is free and
                always will be.
              </p>
              <div className="text-5xl font-black bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent text-center group-hover:scale-110 transition-transform duration-300">
                $0
              </div>
            </motion.div>
          </motion.div>

          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12" />
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="relative py-32 bg-gradient-to-br from-slate-100 via-fuchsia-100 to-cyan-100 dark:from-slate-800 dark:via-fuchsia-900/30 dark:to-cyan-900/30 overflow-hidden"
      >
        {/* Morphing blob background */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-fuchsia-400/30 to-cyan-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 0.8, 1],
              x: [0, -40, 0],
              y: [0, 60, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "easeInOut",
              delay: 5,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 rounded-full text-sm font-medium mb-6 border border-fuchsia-200 dark:border-fuchsia-700">
                <Download className="w-4 h-4" />
                Get Started Today
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Start your journey to better habits today. Download HabitForge
                now and take the first step towards becoming the person you want
                to be.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-800 dark:text-white px-8 py-6 rounded-3xl border-2 border-fuchsia-200 dark:border-fuchsia-700 shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-500 flex items-center gap-4 w-full sm:w-auto justify-center">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-center">
                    <div className="text-lg font-bold">Available Soon</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      iOS
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              <motion.div
                className="group relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-800 dark:text-white px-8 py-6 rounded-3xl border-2 border-cyan-200 dark:border-cyan-700 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 flex items-center gap-4 w-full sm:w-auto justify-center">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-center">
                    <div className="text-lg font-bold">Available Soon</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Android
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-lg font-medium">
                Coming soon to App Store and Google Play
              </p>
            </motion.div>

            {/* Floating particles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-fuchsia-400/60 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i * 0.5,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-100 via-fuchsia-50 to-cyan-50 dark:from-slate-900 dark:via-fuchsia-900/20 dark:to-cyan-900/20 text-slate-900 dark:text-white py-20 overflow-hidden">
        {/* Animated gradient border */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-purple-500"
          animate={{
            background: [
              "linear-gradient(90deg, #f0abfc 0%, #67e8f9 50%, #a855f7 100%)",
              "linear-gradient(90deg, #a855f7 0%, #f0abfc 50%, #67e8f9 100%)",
              "linear-gradient(90deg, #67e8f9 0%, #a855f7 50%, #f0abfc 100%)",
              "linear-gradient(90deg, #f0abfc 0%, #67e8f9 50%, #a855f7 100%)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/icon.png"
                    alt="HabitForge Logo"
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                </motion.div>
                <span className="text-2xl font-black bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  HabitForge
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Transform your life by tracking and breaking bad habits with our
                intuitive app.
              </p>
            </motion.div>

            {/* Product links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-bold mb-6 text-xl text-slate-900 dark:text-white">
                Product
              </h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 font-medium"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 font-medium"
                  >
                    Download
                  </a>
                </li>
                <li>
                  <a
                    href="#story"
                    className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-300 font-medium"
                  >
                    About
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Community links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-bold mb-6 text-xl text-slate-900 dark:text-white">
                Community
              </h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="https://github.com/Eragon67360/habit-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 font-medium"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Connect section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-bold mb-6 text-xl text-slate-900 dark:text-white">
                Connect
              </h3>
              <div className="flex flex-col space-y-6">
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/Eragon67360/habit-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-fuchsia-600 hover:bg-fuchsia-100 dark:hover:text-fuchsia-400 dark:hover:bg-fuchsia-900/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="mailto:thomas-moser@orange.fr"
                    className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:bg-cyan-100 dark:hover:text-cyan-400 dark:hover:bg-cyan-900/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                </div>
                <div className="flex items-center">
                  <ThemeSwitcher />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            className="border-t border-slate-300 dark:border-slate-700 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              &copy; 2024 HabitForge. All rights reserved. Made with{" "}
              <motion.span
                className="inline-block text-fuchsia-600 dark:text-fuchsia-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                ❤️
              </motion.span>{" "}
              by{" "}
              <a
                href="https://www.linkedin.com/in/thomas-moser67"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300 transition-colors font-semibold"
              >
                Thomas Moser
              </a>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
