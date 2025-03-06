import React from 'react';
import { ImpactMetrics } from '../types';

interface ImpactCardProps {
  metrics: ImpactMetrics;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Impact</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-green-700">{metrics.totalDonations}</p>
            <p className="text-sm text-gray-600">Total Donations</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-blue-700">{metrics.totalWeight} lbs</p>
            <p className="text-sm text-gray-600">Food Saved</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-yellow-700">{metrics.mealsProvided}</p>
            <p className="text-sm text-gray-600">Meals Provided</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-purple-700">{metrics.co2Saved} kg</p>
            <p className="text-sm text-gray-600">CO2 Emissions Saved</p>
          </div>
        </div>
        
        <div className="mt-4 bg-teal-50 p-4 rounded-lg">
          <p className="text-3xl font-bold text-teal-700">{(metrics.waterSaved / 1000).toFixed(0)}k</p>
          <p className="text-sm text-gray-600">Gallons of Water Saved</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactCard;