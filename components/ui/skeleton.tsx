import React from 'react';

// interface SkeletonProps extends  {}

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-white/10  ${className}`}
      {...props}
    />
  );
};