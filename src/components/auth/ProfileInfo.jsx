import { useUser } from "../context/UserProvider";


const ProfileInfo = () => {

    const userInfo = useUser()
    console.log("user info" ,userInfo)
    return (
        <div className="flex ml-[9rem] mt-[5rem]">
            <img
                src='/assets/Profile.png'
                alt="Profile"
                className="w-[7.5rem] h-[7.5rem] rounded-full object-cover mr-[1rem]"
            />
            <div>
                <h2 className="text-2xl font-semibold">{userInfo.user.name}</h2>
                <p className="text-gray-500">{userInfo.user.email}</p>
                <p className="text-sm text-gray-400">{userInfo.user.position}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;