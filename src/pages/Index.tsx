
import React from 'react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-12">Archival Finding Aid Demo</h1>
      
      <div className="mb-8">
        <Link 
          to="/finding-aids-listing" 
          className="block p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">Finding Aids Directory</h2>
          <p className="text-gray-600">
            Browse all available finding aids organized alphabetically.
          </p>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/finding-aid" 
          className="block p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">Finding Aid with Series</h2>
          <p className="text-gray-600">
            View the standard finding aid with Series organization.
          </p>
        </Link>
        
        <Link 
          to="/finding-aid-no-containers" 
          className="block p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">FOIA Finding Aid</h2>
          <p className="text-gray-600">
            View the FOIA finding aid without container organization.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Index;
