# LeanMultiverse

A modern, production-ready Next.js project built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Fonts**: Geist Sans & Geist Mono
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm

## ✨ Features

- 🎯 **TypeScript**: Full type safety and IntelliSense
- 🎨 **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- 🧩 **shadcn/ui**: Beautiful, accessible components built with Radix UI
- 📱 **Responsive Design**: Mobile-first approach with modern UI patterns
- 🌙 **Dark Mode**: Built-in dark mode support
- ⚡ **Performance**: Optimized with Next.js 15 features
- 🔧 **Developer Experience**: Hot reload, ESLint, and TypeScript compilation

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd codebase
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

## 📁 Project Structure

```
codebase/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles and Tailwind imports
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page component
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   └── lib/               # Utility functions
├── public/                # Static assets
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Available Components

The project includes these shadcn/ui components:

- **Button**: Various button variants and sizes
- **Card**: Content containers with header, content, and footer
- **Input**: Form input fields
- **Label**: Form labels with accessibility features
- **Form**: Form components with validation support

### Adding More Components

To add additional shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Colors and Theme

The project uses a custom color palette with Tailwind CSS. You can customize colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Adding New Pages

1. Create a new file in `src/app/` directory
2. Export a default React component
3. The route will be automatically available based on the file name

### Styling

- Use Tailwind CSS utility classes for styling
- Follow the existing design patterns and spacing
- Use the provided color palette for consistency

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The project can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) for the amazing framework
- [Tailwind CSS Team](https://tailwindcss.com) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Vercel](https://vercel.com) for the deployment platform

---

Built with ❤️ by the LeanMultiverse Team
