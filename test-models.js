require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('🔍 Testing Gemini API connection...\n');
    console.log(`API Key: ${process.env.GEMINI_API_KEY?.substring(0, 20)}...`);
    console.log('\nTrying different model names:\n');
    
    // Try ALL common model names
    const modelNames = [
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro',
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.0-pro-latest',
      'models/gemini-1.5-flash',
      'models/gemini-pro'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`Testing: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello in one word');
        const response = result.response.text();
        console.log(`✅ SUCCESS! ${modelName} works!`);
        console.log(`   Response: ${response}\n`);
        break; // Stop at first working model
      } catch (error) {
        console.log(`❌ Failed: ${error.message.substring(0, 100)}\n`);
      }
    }
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

listModels();
