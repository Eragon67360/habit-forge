"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download,
  Star,
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
  Sparkles,
  Heart,
  Play,
} from "lucide-react";
import ThemeSwitcher from "./components/ThemeSwitcher";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/icon.png"
                  alt="HabitForge Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                HabitForge
              </span>
            </motion.div>

            <motion.div
              className="hidden md:flex space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="#features"
                className="text-slate-600 hover:text-purple-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#story"
                className="text-slate-600 hover:text-purple-600 transition-colors font-medium"
              >
                Story
              </a>
              <a
                href="#opensource"
                className="text-slate-600 hover:text-purple-600 transition-colors font-medium"
              >
                Open Source
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="ml-auto md:ml-0"
            >
              <a
                href="#download"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <Download className="w-3 h-3" />
                Download
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Transform your life today
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                  Break Your{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Bad Habits
                  </span>{" "}
                  Forever
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Transform your life with HabitForge, our intuitive habit
                  tracking app. Build better habits, break the bad ones, and
                  become the person you want to be.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <a
                  href="#download"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#features"
                  className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </a>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pt-4"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full border-2 sm:border-3 border-white dark:border-slate-800 shadow-lg"
                      ></div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Join the journey
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      to better habits
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Free forever
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      no hidden costs
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  src="/home_screen.png"
                  alt="HabitForge App Home Screen"
                  width={350}
                  height={700}
                  className="mx-auto rounded-3xl shadow-2xl"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="text-center group"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <blockquote className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  — {testimonial.author}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonial.context}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              HabitForge combines cutting-edge technology with intuitive design
              to help you build lasting positive habits and break negative ones.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col h-full"
                variants={fadeInUp}
              >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 flex flex-col h-full">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Beautiful Design
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Beautiful &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Intuitive
              </span>{" "}
              Interface
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience HabitForge&apos;s seamless interface designed to make
              habit tracking effortless and enjoyable.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center group">
              <div className="relative mb-8">
                <Image
                  src="/habits_screen.png"
                  alt="HabitForge Habits Tracking Screen"
                  width={280}
                  height={560}
                  className="mx-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-3xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Smart Tracking
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor your daily progress with beautiful visualizations and
                intelligent insights
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <div className="relative mb-8">
                <Image
                  src="/settings_screen.png"
                  alt="HabitForge Settings Screen"
                  width={280}
                  height={560}
                  className="mx-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Personalization
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Customize your experience with flexible settings and preferences
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <div className="relative mb-8">
                <Image
                  src="/password_screen.png"
                  alt="HabitForge Security Screen"
                  width={280}
                  height={560}
                  className="mx-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent rounded-3xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Privacy & Security
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Your data is protected with industry-leading security and
                encryption
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8">
                  Our{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  We created HabitForge because we understand the struggle. Like
                  many of you, we&apos;ve battled with our own bad habits -
                  procrastination, unhealthy eating, and poor sleep patterns.
                </p>
                <p>
                  After years of trying different methods, we realized that the
                  key to breaking bad habits isn&apos;t just willpower -
                  it&apos;s having the right tools, insights, and support
                  system.
                </p>
                <p>
                  That&apos;s why we built HabitForge. To give you the tools you
                  need to transform your life, one habit at a time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 sm:p-6 lg:p-8 rounded-3xl border border-purple-200 dark:border-purple-800 max-w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                  Why Choose HabitForge?
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section
        id="opensource"
        className="py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 text-slate-900 dark:text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium mb-6">
              <Github className="w-4 h-4" />
              Open Source
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Open Source
              </span>{" "}
              & Community Driven
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
              className="text-center p-8 bg-white/80 dark:bg-white/5 rounded-3xl backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none"
              variants={fadeInUp}
            >
              <Github className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Open Source
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Full source code available on GitHub. Contribute, fork, or learn
                from our implementation.
              </p>
              <a
                href="https://github.com/Eragon67360/habit-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
              >
                View on GitHub
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/80 dark:bg-white/5 rounded-3xl backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none"
              variants={fadeInUp}
            >
              <Users className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Community
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Join our growing community of developers and users. Share ideas,
                report bugs, and contribute features.
              </p>
              <a
                href="#community"
                className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                Join Community
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/80 dark:bg-white/5 rounded-3xl backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none"
              variants={fadeInUp}
            >
              <Zap className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Free Forever
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                No hidden costs, no premium features. Everything is free and
                always will be.
              </p>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                $0
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-24 bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 dark:from-purple-600 dark:via-blue-600 dark:to-purple-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-white/20 text-purple-700 dark:text-white rounded-full text-sm font-medium mb-6">
                <Download className="w-4 h-4" />
                Get Started Today
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-slate-600 dark:text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Start your journey to better habits today. Download HabitForge
                now and take the first step towards becoming the person you want
                to be.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold border border-slate-200 dark:border-white/20 flex items-center gap-3 w-full sm:w-auto justify-center shadow-lg dark:shadow-none">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                Available Soon
                <span className="text-sm opacity-80">iOS</span>
              </div>
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold border border-slate-200 dark:border-white/20 flex items-center gap-3 w-full sm:w-auto justify-center shadow-lg dark:shadow-none">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                Available Soon
                <span className="text-sm opacity-80">Android</span>
              </div>
            </div>

            <div className="text-slate-600 dark:text-purple-100">
              <p className="text-sm">
                Coming soon to App Store and Google Play
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center">
                  <Image
                    src="/icon.png"
                    alt="HabitForge Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  HabitForge
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Transform your life by tracking and breaking bad habits with our
                intuitive app.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg text-slate-900 dark:text-white">
                Product
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Download
                  </a>
                </li>
                <li>
                  <a
                    href="#story"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg text-slate-900 dark:text-white">
                Community
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="https://github.com/Eragon67360/habit-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg text-slate-900 dark:text-white">
                Connect
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Eragon67360/habit-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:thomas-moser@orange.fr"
                    className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-300 dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400">
            <p>
              &copy; 2024 HabitForge. All rights reserved. Made with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/thomas-moser67"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                Thomas Moser
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
