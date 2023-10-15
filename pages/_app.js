import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  <Provider store={store}>
    return <Component {...pageProps} />
  </Provider>;
}
