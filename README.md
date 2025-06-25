# HabitForge - Bad Habits Tracker

A comprehensive habit tracking application designed to help users build positive habits and break negative ones. Built with React Native and Expo for cross-platform mobile development.

## 🎯 Project Goal

HabitForge is a personal development app that empowers users to:

- **Track daily habits** with streak counting and progress visualization
- **Build good habits** like exercise, reading, meditation, and healthy eating
- **Break bad habits** like procrastination, excessive screen time, and unhealthy snacking
- **Stay motivated** with encouraging messages, daily quotes, and milestone celebrations
- **Monitor progress** with detailed analytics and habit insights

## 📱 Current Status

**Mobile App (Ready)** ✅

- Fully functional React Native app built with Expo
- Complete habit tracking system with check-ins and streaks
- Beautiful, modern UI with dark/light theme support
- Predefined habits for quick setup
- Daily motivational quotes
- Push notifications for reminders
- Local data persistence

**Web App (In Development)** 🚧

- Basic Next.js setup with react-native-web
- Currently just a placeholder page
- Planned to share the same habit tracking functionality

## 🏗️ Architecture

This is a monorepo built with Turborepo containing:

### Apps

- `bad-habits` (mobile): Complete React Native/Expo app
- `web` (web): Next.js app with react-native-web (placeholder)

### Packages

- `@repo/ui`: Shared UI components
- `@repo/typescript-config`: Shared TypeScript configurations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (for mobile development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bad-habits

# Install dependencies
npm install

# Start the mobile app
cd apps/bad-habits
npx expo start
```

### Mobile App Features

- **Habit Management**: Create, edit, and delete habits
- **Category Filtering**: Organize habits by exercise, health, productivity, etc.
- **Streak Tracking**: Visual progress indicators and milestone celebrations
- **Daily Check-ins**: Mark habits as completed with mood tracking
- **Motivational System**: Daily quotes and encouraging messages
- **Theme Support**: Light and dark mode
- **Notifications**: Reminders and milestone alerts

## 🛠️ Tech Stack

- **Mobile**: React Native, Expo, TypeScript
- **Web**: Next.js, react-native-web, TypeScript
- **State Management**: Zustand
- **UI**: Custom components with theme support
- **Navigation**: Expo Router
- **Build Tool**: Turborepo

## 📋 Roadmap

- [ ] Complete web app implementation
- [ ] Cloud sync and backup
- [ ] Social features and habit sharing
- [ ] Advanced analytics and insights
- [ ] Habit templates and challenges
- [ ] Integration with health apps

## 🤝 Contributing

This project is actively developed. Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

[Add your license here]
