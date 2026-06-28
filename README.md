# Kunwar Sadanand — Portfolio

Personal portfolio website showcasing my work as a Senior Software Engineer with 5+ years of experience building production-scale systems.

🔗 **Live:** [kunwar-portfolio.vercel.app](https://kunwar-portfolio.vercel.app)

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, responsive design
- **Vanilla JS** — Scroll reveals, canvas animations, 3D tilt effects
- **Google Fonts** — Inter, JetBrains Mono

## Project Structure

```
public/
├── css/
│   └── styles.css        # All styles
├── js/
│   └── main.js           # All interactivity
├── index.html            # Page markup
├── hero.mp4              # Hero background video
├── favicon.png
├── og-image.png
└── vercel.json           # Deployment config
```

## Run Locally

Just serve the `public/` directory with any static server:

```bash
# Using Python
python3 -m http.server 8000 --directory public

# Using Node
npx serve public
```

## Deploy

Hosted on [Vercel](https://vercel.com). Push to `main` to trigger auto-deploy.

```bash
bash deploy.sh
```

## License

© 2026 Kunwar Sadanand. All rights reserved.
