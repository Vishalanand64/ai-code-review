import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function CodeReview() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [freeReviewsLeft, setFreeReviewsLeft] = useState(3);
  const [showPopup, setShowPopup] = useState(false);

 

  const formatReviewText = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/^### (.*$)/gim, '<h2 style="font-size:2.2vh; color:#2563EB; margin-top:2vh;">$1</h2>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size:2.5vh; color:#2563EB; margin-top:2vh;">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size:2.8vh; color:#1D4ED8; margin-top:3vh;">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n\n/gim, '<br/><br/>')
      .replace(/\n/gim, '<br/>');
    return formatted.trim();
  };

  const handleReview = async () => {
    if (freeReviewsLeft <= 0) {
      setShowPopup(true);
      return;
    }
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are a Senior Code Reviewer (7+ years experience). Structure the feedback clearly. 
Use sections with headings like "Bugs Found", "Optimization Suggestions", "Code Quality", "Complexity", etc.
Highlight headings clearly. Be concise but structured.`;

      const result = await model.generateContent([prompt, code]);
      const response = await result.response;
      const aiText = response.text();
      const formattedText = formatReviewText(aiText);
      setReview(formattedText);

      const newCount = freeReviewsLeft - 1;
      setFreeReviewsLeft(newCount);
      localStorage.setItem('freeReviewsLeft', newCount.toString());
    } catch (error) {
      console.error('Error:', error);
      setReview('Error generating review. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: '98vw',
      maxWidth: '98vw',
      margin: '0 auto',
      padding: '1vh 1vw',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Free Review Counter */}
      <div style={{
        position: 'absolute',
        top: '1vh',
        right: '1vw',
        backgroundColor: '#2563EB',
        color: 'white',
        padding: '0.5vh 1vw',
        borderRadius: '2vh',
        fontWeight: 'bold',
        fontSize: '1.8vh',
        zIndex: 100
      }}>
        Free Reviews Left: {freeReviewsLeft}
      </div>

      {/* Main Grid - Updated for mobile responsiveness */}
      <div style={{
       display:'flex',
       flexDirection:"column",
       gap:20,
       
      }}>
        {/* Input Code Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5vh 1.5vw',
          borderRadius: '1vh',
          boxShadow: '0 0.2vh 0.4vh rgba(0, 0, 0, 0.1)',
          width: '96%',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.2vh',
            fontWeight: 'bold',
            marginBottom: '1vh'
          }}>Input Code</h2>
          <p style={{ fontSize: '1.8vh' }}>Place your JavaScript code here ⬇</p>
          <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
          }}>
            <SyntaxHighlighter
              language="javascript"
              style={vs2015}
              customStyle={{
                padding: '1vh',
                borderRadius: '0.5vh',
                marginBottom: '1vh',
                minHeight: '40vh',
                width: '100%',
                overflowX: 'auto',
                fontSize: '1.6vh'
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
                height: '100%',
                opacity: 0,
                cursor: 'text',
              }}
            />
          </div>
          <button
            onClick={handleReview}
            disabled={loading || !code}
            style={{
              backgroundColor: loading || !code ? '#93C5FD' : '#2563EB',
              color: 'white',
              padding: '1vh 2vw',
              borderRadius: '0.5vh',
              fontWeight: 'bold',
              cursor: loading || !code ? 'not-allowed' : 'pointer',
              fontSize: '1.8vh',
              width: '100%'
            }}
          >
            {loading ? 'Reviewing (might take 2-3 minutes)' : 'Review'}
          </button>
        </div>

        {/* Review Results Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5vh 1.5vw',
          borderRadius: '1vh',
          boxShadow: '0 0.2vh 0.4vh rgba(0, 0, 0, 0.1)',
          width: '96%',
          margin: '0 auto',
          minHeight: '50vh'
        }}>
          <h2 style={{
            fontSize: '2.2vh',
            fontWeight: 'bold',
            marginBottom: '1vh'
          }}>Review Results</h2>
          <div
            dangerouslySetInnerHTML={{ __html: review }}
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '1.6vh',
              width: '100%',
              paddingRight: '1vw',
              lineHeight: '1.5'
            }}
          />
          {!review && (
            <p style={{ color: '#6B7280', fontSize: '1.8vh' }}>
              Review results will appear here...
            </p>
          )}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2vh 2vw',
            borderRadius: '1vh',
            textAlign: 'center',
            width: '80vw',
            maxWidth: '40vw',
            position:'relative'
          }}>
            <button onClick={() => setShowPopup(false)} style={{position:'absolute' , top:10 , right:10 , border:"none" , backgroundColor:"black" , color:"white" , fontWeight:600 , padding:"8px 12px" , borderRadius:"8px" , cursor:'pointer'}}>X</button>
            <h2 style={{ fontSize: '2.5vh', marginBottom: '1.5vh' }}>Upgrade to Premium</h2>
            <p style={{ marginBottom: '2vh', fontSize: '2vh' }}>
              You've used all your free reviews. Upgrade to Premium to continue using the Code Reviewer 🚀
            </p>
            <h1>Working on it!</h1>
            <h2>$ 9.99</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeReview;