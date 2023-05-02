// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import MyThemeProvider from "../theme/ThemeProvider";
import ApolloProvider from "../graphql/apollo/client/Provider";

// REDUX
import store from "../redux/store";

export default function MyApp({ Component, pageProps }) {
    // Will redirect to '/login' page on logout
    // and '/' on login

    return (
        <ReduxProvider store={store}>
            <ApolloProvider>
                <MyThemeProvider>
                    <Component {...pageProps} />
                </MyThemeProvider>
            </ApolloProvider>
        </ReduxProvider>
    );
}
