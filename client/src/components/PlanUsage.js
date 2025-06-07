import { ChevronUp, Info, Star } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { calculatePercentage, convertFileSize } from '../lib/utils';

const PlanUsage = () => {
    const [planUsageCollapsed, setPlanUsageCollapsed] = useState(false)
    const { storageUsage, status: storageUsageStatus, error: storageUsageError } = useSelector((state) => state.files);

    const percentage = Number(calculatePercentage(storageUsage?.totalSize, storageUsage?.monthlyLimit)) || 0;
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setPlanUsageCollapsed(!planUsageCollapsed)}
          >
            <h2 className="text-xl font-semibold text-gray-800">Plan Current Usage</h2>
            <ChevronUp
              className={`h-5 w-5 text-gray-500 transition-transform ${planUsageCollapsed ? "rotate-180" : ""}`}
            />
          </div>

          {!planUsageCollapsed && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {/* Credit Usage Panel */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="mr-4 mt-1">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="w-4 h-4 bg-gray-400"></div>
                      <div className="w-4 h-4 bg-gray-400"></div>
                      <div className="w-4 h-4 bg-gray-400"></div>
                      <div className="w-4 h-4 bg-gray-400"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className='flex flex-col'>
                    <h3 className="text-lg font-medium text-gray-900">Credit Usage For Last 30 Days</h3>
                      <button className="inline-flex items-center px-3 py-1 w-[60%] bg-gray-200 rounded-md text-sm text-gray-900">
                        <Info className="h-4 w-4 mr-1" />
                        Credit Details
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-xl font-bold">
                          {convertFileSize(storageUsage.totalSize)} <span className="text-gray-500 text-lg font-normal">/ {convertFileSize(storageUsage.monthlyLimit)}</span>
                        </div>
                        <div className="text-sm text-gray-600">{percentage}% used</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Panel */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-gray-300 mr-4" />
                    <h3 className="text-xl font-medium text-gray-900">Free</h3>
                  </div>
                  <button className="bg-[#fa7275] hover:bg-[#ea6365] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
  )
}

export default PlanUsage
