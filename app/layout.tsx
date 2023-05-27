import ToasterContext from './context/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messanger Clone',
  description: 'Messanger Clone by Zk Rana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
        <ToasterContext />
        {children}
        </AuthContext>
        
        </body>
    </html>
  )
}
