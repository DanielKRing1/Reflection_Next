// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import ApolloProvider from "../graphql/apollo/client/Provider";
import MyThemeProvider from "../theme/ThemeProvider";
import IconProvider from "../icon/Provider";

// REDUX
import store from "../redux/store";
import NavBar from "../components/generic/Nav/NavBar";

export default function MyApp({ Component, pageProps }) {
    // Will redirect to '/login' page on logout
    // and '/' on login

    return (
        <ReduxProvider store={store}>
            <ApolloProvider>
                <MyThemeProvider>
                    <IconProvider>
                        <NavBar />

                        <Component {...pageProps} />
                    </IconProvider>
                </MyThemeProvider>
            </ApolloProvider>
        </ReduxProvider>
    );
}
