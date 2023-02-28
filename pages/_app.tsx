// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import MyThemeProvider from "../theme/ThemeProvider";

// REDUX
import store from "../redux/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <MyThemeProvider>
        <Component {...pageProps} />
      </MyThemeProvider>
    </ReduxProvider>
  );
}
