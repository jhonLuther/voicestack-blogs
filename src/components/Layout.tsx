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

    <div className={`flex flex-col w-full items-center `}>
      <Header />
      <main className='w-full'>{children}</main>
      <Footer className={`w-full flex `} />
    </div>
  )
}
