import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Nav() {

    const { user, isLoaded } = useUser();

    return (
        <nav className='bg-[#181818] sticky top-0 z-50'>
            <div className='container flex items-center justify-between py-5 min-h-[80px]'>
                {/* Logo */}
                <Link
                    to={`/`}
                    className='flex items-center gap-2'
                >
                    <img
                        src='/assets/images/logo.png'
                        alt='App Logo'
                    />
                    <span className='font-semibold text-2xl'>Taskify</span>
                </Link>
                {/* Auth */}
                {
                    !isLoaded ? (
                        <div className='auth-loading w-28 h-10 rounded-md bg-[#101010] flex items-center justify-center animate-pulse'>Loading...</div>
                    ) : user ? (
                        <div className='flex items-center gap-3'>
                            {/* User Button */}
                            <UserButton />
                            {/* Username */}
                            <span className='max-sm:hidden font-medium'>{user.firstName}</span>
                        </div>
                    ) : (
                        <Link
                            to={`/signin`}
                            className='block bg-white text-[#181818] font-semibold py-2 px-4 rounded-md sm:hover:bg-[#101010] sm:hover:text-white transition-colors'
                        >
                            Signin
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav;