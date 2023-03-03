// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import MyThemeProvider from "../theme/ThemeProvider";

// REDUX
import store from "../redux/store";
import OnStartUpWrapper from "../components/startUp";

export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <MyThemeProvider>
        <OnStartUpWrapper>
          <Component {...pageProps} />
        </OnStartUpWrapper>
      </MyThemeProvider>
    </ReduxProvider>
  );
}
