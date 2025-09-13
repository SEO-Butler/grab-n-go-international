export const eventConfig = {
  branding: {
    name: "Grab-'n-Go International",
    themeColorFrom: '#ef4444',
    themeColorVia: '#f97316',
    themeColorTo: '#f59e0b',
    logoUrl: '/logo.svg',
  },
  sections: {
    hero: {
      title: 'GRAB \'N GO\nINTERNATIONAL',
      subtitle: 'A World of Flavors Awaits You at El Campo!',
      date: 'OCTOBER 4TH, 2025',
      location: 'EL CAMPO NURSERY & RECREATIONAL PARK',
      backgroundGradients: [
        'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
        'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)',
        'linear-gradient(135deg, #10b981 0%, #f59e0b 50%, #ef4444 100%)',
      ],
      ctaText: 'Get Your Ticket',
    },
    tickets: {
      plans: [
        {
          id: 'general',
          name: 'General Admission',
          advance: 120,
          gate: 150,
          features: [
            'Access to all food stalls',
            'Duty-free shopping',
            'Live music entertainment',
            'Event souvenir'
          ],
          popular: false,
        },
        {
          id: 'firstClass',
          name: 'First Class Experience',
          advance: 180,
          gate: 220,
          features: [
            'Early access & VIP lounge',
            'Priority tasting queue',
            'Exclusive merch pack',
            'Complimentary drinks',
            'Reserved seating area'
          ],
          popular: true,
        },
      ]
    },
    location: {
      title: 'Destination: El Campo',
      description: 'El Campo Nursery & Recreational Park',
      coords: { lat: -22.606416911592216, lng: 17.093449225894574 },
      eventTime: '11:00 AM',
      eventDate: 'October 4th, 2025',
      parkingInfo: 'Free parking available on-site'
    },
    highlights: [
      {
        icon: '✈️',
        title: 'Global Flavors',
        description: 'Explore 8 unique food destinations from around the world!',
        hoverText: 'From Sushi to Tacos!'
      },
      {
        icon: '🛍️',
        title: 'Duty-Free Shopping',
        description: 'Shop like a jetsetter at our exclusive market.',
        hoverText: 'Unique finds await!'
      },
      {
        icon: '🎵',
        title: 'Live Vibes',
        description: 'Groove to music that keeps the runway alive.',
        hoverText: 'Feel the rhythm!'
      },
      {
        icon: '🎁',
        title: 'Special Reward',
        description: 'Spend N$200+ at 4 different stalls & get a N$200 reward from the Duty Free Shop!',
        hoverText: 'Maximum savings!'
      },
    ],
    finalCta: {
      title: 'Don\'t Miss Your Flight!',
      subtitle: 'Limited seats available. Book your culinary adventure now!',
      button: 'BUY TICKETS NOW 🎫',
      features: [
        '⚡ Instant confirmation',
        '📱 Mobile tickets accepted'
      ],
      offer: '🔥 Early Bird Special: Save 20% - Limited Time!'
    },
    contact: {
      email: 'info@grabngointernational.com',
      phone: '+264 813128945',
      socialHandle: '@GrabNGoInternational'
    }
  }
};