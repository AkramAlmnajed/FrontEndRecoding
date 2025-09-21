import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useUser } from "../context/UserProvider";

const ProfileInfo = () => {
    const { user, updateProfile } = useUser()
    const [profileImage, setProfileImage] = useState("/assets/profile.png");

    useEffect(() => {
        if (user?.profile_image) {
            const imageUrl = user.profile_image.startsWith('http')
                ? user.profile_image
                : `http://127.0.0.1:8000/storage/${user.profile_image}`;
            setProfileImage(imageUrl);
        }
    }, [user]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        console.log("Selected file:", file);
        setProfileImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("profile_image", file);
        await updateProfile(formData);
    }

    return (
        <div className="flex ml-[9rem] mt-[5rem]">
            <div className='relative'>
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-[7.5rem] h-[7.5rem] rounded-full object-cover mr-[1rem]"
                />
                <div className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full shadow-md translate-x-[-50%] cursor-pointer">
                    <Icon icon="mdi:pen" width="16" height="16" className="text-black cursor-pointer" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>

            </div>

            <div>
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-sm text-gray-400">{user?.position}</p>

            </div>
        </div>
    );
};

export default ProfileInfo;