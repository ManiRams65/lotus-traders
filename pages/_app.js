import 'tailwindcss/tailwind.css'
import { Sidenav } from '../components/sidenav'
import { Footer } from '../components/footer'

function MyApp({ Component, pageProps }) {
  return <div className="w-screen h-screen flex">
  <div className="w-1/5 h-full">
    <Sidenav />
  </div>
  <div className="w-4/5 h-full overflow-y-auto">
    <Component {...pageProps} />
    <Footer />
  </div>
</div>
}

export default MyApp
