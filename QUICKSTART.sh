#!/bin/bash

# AiSprint Platform - Quick Start Setup

echo "🚀 AiSprint Platform - Setting Up..."

# 1. Install dependencies (if needed)
echo "📦 Installing dependencies..."
cd apps/web
npm install

# 2. Environment variables
echo "⚙️  Setting up environment variables..."
cat >> ../../.env << 'EOF'

# Razorpay Configuration (Add your credentials)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_SECRET_KEY=your_secret_key_here
EOF

echo "✅ Environment variables configured"
echo "⚠️  Please update .env with your Razorpay credentials"

# 3. Database Setup
echo "🗄️  Database setup..."
echo "Run this SQL against your PostgreSQL database:"
echo "psql -U postgres -d your_database < apps/web/src/lib/schema.sql"

# 4. Start development server
echo "🎬 Starting development server..."
npm run dev

echo "✅ Setup complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env with Razorpay API keys (https://dashboard.razorpay.com)"
echo "2. Run database migrations (schema.sql)"
echo "3. Test authentication at http://localhost:3000/auth/signup"
echo "4. Test dashboard at http://localhost:3000/dashboard"
echo ""
echo "📚 Documentation:"
echo "- IMPLEMENTATION_GUIDE.md - Full feature documentation"
echo "- IMPLEMENTATION_COMPLETE.md - What was built"
echo ""
echo "🆘 Support:"
echo "Email: aisprintglobal@gmail.com"
