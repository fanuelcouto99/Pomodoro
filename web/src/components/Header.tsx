'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { Timer, ScrollText } from 'lucide-react';

export function Header() {
    const [isHomeActive, setIsHomeActive] = useState(false);
    const [isHistoryActive, setIsHistoryActive] = useState(false);

    function pageIsActive(page: string) {
        switch (page) {
            case 'home': 
                setIsHomeActive(true);
                setIsHistoryActive(false);
            break;
            
            case 'history' :
                setIsHistoryActive(true);
                setIsHomeActive(false);
            break;
            
            default:
                console.log('Página não encontrada!');
        };
    };

    return (
        <div className="flex items-center justify-between">
            <Image src={logo} alt='' />

            <nav className='flex gap-2'>
                <Link
                    href="/"
                    title='Timer'
                    onClick={() => pageIsActive('home')}
                    className='w-12 h-12 flex items-center justify-center border-t-[3px] border-b-[3px] border-t-transparent border-b-transparent hover:border-b-green-500 transition-colors'>
                    <Timer className={`stroke-gray-100 ${isHomeActive && 'stroke-green-500'}`} />
                </Link>

                <Link
                    href="/history"
                    title='Histórico'
                    onClick={() => pageIsActive('history')}
                    className='w-12 h-12 flex items-center justify-center border-t-[3px] border-b-[3px] border-t-transparent border-b-transparent hover:border-b-green-500 transition-colors'>
                    <ScrollText className={`stroke-gray-100 ${isHistoryActive && 'stroke-green-500'}`} />
                </Link>
            </nav>
        </div>
    );
};