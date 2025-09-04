const SettingsSidebar = ({ onSelect, selected }) => {
    return (
        <aside className="w-64 h-screen bg-gray-50 border-r border-gray-300 flex flex-col space-y-8 text-xl pt-20 items-center">
            <nav className="flex flex-col space-y-12">
                <button
                    onClick={() => onSelect('editProfile')}
                    className={`flex items-center space-x-3 ${selected === 'editProfile' ? 'text-black font-semibold' : 'text-gray-400'} hover:text-black transition-colors`}
                >
                    <img src="/assets/Pen.png" className="w-5 h-5" alt="Edit" />
                    <span>Edit Profile</span>
                </button>

                <button
                    onClick={() => onSelect('changeEmail')}
                    className={`flex items-center space-x-3 ${selected === 'changeEmail' ? 'text-black font-semibold' : 'text-gray-400'} hover:text-black transition-colors`}
                >
                    <img src="/assets/name.png" className="w-5 h-5" alt="change email" />
                    <span>Email</span>
                </button>

                <button
                    onClick={() => onSelect('changePass')}
                    className={`flex items-center space-x-3 ${selected === 'changePass' ? 'text-black font-semibold' : 'text-gray-400'} hover:text-black transition-colors`}
                >
                    <img src="/assets/Password.png" className="w-5 h-5" alt="change password" />
                    <span>Password</span>
                </button>
            </nav>
        </aside>
    );
};

export default SettingsSidebar;