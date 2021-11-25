import 'tailwindcss/tailwind.css'
import { Sidenav } from '../components/sidenav'
import { Footer } from '../components/footer'
import { Provider } from 'react-redux';
import store from '../redux/store';
import NextNProgress from 'nextjs-progressbar';
import { CookiesProvider } from 'react-cookie';
import '../css/main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (<CookiesProvider>
    <Provider store={store}>
      <NextNProgress />
      <div className="w-screen h-screen block lg:flex">
        <div className="w-full lg:w-1/5 lg:h-full">
          <Sidenav />
        </div>
        <div className="w-full mt-20 lg:mt-0 lg:w-4/5 lg:h-full overflow-y-auto">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </Provider>
  </CookiesProvider>)

}

export default MyApp
