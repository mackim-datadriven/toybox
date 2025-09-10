import React from 'react';

export const metadata = {
  title: 'Maintenance Test',
  description: 'A test artifact to demonstrate the under maintenance banner',
  type: 'react' as const,
  tags: ['test', 'maintenance'],
  createdAt: '2025-01-10',
  updatedAt: '2025-01-10',
  underMaintenance: true,
  hidden: true,
};

export default function TestMaintenance() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Maintenance Test Artifact</h2>
      <p className="text-gray-600 mb-4">
        This artifact has the `underMaintenance: true` flag set in its metadata.
        You should see a maintenance banner displayed above this content.
      </p>
      <div className="bg-blue-100 p-4 rounded">
        <p className="text-blue-800">
          This is a working component that demonstrates the maintenance banner functionality.
        </p>
      </div>
    </div>
  );
}