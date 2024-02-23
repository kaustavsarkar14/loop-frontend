import React from "react";

const ProfileDataSekeleton = () => {
  return (
    <div className="relative rounded-md overflow-hidden min-h-96">
      <div className="h-44 animate-pulse bg-gray-300 rounded-md"></div>
      <div className="flex justify-between absolute -mt-12 w-full p-3">
        <div className="flex flex-col">
          <div className="h-28 w-28 bg-gray-600 rounded-full opacity-100">
            <div className="h-28 w-28 animate-pulse bg-gray-300 dark:bg-gray-600 rounded-full opacity-100"></div>
          </div>
          <h1 className="mt-2 animate-pulse bg-gray-300 dark:bg-gray-600 w-[10rem] h-6 rounded-md"></h1>
          <p className="animate-pulse bg-gray-300 dark:bg-gray-600 w-1/2 h-4 rounded-md mt-2"></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDataSekeleton;
