import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '3rem 1rem', 
      textAlign: 'center' 
    }}>
      <h1 style={{ 
        fontSize: '4.3rem', 
        fontWeight: 'bold', 
        color: 'black',
        
      
      }}>Transform Your Code Quality with</h1>
      <h1 style={{ 
        fontSize: '3.2rem', 
        fontWeight: 'bold', 
        color: '#4b43fa',
        marginTop : "-50px"

      
      }}>
        AI-Powered Code Reviews
      </h1>
      <p style={{
        fontSize:"22px",
        color:"gray",
        marginTop:"-20px"
      }}>
        Get instant feedback on your javaScript code. Detect bugs, optimize performance, and <br />
        improve code quality with our advance AI analysis system.
      </p>
      <button
        onClick={() => navigate('/review')}
        style={{
          fontSize: '18px',
          backgroundColor: '#4b43fa',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: 'light',
          cursor: 'pointer',
          fontfamily:"mono"
        }}
      >
        {`Start Code Review </>`}
      </button>
    </div>
  );
}

export default Home;