import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center py-3" style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#343a40',
      color: 'white',
      textAlign: 'center'
    }}>
      <div>Inventory Management System © 2024</div>
    </footer>
  );
}

export default Footer;
