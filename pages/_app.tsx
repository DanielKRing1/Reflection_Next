// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import MyThemeProvider from "../theme/ThemeProvider";
import ApolloProvider from "../graphql/apollo";

// REDUX
import store from "../redux/store";
import OnStartUpWrapper from "../components/startUp";

export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider>
        <MyThemeProvider>
          <OnStartUpWrapper>
            <Component {...pageProps} />
          </OnStartUpWrapper>
        </MyThemeProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
}
