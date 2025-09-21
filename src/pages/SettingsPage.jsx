import { Icon } from "@iconify/react";
import { useState } from "react";
import ProfileInfo from "../components/auth/ProfileInfo";
import { useUser } from "../components/context/UserProvider";
import ErrorMessage from "../components/FormElements/error_message";
import ChangeEmail from "../components/Forms/changeEmail";
import EditProfile from '../components/Forms/EditProfile';
import ResetPassword from "../components/Forms/ResetPasswordForm";
import Header from "../components/Header/header";
import SettingsSidebar from "../components/Sidebar/settingsSidebar";

const SettingsPage = () => {
    const [selectedSection, setSelectedSection] = useState('editProfile');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, updateProfile } = useUser()
    const [serverError, setServerError] = useState()
    const [isLoading, setIsLoading] = useState()

    async function submit(data) {
        try {
            setIsLoading(true);
            setServerError(null);
            const result = await updateProfile({
                current_password: data.current_password,
                password: data.password,
                password_confirmation: data.password_confirmation
            });
            if (result.ok) {
                console.log("Profile updated successfully", result.data);
                alert("Password Changed Successfully")
            } else {
                setServerError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const renderContent = () => {
        switch (selectedSection) {
            case 'editProfile':
                return <EditProfile />;
            case 'changeEmail':
                return <ChangeEmail />;
            case 'changePass':
                return <>
                    <ResetPassword
                        title="Change Password:"
                        buttonText={isLoading ? "Saving Changes.." : "Save Changes"}
                        onSubmit={submit}
                        showCurrentPassword={true}
                    />
                    {serverError && <ErrorMessage message={serverError} />}
                </>
            default:
                return null;
        }
    };

    const handleSectionSelect = (section) => {
        setSelectedSection(section);
        setSidebarOpen(false); // Close mobile sidebar after selection
    };


    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />

            {/* Mobile Header with Menu Toggle */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-semibold">Settings</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <Icon icon="mdi:menu" width="24" />
                </button>
            </div>

            <div className="flex flex-1 relative">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <SettingsSidebar onSelect={handleSectionSelect} selected={selectedSection} />
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50">
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Menu</h2>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-1 rounded hover:bg-gray-100"
                                    >
                                        <Icon icon="mdi:close" width="20" />
                                    </button>
                                </div>
                            </div>
                            <nav className="p-4 space-y-6">
                                <button
                                    onClick={() => handleSectionSelect('editProfile')}
                                    className={`flex items-center space-x-3 w-full text-left ${selectedSection === 'editProfile' ? 'text-black font-semibold' : 'text-gray-400'
                                        } hover:text-black`}
                                >
                                    <img src="/assets/Pen.png" className="w-5 h-5" alt="Edit" />
                                    <span>Edit Profile</span>
                                </button>

                                <button
                                    onClick={() => handleSectionSelect('changeEmail')}
                                    className={`flex items-center space-x-3 w-full text-left ${selectedSection === 'changeEmail' ? 'text-black font-semibold' : 'text-gray-400'
                                        } hover:text-black`}
                                >
                                    <img src="/assets/name.png" className="w-5 h-5" alt="changeEmail" />
                                    <span>Email</span>
                                </button>

                                <button
                                    onClick={() => handleSectionSelect('changePass')}
                                    className={`flex items-center space-x-3 w-full text-left ${selectedSection === 'changePass' ? 'text-black font-semibold' : 'text-gray-400'
                                        } hover:text-black`}
                                >
                                    <img src="/assets/Password.png" className="w-5 h-5" alt="Change Password" />
                                    <span>Password</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Mobile Profile Info */}
                    <div className="lg:hidden p-4 bg-white border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img
                                src='/assets/Profile.png'
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{user?.name}</h2>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                                <p className="text-xs text-gray-400">{user?.position}</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Profile Info */}
                    <div className="hidden lg:block">
                        <ProfileInfo />
                    </div>

                    {/* Content Area */}
                    <div className="w-full max-w-[400px] px-4 lg:px-8 pt-6 lg:pt-16 mx-auto lg:ml-[10rem] lg:mx-0">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;