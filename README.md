# Grab 'n Go International 🌍✈️

A stunning, interactive landing page for the **Grab 'n Go International** culinary event. Experience a world of flavors in one destination with this beautifully animated, accessible, and fully responsive React application.

![Grab 'n Go International](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80)

## 🚀 Live Demo

**[View Live Demo →](https://grab-n-go-international.vercel.app)** *(Coming Soon)*

## ✨ Features

- **🎨 Stunning Animations** - Powered by Framer Motion for smooth, engaging interactions
- **📱 Fully Responsive** - Perfect experience across all devices and screen sizes
- **♿ Accessibility First** - WCAG compliant with keyboard navigation and screen reader support
- **🎫 Interactive Booking** - Complete ticket booking system with form validation
- **🗺️ Maps Integration** - Google Maps integration for location and directions
- **📊 Analytics Ready** - Built-in event tracking for all user interactions
- **⚙️ Configurable** - Easy to customize for different events via configuration file
- **🏗️ Production Ready** - Optimized build with comprehensive error handling

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: React Icons
- **Routing**: React Router Dom
- **Language**: JavaScript (TypeScript ready)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/grab-n-go-international.git

# Navigate to project directory
cd grab-n-go-international

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run linting with error-only output
npm run lint:error
```

## 🎯 Event Configuration

All event details can be customized via `src/config/event.js`:

```javascript
export const eventConfig = {
  branding: {
    name: "Grab-'n-Go International",
    themeColorFrom: '#ef4444',
    themeColorVia: '#f97316',
    themeColorTo: '#f59e0b'
  },
  sections: {
    hero: {
      title: 'GRAB \'N GO\nINTERNATIONAL',
      subtitle: 'A World of Flavors Awaits You!',
      date: 'OCTOBER 4TH, 2025',
      location: 'EL CAMPO NURSERY & RECREATIONAL PARK'
    },
    tickets: {
      plans: [
        {
          id: 'general',
          name: 'General Admission',
          advance: 120,
          gate: 150,
          features: ['Access to all food stalls', 'Duty-free shopping', ...]
        }
      ]
    }
  }
}
```

## 🎨 Key Components

- **`HeroSection`** - Animated hero with background gradients and call-to-action
- **`EventHighlights`** - Interactive card grid with flip animations
- **`TicketSection`** - Dynamic pricing display with booking integration
- **`TicketBookingForm`** - Complete booking form with validation
- **`LocationSection`** - Maps integration with directions
- **`Header`** - Accessible navigation with mobile support

## 📊 Analytics Integration

The application includes comprehensive analytics tracking:

```javascript
// Tracked events include:
- hero_cta_click
- menu_click
- open_booking
- submit_booking_success
- maps_click
- final_cta_click
```

To enable analytics, configure `src/lib/analytics.js` with your preferred service (GA4, Meta Pixel, etc.).

## 🚀 Deployment

### Vercel (Recommended)

1. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

2. **Deploy**:
   ```bash
   # Via Vercel CLI
   npx vercel --prod

   # Or connect your GitHub repository to Vercel dashboard
   ```

### Other Platforms

The application is compatible with:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🔒 Environment Variables

For production deployment, consider adding:

```env
VITE_ANALYTICS_ID=your-analytics-id
VITE_FORM_ENDPOINT=your-form-endpoint-url
VITE_MAPS_API_KEY=your-google-maps-api-key
```

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📁 Project Structure

```
src/
├── components/          # React components
├── config/             # Event configuration
├── utils/              # Utility functions
├── lib/                # Third-party integrations
└── common/             # Shared components
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern event landing pages
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Images from [Unsplash](https://unsplash.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

## 📞 Support

For questions or support, please contact:
- Email: info@grabngointernational.com
- Phone: +264 813128945

---

<div align="center">
Made with ❤️ for food lovers worldwide
</div>

## Git Push Workflow

1. Run `git status` to review pending changes and confirm only the expected files are modified.
2. Stage files with `git add <paths>`, keeping commits focused; use `git add .` only if every change belongs together.
3. Commit with a short imperative summary using `git commit -m "Describe the change"`, or open the editor via `git commit` for a detailed body.
4. Sync with remote updates using `git pull --rebase origin <branch>` so your work sits atop the latest commits.
5. Push the branch upstream with `git push origin <branch>`; for new branches run `git push -u origin <branch>` once to set the tracking reference.
6. Verify the push on GitHub, open or update the pull request, and ensure any CI checks pass before requesting review.

