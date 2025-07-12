import React from 'react';

const ProfileInfo = () => {
    return (
        <div className="flex ml-[9rem] mt-[5rem]">
            <img
                src='/assets/Profile.png'
                alt="Profile"
                className="w-[7.5rem] h-[7.5rem] rounded-full object-cover mr-[1rem]"
            />
            <div>
                <h2 className="text-2xl font-semibold">name here</h2>
                <p className="text-gray-500">email here</p>
                <p className="text-sm text-gray-400">position</p>
            </div>
        </div>
    );
};

export default ProfileInfo;