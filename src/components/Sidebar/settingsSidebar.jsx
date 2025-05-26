
const SettingsSidebar = ({ onSelect, selected }) => {
    return (
        <aside className="w-64 h-screen bg-gray-50 border-r border-gray-300  flex flex-col space-y-8 text-xl pt-[8rem] items-center ">

            <nav className="flex flex-col space-y-12">
                <button
                    onClick={() => onSelect('editProfile')}
                    className={`flex items-center space-x-3 ${selected === 'editProfile' ? 'text-black' : 'text-gray-400'} hover:text-black`}
                >
                    <img src="/assets/Pen.png" className="w-5 h-5" alt="Edit" />
                    <span>Edit Profile</span>
                </button>

                <button
                    onClick={() => onSelect('position')}
                    className={`flex items-center space-x-3 ${selected === 'position' ? 'text-black' : 'text-gray-400'} hover:text-black`}
                >
                    <img src="/assets/name.png" className="w-5 h-5" alt="Position" />
                    <span>Position</span>
                </button>

                <button
                    onClick={() => onSelect('security')}
                    className={`flex items-center space-x-3 ${selected === 'security' ? 'text-black' : 'text-gray-400'} hover:text-black`}
                >
                    <img src="/assets/Password.png" className="w-5 h-5" alt="Security" />
                    <span>Security</span>
                </button>
            </nav>
        </aside>
    );
};

export default SettingsSidebar;