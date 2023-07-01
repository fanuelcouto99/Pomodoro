import { Header } from '@/components/Header';
import './globals.css'
import { Roboto_Flex as Roboto, Roboto_Mono as RobotoMono } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const robotoMono = RobotoMono({subsets: ['latin'], variable: '--font-roboto-mono'});

export const metadata = {
  title: 'Pomodoro',
  description: 'Aplicação para controle de tempo usando a técnica pomodoro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${robotoMono.variable} bg-gray-900 text-gray-300 font-sans text-base`}>

        <div className='max-w-[74rem] h-[calc(100vh-10rem)] my-20 mx-auto p-9 bg-gray-800 rounded-lg flex flex-col'>
          <Header />

          <div className='h-full'>
            {children}
          </div>
        </div>

      </body>
    </html>
  )
}
