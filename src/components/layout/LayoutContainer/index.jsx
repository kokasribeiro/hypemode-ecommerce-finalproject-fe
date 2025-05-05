import React from 'react';

const LayoutContainer = ({ children, className = '' }) => {
  return <div className={`max-w-7xl mx-auto px-4 text-black ${className}`}>{children}</div>;
};

export default LayoutContainer;
