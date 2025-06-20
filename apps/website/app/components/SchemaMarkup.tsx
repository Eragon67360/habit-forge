export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "HabitForge",
    description:
      "Transform your life by tracking and breaking bad habits with our intuitive app. Join thousands of users on their journey to self-improvement.",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    author: {
      "@type": "Organization",
      name: "HabitForge Team",
    },
    publisher: {
      "@type": "Organization",
      name: "HabitForge Team",
    },
    url: "https://habitforge.app",
    downloadUrl: "https://habitforge.app/download",
    softwareVersion: "1.0.0",
    fileSize: "25MB",
    screenshot: [
      "https://habitforge.app/home_screen.png",
      "https://habitforge.app/habits_screen.png",
      "https://habitforge.app/settings_screen.png",
    ],
    featureList: [
      "Track unlimited habits",
      "Detailed analytics & insights",
      "Privacy-first design",
      "Cross-platform sync",
      "Smart reminders",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
