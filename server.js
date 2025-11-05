require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Initialize Gemini AI with v1beta API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint to generate documentation
app.post('/api/generate-docs', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Use gemini-2.0-flash which works with v1beta API
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp"
    });
    
    const prompt = `You are an expert technical writer. Generate comprehensive API documentation for the following ${language || 'code'}:

\`\`\`${language || 'javascript'}
${code}
\`\`\`

Generate documentation in Markdown format with the following sections:

# API Documentation

## Overview
[Brief description of what this code does]

## Functions/Methods

### [Function Name]
**Description:** [What it does]

**Parameters:**
- \`paramName\` (type): description
- \`paramName2\` (type): description

**Returns:** 
- (type): description

**Example:**
\`\`\`${language || 'javascript'}
[Usage example]
\`\`\`

**Throws:**
- \`ErrorType\`: when [condition]

[Repeat for each function/method]

## Usage Examples

\`\`\`${language || 'javascript'}
[Complete working examples]
\`\`\`

## Notes
[Any important implementation details, edge cases, or best practices]

Keep it professional, clear, and developer-friendly. Include real, working code examples.`;

    const result = await model.generateContent(prompt);
    const documentation = result.response.text();
    
    res.json({ 
      documentation,
      success: true 
    });

  } catch (error) {
    console.error('Error generating documentation:', error);
    res.status(500).json({ 
      error: 'Failed to generate documentation',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation Generator ready!`);
});
