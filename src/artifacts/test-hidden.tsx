import React from 'react';

export const metadata = {
  title: 'Hidden Test',
  description: 'A test artifact that should be hidden from the gallery',
  type: 'react' as const,
  tags: ['test', 'hidden'],
  createdAt: '2025-01-10',
  updatedAt: '2025-01-10',
  hidden: true,
};

export default function TestHidden() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Hidden Test Artifact</h2>
      <p className="text-gray-600 mb-4">
        This artifact has the `hidden: true` flag set in its metadata.
        It should not appear in the gallery, but is accessible via direct URL.
      </p>
      <div className="bg-purple-100 p-4 rounded">
        <p className="text-purple-800">
          If you can see this, you accessed it directly via URL!
        </p>
      </div>
    </div>
  );
}