import Link from 'next/link'
import Footer from '~/layout/Footer';
import Header from '~/layout/Header';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}


export default function Layout({ children, className, fullWidth = false }: LayoutProps) {
  return (
    <div className={`flex flex-col w-full items-center pt-[110px]  lg:pt-[138px]`}>
      <Header />
      <main className='w-full flex flex-col'>{children}</main>
      <Footer className={`w-full flex `} />
    </div>
  )
}
