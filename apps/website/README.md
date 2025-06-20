# HabitForge - Landing Page

A modern, responsive landing page for the HabitForge tracking app built with Next.js 15, TypeScript, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with the app's signature purple color scheme (#A076F9)
- **Responsive**: Mobile-first approach with breakpoints for all devices
- **Animations**: Smooth scroll animations and micro-interactions using Framer Motion
- **SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, and schema markup
- **Performance**: Optimized images, lazy loading, and Core Web Vitals optimization
- **Analytics**: Vercel Analytics and Speed Insights integration
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/habitforge.git
   cd habitforge/apps/website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
apps/website/
├── app/
│   ├── components/
│   │   └── SchemaMarkup.tsx    # SEO schema markup
│   ├── globals.css             # Global styles and Tailwind config
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main landing page
│   ├── robots.ts               # Robots.txt configuration
│   └── sitemap.ts              # Sitemap generation
├── public/
│   ├── home_screen.png         # App screenshots
│   ├── habits_screen.png
│   ├── settings_screen.png
│   ├── password_screen.png
│   └── manifest.json           # PWA manifest
└── package.json
```

## 🎨 Design System

### Colors

- **Primary**: #A076F9 (Purple)
- **Primary Dark**: #8B5CF6
- **Primary Light**: #C4B5FD
- **Background**: #ffffff (Light) / #0f172a (Dark)
- **Text**: #0f172a (Light) / #f8fafc (Dark)

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with optimal line height

### Components

- **Glass Effect**: Translucent backgrounds with blur
- **Gradient Text**: Purple gradient text effects
- **Animated Cards**: Hover effects with smooth transitions
- **Sticky Navigation**: Fixed header with glass effect

## 📱 Sections

1. **Hero Section**: Compelling headline with app preview and CTAs
2. **Stats Section**: Key metrics and social proof
3. **Features Section**: Interactive feature cards with icons
4. **App Screenshots**: Visual showcase of the app interface
5. **Story Section**: Emotional narrative about the app's creation
6. **Open Source Section**: Community and transparency information
7. **Download Section**: Final CTA with app store links
8. **Footer**: Links, social media, and additional information

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for production settings:

```env
NEXT_PUBLIC_SITE_URL=https://habitforge.app
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### SEO Configuration

Update the following files for your domain:

- `app/layout.tsx` - Update metadata URLs
- `app/sitemap.ts` - Update sitemap URLs
- `app/robots.ts` - Update robots.txt URLs
- `app/components/SchemaMarkup.tsx` - Update schema URLs

### App Store Links

Update the download section in `app/page.tsx` with your actual app store URLs:

```tsx
<a href="https://apps.apple.com/app/your-app-id">Download for iOS</a>
<a href="https://play.google.com/store/apps/details?id=your.app.id">Download for Android</a>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Analytics & Performance

### Vercel Analytics

- Automatically tracks page views and user interactions
- Provides real-time performance metrics
- Integrates with Core Web Vitals

### Performance Optimization

- **Images**: Optimized with Next.js Image component
- **Fonts**: Optimized with Google Fonts
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Static generation for optimal performance

## 🔍 SEO Features

- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Schema Markup**: Rich snippets for app store listings
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling configuration
- **Structured Data**: App-specific schema markup

## 🎯 Conversion Optimization

- **Multiple CTAs**: Strategic placement throughout the page
- **Social Proof**: User counts, ratings, and testimonials
- **Clear Value Proposition**: Benefits-focused messaging
- **Trust Signals**: Open source, privacy-first, free forever

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Eragon67360/habit-forge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Eragon67360/habit-forge/discussions)
- **Email**: support@habitforge.app

---

Made with ❤️ by the HabitForge community
