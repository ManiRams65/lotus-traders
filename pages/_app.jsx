import 'tailwindcss/tailwind.css'
import { Sidenav } from '../components/sidenav'
import { Footer } from '../components/footer'
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (<Provider store={store}>
    <div className="w-screen h-screen block lg:flex">
      <div className="w-full lg:w-1/5 lg:h-full">
        <Sidenav />
      </div>
      <div className="w-full mt-20 lg:mt-0 lg:w-4/5 lg:h-full overflow-y-auto">
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  </Provider>)

}

export default MyApp
