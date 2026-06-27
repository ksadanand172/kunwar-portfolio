#!/bin/bash
set -e

echo ""
echo "▲ Kunwar Portfolio — Vercel Deploy"
echo "════════════════════════════════════"

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
  echo "📦 Installing Vercel CLI..."
  npm install -g vercel
fi

echo "✓ Vercel CLI ready"
echo ""
echo "🚀 Deploying..."
vercel --prod

echo ""
echo "✅ Done! Your portfolio is live."
