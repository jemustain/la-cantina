# 📚 DocuGen AI - API Documentation Generator

AI-powered tool that transforms your code into beautiful, comprehensive API documentation in seconds.

**Built for GHC 2025** 🚀

## ✨ Features

- 🤖 **AI-Powered**: Uses Google Gemini 1.5 Flash for intelligent documentation generation
- ⚡ **Instant Results**: Get comprehensive docs in 5-10 seconds
- 🎨 **Beautiful Output**: Professional Markdown formatting with syntax highlighting
- 💡 **Smart Examples**: Automatically generates working code examples
- 🌐 **Multi-Language**: Supports JavaScript, Python, TypeScript, Java, Go, Rust, C#
- 📋 **Easy Export**: Copy to clipboard or download as Markdown

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free API key at: https://aistudio.google.com/app/apikey

### 3. Run the Server

```bash
npm start
```

Open http://localhost:3000 in your browser!

## 🌐 Deploy to Vercel

### Option 1: Quick Deploy (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variable**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your_api_key`

5. **Redeploy** (after adding the env var):
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variable: `GEMINI_API_KEY`
6. Click "Deploy"

Done! Your app will be live at `your-project.vercel.app`

## 📦 Project Structure

```
la-cantina/
├── server.js           # Express server with Gemini API integration
├── public/
│   ├── index.html      # Main UI with before/after split view
│   ├── styles.css      # Beautiful, responsive styling
│   └── app.js          # Frontend logic and API calls
├── .env                # Environment variables (gitignored)
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## 🎯 How It Works

1. **User pastes code** into the "Before" panel
2. **Selects language** from dropdown
3. **Clicks "Generate Documentation"**
4. **AI analyzes** the code structure, functions, and logic
5. **Generates** comprehensive documentation with:
   - Function descriptions
   - Parameter details
   - Return values
   - Usage examples
   - Error handling
   - Best practices
6. **Displays** beautifully formatted docs in "After" panel

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **AI**: Google Gemini 1.5 Flash (Free tier: 15 RPM, 1M tokens/day)
- **Frontend**: Vanilla JavaScript
- **Styling**: Custom CSS with gradients and animations
- **Markdown**: Marked.js for rendering
- **Syntax Highlighting**: Highlight.js

## 💡 Demo Tips

1. Click "Load Example" to see pre-loaded code samples
2. Try different programming languages
3. Show the before/after transformation
4. Copy and download the generated docs
5. Explain how this saves hours of manual documentation

## 🎨 Customization Ideas for Team Members

### Parallel Work Opportunities:

1. **Additional Languages**: Add more language examples and parsing
2. **Export Formats**: Add PDF, HTML, or Notion export
3. **Templates**: Create different documentation styles (JSDoc, Sphinx, etc.)
4. **Code Analysis**: Add complexity metrics, performance tips
5. **Batch Processing**: Upload multiple files at once
6. **History**: Save and manage previous generations
7. **Collaboration**: Share docs with team members
8. **API Integration**: Connect to GitHub, GitLab for auto-docs

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |
| `PORT` | Server port (default: 3000) | No |

## 🆓 Free Tier Limits

Google Gemini Free Tier:
- ✅ 15 requests per minute
- ✅ 1 million tokens per day
- ✅ No credit card required
- ✅ Perfect for demos and prototypes

## 📄 License

ISC

## 🎉 Built for GHC 2025

This project demonstrates how AI can accelerate software development workflows and reduce repetitive tasks, allowing engineers to focus on innovation.

---

**Need help?** Check the console for detailed error messages or verify your API key is correctly set in `.env`
