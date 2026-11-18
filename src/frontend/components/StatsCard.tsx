import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trendUp ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
