import 'tailwindcss/tailwind.css'
import { Sidenav } from '../components/sidenav'
import { Footer } from '../components/footer'

function MyApp({ Component, pageProps }) {
  return <div className="w-screen h-screen block lg:flex">
    <div className="w-full lg:w-1/5 lg:h-full">
      <Sidenav />
    </div>
    <div className="w-full mt-16 lg:mt-0 lg:w-4/5 lg:h-full overflow-y-auto">
      <Component {...pageProps} />
      <Footer />
    </div>
  </div>
}

export default MyApp
