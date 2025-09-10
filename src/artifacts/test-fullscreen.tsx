import React from 'react';

export const metadata = {
  title: 'Fullscreen Test',
  description: 'A test artifact that demonstrates automatic fullscreen mode',
  type: 'react' as const,
  tags: ['test', 'fullscreen'],
  createdAt: '2025-01-10',
  updatedAt: '2025-01-10',
  fullscreen: true,
  hidden: true,
};

export default function TestFullscreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Fullscreen Experience</h1>
        <p className="text-xl mb-4">
          This artifact has `fullscreen: true` in its metadata.
        </p>
        <p className="text-lg opacity-90">
          In standalone mode, it should start in fullscreen automatically.
          Hover over the top-right corner to see the fullscreen toggle.
        </p>
        <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-lg">
            Perfect for immersive experiences and presentations!
          </p>
        </div>
      </div>
    </div>
  );
}