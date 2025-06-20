# HabitForge Landing Page - Deployment Guide

## 🚀 Quick Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Add HabitForge landing page"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Deploy with default settings

## 📋 Pre-Deployment Checklist

### ✅ SEO Configuration

- [ ] Update domain in `app/layout.tsx` metadata
- [ ] Update URLs in `app/sitemap.ts`
- [ ] Update URLs in `app/robots.ts`
- [ ] Update URLs in `app/components/SchemaMarkup.tsx`

### ✅ App Store Links

- [ ] Replace placeholder links in download section
- [ ] Add actual App Store and Play Store URLs
- [ ] Test all download buttons

### ✅ Analytics Setup

- [ ] Verify Vercel Analytics is working
- [ ] Set up Google Analytics (optional)
- [ ] Configure conversion tracking

### ✅ Performance

- [ ] Run `npm run build` successfully
- [ ] Check Core Web Vitals
- [ ] Optimize images if needed
- [ ] Test on mobile devices

## 🔧 Environment Variables

Create `.env.local` for production:

```env
NEXT_PUBLIC_SITE_URL=https://habitforge.fr
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-repo/habitforge
```

## 📱 App Store Integration

Update the download section in `app/page.tsx`:

```tsx
// iOS App Store
<a href="https://apps.apple.com/app/your-app-id">
  Download for iOS
</a>

// Google Play Store
<a href="https://play.google.com/store/apps/details?id=your.app.id">
  Download for Android
</a>
```

## 🎯 Conversion Tracking

### Vercel Analytics

- Automatically tracks page views
- Monitors Core Web Vitals
- Provides real-time insights

### Custom Events (Optional)

Add to `app/page.tsx`:

```tsx
import { track } from "@vercel/analytics";

// Track download clicks
const handleDownload = (platform: string) => {
  track("download_clicked", { platform });
};
```

## 🔍 SEO Verification

After deployment, verify:

1. **Google Search Console**

   - Submit sitemap: `https://habitforge.fr/sitemap.xml`
   - Request indexing of main pages

2. **Social Media Testing**

   - Test Open Graph: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - Test Twitter Cards: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

3. **Schema Markup**
   - Test with [Google's Rich Results Test](https://search.google.com/test/rich-results)

## 📊 Performance Monitoring

### Vercel Dashboard

- Monitor Core Web Vitals
- Track user interactions
- Analyze performance trends

### Google PageSpeed Insights

- Run regular performance audits
- Monitor mobile and desktop scores
- Address any performance issues

## 🛠️ Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor for security vulnerabilities
- Update app screenshots when UI changes

### Content Updates

- Update statistics and metrics
- Refresh testimonials
- Add new features to showcase

## 🆘 Troubleshooting

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Performance Issues

- Optimize images with `next/image`
- Implement lazy loading
- Use code splitting effectively

### SEO Issues

- Verify meta tags are correct
- Check schema markup validity
- Ensure proper heading structure

## 📈 Post-Launch Checklist

- [ ] Verify all links work correctly
- [ ] Test on multiple devices and browsers
- [ ] Check analytics are tracking properly
- [ ] Monitor Core Web Vitals
- [ ] Set up error monitoring
- [ ] Create backup strategy
- [ ] Document any custom configurations

## 🎉 Success Metrics

Track these key performance indicators:

- **Page Load Speed**: < 3 seconds
- **Core Web Vitals**: All green
- **Conversion Rate**: Track download clicks
- **SEO Rankings**: Monitor keyword positions
- **User Engagement**: Time on page, scroll depth

---

**Need help?** Check the main README.md or open an issue on GitHub.
