export const track = (name, props = {}) => {
  // TODO: wire to GA4/Meta Pixel/Supabase
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, props);
  }

  // In production, you would send this to your analytics service:
  // - Google Analytics 4
  // - Meta Pixel
  // - Custom analytics endpoint
  // - Supabase analytics table

  try {
    // Example: gtag('event', name, props);
    // Example: fbq('track', name, props);
    // Example: supabase analytics insert
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};