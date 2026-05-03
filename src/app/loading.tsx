import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-saffron border-t-green rounded-full animate-spin" />
        <p className="text-navy font-bold animate-pulse">Matdaan 360 is loading...</p>
      </div>
    </div>
  );
}
