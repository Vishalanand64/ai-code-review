import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeReview() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyD52y3FHKYs9VXgA7Z4PFzE1YHosQMANgw');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `AI System Instruction: Senior Code Reviewer (7+ Years of Experience)...

      Please structure your response with clear headings and sections:

      # Code Analysis
      [Your analysis of the code structure and patterns]

      # Issues Found
      [List of identified issues]

      # Recommended Fixes
      [Code examples and explanations]

      # Improvements Suggested
      [List of potential improvements]

      # Best Practices
      [Relevant best practices to follow]

      Use bullet points (•) for lists and appropriate emojis (❌, ✔, 💡) for different types of feedback.
      Include code examples in markdown code blocks.`;
      
      const result = await model.generateContent([prompt, code]);
      const response = await result.response;
      setReview(response.text());
    } catch (error) {
      console.error('Error:', error);
      setReview('Error generating review. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Input Code</h2>
          <div style={{ position: 'relative' }}>
            <SyntaxHighlighter
              language="javascript"
              style={vs2015}
              customStyle={{
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              {code}
            </SyntaxHighlighter>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 'auto',
                opacity: 0,
                cursor: 'text'
              }}
              placeholder="Paste your JavaScript code here..."
            />
          </div>
          <button
            onClick={handleReview}
            disabled={loading || !code}
            style={{
              backgroundColor: loading || !code ? '#93C5FD' : '#2563EB',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              cursor: loading || !code ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Reviewing...' : 'Review'}
          </button>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Review Results</h2>
          <div style={{ 
            maxHeight: 'calc(100vh - 12rem)', 
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}>
            {review ? review : (
              <p style={{ color: '#6B7280' }}>Review results will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeReview;