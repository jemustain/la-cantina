require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAPIKey() {
  console.log('🔑 Testing API Key with gemini-2.0-flash-exp...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ No API key found in .env file');
    return;
  }
  
  console.log(`API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log('\nAttempting API call...\n');
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    console.log('Sending test prompt...');
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ SUCCESS! gemini-2.0-flash-exp works!');
    console.log(`Response: ${text}\n`);
    
  } catch (error) {
    console.log('\n❌ ERROR:');
    console.log(error.message);
    console.log('\nTrying gemini-1.5-flash as fallback...\n');
    
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const result = await model.generateContent('Say hello in one word');
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ SUCCESS! gemini-1.5-flash works!');
      console.log(`Response: ${text}\n`);
    } catch (err) {
      console.log('❌ Fallback also failed:', err.message);
    }
  }
}

testAPIKey();
