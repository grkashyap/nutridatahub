import { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { authenticated, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <header className='bg-white'>
            <nav aria-label='Global' className='mx-auto flex items-center justify-between p-6 lg:px-8'>
                <div className='flex lg:flex-1'>
                    <a href='/' className='-m-1.5 p-1.5 flex'>
                        <span className='sr-only'>NutriDataHub</span>
                        <img
                            alt=""
                            src="header.jpeg"
                            className="h-12 w-auto" />
                    </a>
                </div>
                <div className='flex lg:hidden'>
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                </div>
                { !authenticated ?
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="/login" className="text-sm/6 font-semibold text-blue-500 bg-opacity-100 hover:bg-green-200">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                            <a href="/signup" className="text-sm/6 font-semibold text-purple-500 ml-4 bg-opacity-100 hover:bg-green-200">
                                Sign up <span aria-hidden="true">&uarr;</span>
                            </a>
                        </div>
                    :
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="/dashboard" className="text-sm/6 font-semibold text-blue-500 bg-opacity-100 hover:bg-green-200">
                                {sessionStorage.getItem('name')}
                            </a>
                            <button onClick={handleLogout} className="text-sm/6 font-semibold text-blue-500 bg-opacity-100 hover:bg-green-200">
                                Logout
                            </button>
                        </div>
                }
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className='lg:hidden'>
                <div className='fixed inset-0 z-10' />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {
                                    !authenticated?
                                        <div className="py-6">
                                            <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                                Log in
                                            </a>
                                            <a href="/signup" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                                Sign up
                                            </a>
                                        </div>
                                    :
                                        <div className="py-6">
                                            <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                                Log in
                                            </a>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
            <div className="col-span-4 h-4 min-w-full bg-brown">
            </div>
        </header>
    );
}