// Example code snippets for different languages
const examples = {
    javascript: `function calculateShippingCost(weight, distance, isPriority) {
  const baseRate = 5.99;
  const weightRate = 0.5;
  const distanceRate = 0.1;
  const priorityMultiplier = isPriority ? 1.5 : 1;
  
  if (weight <= 0 || distance <= 0) {
    throw new Error('Weight and distance must be positive numbers');
  }
  
  const cost = (baseRate + (weight * weightRate) + (distance * distanceRate)) * priorityMultiplier;
  return Math.round(cost * 100) / 100;
}

function validateOrder(order) {
  if (!order || typeof order !== 'object') {
    return { valid: false, errors: ['Invalid order object'] };
  }
  
  const errors = [];
  
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  }
  
  if (!order.customerId || typeof order.customerId !== 'string') {
    errors.push('Valid customer ID is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}`,
    python: `def process_user_data(users, min_age=18, active_only=True):
    """
    Process and filter user data based on criteria.
    """
    if not isinstance(users, list):
        raise TypeError("users must be a list")
    
    filtered_users = []
    
    for user in users:
        if not isinstance(user, dict):
            continue
            
        if active_only and not user.get('active', False):
            continue
            
        age = user.get('age', 0)
        if age < min_age:
            continue
            
        filtered_users.append({
            'id': user.get('id'),
            'name': user.get('name'),
            'email': user.get('email'),
            'age': age
        })
    
    return filtered_users

def calculate_discount(price, discount_percent, member_tier='basic'):
    """
    Calculate final price after applying discount and member benefits.
    """
    tier_multipliers = {
        'basic': 1.0,
        'silver': 1.05,
        'gold': 1.10,
        'platinum': 1.15
    }
    
    if price < 0:
        raise ValueError("Price cannot be negative")
    
    multiplier = tier_multipliers.get(member_tier, 1.0)
    discount = price * (discount_percent / 100) * multiplier
    
    return round(price - discount, 2)`,
    typescript: `interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUserData(userId: string): Promise<ApiResponse<User>> {
  if (!userId || userId.trim().length === 0) {
    throw new Error('User ID is required');
  }

  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
      message: 'Success'
    };
  } catch (error) {
    throw new Error(\`Failed to fetch user: \${error.message}\`);
  }
}

function hasPermission(user: User, requiredRole: User['role']): boolean {
  const roleHierarchy = { guest: 0, user: 1, admin: 2 };
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}`
};

let generatedDocumentation = '';

// Load example code
function loadExample() {
    const language = document.getElementById('languageSelect').value;
    document.getElementById('codeInput').value = examples[language] || examples.javascript;
}

// Clear input
function clearInput() {
    document.getElementById('codeInput').value = '';
    document.getElementById('output').innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">📚</div>
            <h3>Your documentation will appear here</h3>
            <p>Paste your code and click "Generate Documentation" to see the magic ✨</p>
        </div>
    `;
    document.getElementById('copyBtn').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
}

// Generate documentation
async function generateDocs() {
    const code = document.getElementById('codeInput').value.trim();
    const language = document.getElementById('languageSelect').value;
    const outputDiv = document.getElementById('output');
    const generateBtn = document.getElementById('generateBtn');
    
    if (!code) {
        alert('Please paste some code first!');
        return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<div class="loading"><div class="spinner"></div> Generating...</div>';
    outputDiv.innerHTML = `
        <div class="placeholder">
            <div class="spinner" style="width: 60px; height: 60px; border-width: 6px; border-color: var(--primary); border-top-color: transparent;"></div>
            <h3 style="margin-top: 2rem;">AI is analyzing your code...</h3>
            <p>This usually takes 5-10 seconds</p>
        </div>
    `;
    
    try {
        const response = await fetch('/api/generate-docs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, language })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.documentation) {
            generatedDocumentation = data.documentation;
            
            // Convert markdown to HTML
            const htmlContent = marked.parse(data.documentation);
            outputDiv.innerHTML = htmlContent;
            
            // Highlight code blocks
            outputDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // Show action buttons
            document.getElementById('copyBtn').style.display = 'inline-block';
            document.getElementById('downloadBtn').style.display = 'inline-block';
            
            // Scroll to output
            outputDiv.scrollTop = 0;
        } else {
            throw new Error('Invalid response from server');
        }
        
    } catch (error) {
        console.error('Error:', error);
        outputDiv.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon">❌</div>
                <h3>Oops! Something went wrong</h3>
                <p>${error.message}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
                    Please check your API key in the .env file and try again.
                </p>
            </div>
        `;
    } finally {
        // Reset button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '✨ Generate Documentation';
    }
}

// Copy to clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(generatedDocumentation);
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    } catch (error) {
        alert('Failed to copy to clipboard');
    }
}

// Download documentation
function downloadDocs() {
    const blob = new Blob([generatedDocumentation], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'api-documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Allow Enter key with Shift to generate
document.getElementById('codeInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        generateDocs();
    }
});

// Load example on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('📚 DocuGen AI ready!');
});
