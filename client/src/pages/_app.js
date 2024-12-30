import { Provider } from "react-redux";
import "./style/global.scss";
import store from "../redux/store";
export default function MyApp({ Component, pageProps }) {
  <Provider store={store}>
    return <Component {...pageProps} />;
  </Provider>;
}
