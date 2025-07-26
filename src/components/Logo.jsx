import React from 'react';

function Logo({ width = '120px', alt = 'MegaBlog Logo' }) {
  return (
    <div style={{ width }}>
      <img
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
        alt={alt}
        style={{ width: '100%', height: 'auto' }}
        className='rounded-2xl'
      />
    </div>
  );
}

export default Logo;
