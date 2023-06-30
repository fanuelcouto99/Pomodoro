import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { Timer, ScrollText } from 'lucide-react';

export function Header() {
    return (
        <div className="flex items-center justify-between">
            <Image src={logo} alt='' />

            <nav className='flex gap-2'>
                <Link
                    href="/"
                    title='Timer'
                    className='w-12 h-12 flex items-center justify-center border-t-[3px] border-b-[3px] border-t-transparent border-b-transparent hover:border-b-green-500 transition-colors group'>
                    <Timer className='stroke-gray-100 group-active:stroke-green-500' />
                </Link>

                <Link
                    href="/history"
                    title='Histórico'
                    className='w-12 h-12 flex items-center justify-center border-t-[3px] border-b-[3px] border-t-transparent border-b-transparent hover:border-b-green-500 transition-colors group'>
                    <ScrollText className='stroke-gray-100 group-active:stroke-green-500' />
                </Link>
            </nav>
        </div>
    );
};