import Link from 'next/link'
import Footer from '~/layout/Footer'
import Header from '~/layout/Header'
import { useGlobalData } from './Context/GlobalDataContext'

interface LayoutProps {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
  data?: any
  featuredTags?: any
}

export default function Layout({
  children,
  data,
  featuredTags,
  className,
  fullWidth = false,
}: LayoutProps) {
  console.log(featuredTags, data, 'featuredTags in layout')

  return (
    <div
      className={`flex flex-col w-full items-center pt-[110px] lg:pt-[138px]`}
    >
      <Header />
      <main className="w-full flex flex-col">{children}</main>
      <Footer className={`w-full flex `} />
    </div>
  )
}
