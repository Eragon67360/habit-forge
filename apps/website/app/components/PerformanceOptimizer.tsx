"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: "preload", href: "/home_screen.png", as: "image" },
      { rel: "preload", href: "/habits_screen.png", as: "image" },
      { rel: "preload", href: "/settings_screen.png", as: "image" },
    ];

    preloadLinks.forEach(({ rel, href, as }) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute("as", as);
      document.head.appendChild(link);
    });

    // Intersection Observer for lazy loading
    const observerOptions = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    }, observerOptions);

    // Observe all images with data-src
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => observer.observe(img));

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
