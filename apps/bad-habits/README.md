# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- Track good and bad habits
- Daily check-ins and streak tracking
- Milestone achievements
- Dark/light theme support
- **AI-powered daily inspirational quotes** (NEW!)

## AI Quote Feature Setup

The app now includes AI-powered daily inspirational quotes that update once per day to save on API tokens.

### Setup Instructions

1. **Get an AI API Key**: 
   - Sign up for [OpenAI](https://platform.openai.com/) (recommended)
   - Or use [Anthropic Claude](https://console.anthropic.com/)
   - Or use [Google Gemini](https://makersuite.google.com/app/apikey)

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Alternative APIs**: 
   If you prefer a different AI service, edit `services/QuoteService.ts` and update the `AI_API_ENDPOINT` and API call format.

### How It Works

- **Smart Caching**: Quotes are cached for the entire day to avoid excessive API calls
- **Fallback System**: If the AI API fails, the app uses curated fallback quotes
- **Daily Updates**: New quotes are fetched automatically each day
- **Token Efficient**: Only makes API calls when needed (once per day)

### Customization

You can customize the quote prompts by editing the `prompt` variable in `services/QuoteService.ts`. The current prompt focuses on personal growth, habits, and motivation.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Environment Variables

- `EXPO_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key for AI quotes
