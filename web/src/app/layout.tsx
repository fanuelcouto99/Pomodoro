import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({subsets: ['latin'], variable: '--font-roboto'});

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
    <html lang="en">
      <body className={`${roboto.variable} bg-gray-900 text-gray-300 font-sans text-base`}>{children}</body>
    </html>
  )
}
