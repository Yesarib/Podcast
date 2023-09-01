import React, { useEffect, useState } from "react";
import authService from "../Services/Auth";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getUser = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            setUser(user.data.user);
        }
    };

    useEffect(() => {
        getUser();
    }, [user]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        authService.logout();
        setUser(null);

    };

    console.log(user);

    return (
        <div className="w-full flex justify-around items-center text-white mt-10">
            <div className="justify-center items-center text-center">
                <h2 className="text-[20px] font-medium tracking-widest">
                    
                    PodConnect
                </h2>
            </div>
            <div className="flex justify-evenly">
            {user && (
                    <div className="relative group">
                        <button
                            id="menuButton"
                            onClick={toggleMenu}
                            className="text-white group-hover:text-gray-600"
                        >
                            {user.firstName}
                        </button>
                        <div
                            className={`absolute ${isMenuOpen ? 'block' : 'hidden'} mt-2 py-2 bg-white border border-gray-200 shadow-lg rounded-lg`}
                        >
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Profil
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={logout}>
                                Çıkış
                            </a>
                        </div>
                    </div>
                )}
                {!user && (
                    <>
                        <button className="text-gray-300 text-[18px] font-medium">
                            Sign up
                        </button>
                        <button className="ml-5 text-black text-[18px] font-medium bg-white tracking-wide w-32 h-9 rounded-3xl">
                            <a href="/login">Log in </a>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
