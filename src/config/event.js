export const eventConfig = {
  branding: {
    name: "Grab-'n-Go International",
    themeColorFrom: '#f7931d', // Grab n Go primary orange
    themeColorVia: '#773232',  // Grab n Go secondary dark red-brown
    themeColorTo: '#f7931d',
    logoUrl: '/logo.svg',
  },
  sections: {
    hero: {
      title: '/images/Grab n Go logo landscape t.png',
      subtitle: 'A World of Flavors Awaits You at El Campo!',
      date: 'OCTOBER 4TH, 2025',
      location: 'EL CAMPO NURSERY & RECREATIONAL PARK',
      backgroundGradients: [
        'linear-gradient(135deg, #f7931d 0%, #773232 50%, #f7931d 100%)',
        'linear-gradient(135deg, #773232 0%, #f7931d 50%, #773232 100%)',
        'linear-gradient(135deg, #f7931d 0%, #ffa733 50%, #773232 100%)',
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
        description: 'Spend 400 (100 min per stall) at 4 different stalls and get N$ 150 voucher to spend in the duty free shop.',
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
      email: 'info@surefirenamibia.com',
      phone: '+264 81 312 8945',
      socialHandle: '@GrabNGoInternational'
    }
  }
};