import type { AppProps } from 'next/app'
import {useState, useEffect} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'
import NProgress from "nprogress"

import "nprogress/nprogress.css";
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter()

  useEffect(() =>{
    setIsSSR(false)

    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    }
  }, [])

  if(isSSR) return null

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App