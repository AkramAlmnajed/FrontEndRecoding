import React, { useState } from "react";
import EditProfile from '../components/Forms/EditProfile';
import PositionForm from '../components/Forms/PositionForm';
import Security from '../components/Forms/SecurityForm';
import Header from "../components/Header/header";
import SettingsSidebar from "../components/Sidebar/settingsSidebar";
import ProfileInfo from "../components/auth/ProfileInfo";

const SettingsPage = () => {
    const [selectedSection, setSelectedSection] = useState('editProfile');

    const renderContent = () => {
        switch (selectedSection) {
            case 'editProfile':
                return <EditProfile title="Account Info:" />;
            case 'position':
                return <PositionForm buttonText="Save Changes:" onSubmit={(data) => console.log('Position:', data)} title="Position:" />;
            case 'security':
                return <Security title="Change Password:" />;
            default:
                return null;
        }
    };

    return (

        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <SettingsSidebar onSelect={setSelectedSection} selected={selectedSection} />
                <div>
                    <ProfileInfo />
                    <div className="w-full max-w-[400px] px-8 justify-center items-start pt-16 ml-[10rem]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;