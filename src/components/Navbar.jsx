import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        height: '4rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            color: '#1F2937',
            textDecoration: 'none'
          }}
        >
          AI Code Review
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;