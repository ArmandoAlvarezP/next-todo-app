import Image from "next/image"
import Link from "next/link"
import { SideBarItem } from './SideBarItem';
import { CiLogout } from "react-icons/ci";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline } from "react-icons/io5";

const items = [
    {
        title: 'Dashboard',
        icon: <IoCalendarOutline size={30}/>,
        href: '/dashboard'
    },
    {
        title: 'Rest TODOS',
        icon: <IoCheckboxOutline size={30}/>,
        href: '/dashboard/rest-todos'
    },
    {
        title: 'Server Actions',
        icon: <IoListOutline size={30}/>,
        href: '/dashboard/server-todos'
    },
    {
        title: 'Cookies',
        icon: <IoCodeWorkingOutline size={30}/>,
        href: '/dashboard/cookies'
    },
    {
        title: 'Productos',
        icon: <IoBasketOutline size={30}/>,
        href: '/dashboard/products'
    },
]

export const SideBar = () => {
    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                {/* <div className="-mx-6 px-6 py-4">
                    <Link href="/dashboard" title="dashboard">
                        <Image src='/logo.jpeg' className="items-center justify-center ml-17" alt="logo" width={100} height={20} />
                    </Link>
                </div> */}

                <div className="mt-8 text-center">
                    <Image src="/IMG_2026.JPG" alt="user" className=" m-auto rounded-full object-cover" width={100} height={50}/>
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Dua Lipa</h5>
                    <span className="hidden text-gray-400 lg:block">Admin</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        items.map( item => (
                            <SideBarItem key={item.title} icon={item.icon} title={item.title} href={item.href}/>
                        ))
                    }
                    
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <CiLogout />
                    <span className="group-hover:text-gray-700">Logout</span>
                </button>
            </div>
        </aside>

    )
}
