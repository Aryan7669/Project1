import React, { useState, useEffect } from 'react';
import { ImpactMetrics } from '../types';

interface ImpactCardProps {
  metrics: ImpactMetrics;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ metrics }) => {
  // State for rolling numbers
  const [animatedTotalDonations, setAnimatedTotalDonations] = useState(0);
  const [animatedTotalWeight, setAnimatedTotalWeight] = useState(0);
  const [animatedMealsProvided, setAnimatedMealsProvided] = useState(0);
  const [animatedCo2Saved, setAnimatedCo2Saved] = useState(0);
  const [animatedWaterSaved, setAnimatedWaterSaved] = useState(0);

  // Simulate rolling numbers animation
  useEffect(() => {
    const rollNumber = (target: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
      let current = 0;
      const increment = Math.ceil(target / 50); // Adjust speed of roll
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setValue(target);
          clearInterval(interval);
        } else {
          setValue(current);
        }
      }, 30); // Adjust interval for smoothness
      return () => clearInterval(interval); // Cleanup on unmount
    };

    rollNumber(metrics.totalDonations, setAnimatedTotalDonations);
    rollNumber(metrics.totalWeight, setAnimatedTotalWeight);
    rollNumber(metrics.mealsProvided, setAnimatedMealsProvided);
    rollNumber(metrics.co2Saved, setAnimatedCo2Saved);
    rollNumber(metrics.waterSaved, setAnimatedWaterSaved);
  }, [metrics]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-all duration-300 ease-in-out hover:text-gray-700">
          Your Impact
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-100">
            <p className="text-3xl font-bold text-blue-700">{animatedTotalDonations.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Donations</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-100">
            <p className="text-3xl font-bold text-blue-700">{animatedTotalWeight.toLocaleString()} lbs</p>
            <p className="text-sm text-gray-600">Food Saved</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-yellow-100">
            <p className="text-3xl font-bold text-yellow-700">{animatedMealsProvided.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Meals Provided</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-100">
            <p className="text-3xl font-bold text-purple-700">{animatedCo2Saved.toLocaleString()} kg</p>
            <p className="text-sm text-gray-600">CO2 Emissions Saved</p>
          </div>
        </div>

        <div className="mt-4 bg-teal-50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-teal-100">
          <p className="text-3xl font-bold text-teal-700">{(animatedWaterSaved / 1000).toFixed(0)}k</p>
          <p className="text-sm text-gray-600">Gallons of Water Saved</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactCard;