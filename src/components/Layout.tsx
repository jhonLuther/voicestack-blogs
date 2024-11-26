import Link from 'next/link'
import Footer from '~/layout/Footer'
import Header from '~/layout/Header'
import { useGlobalData } from './Context/GlobalDataContext'

interface LayoutProps {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
}

export default function Layout({
  children,
  className,
  fullWidth = false,
}: LayoutProps) {

  const { homeSettings } = useGlobalData();

  return (
    <div
      className={`flex flex-col w-full items-center pt-[110px] ${homeSettings?.demoBanner ? 'lg:pt-[138px]' :'lg:pt-[80px]' }`}
    >
      <Header />
      <main className="w-full flex flex-col">{children}</main>
      <Footer className={`w-full flex `} />
    </div>
  )
}
