'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
    icon: React.ReactNode;
    href: string;
    title: string
}


export const SideBarItem = ({ icon, href, title }: Props) => {

    const pathName = usePathname()

    return (
        <li>
            <Link href={href} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${href === pathName ? 'text-white bg-linear-to-r from-sky-600 to-cyan-400' : 'hover:bg-gray-200'}`}>
                {icon}
                <span className="-mr-1 font-medium">{title}</span>
            </Link>
        </li>
    )
}
