// THIRD PARTY

// MY PROVIDERS
import ApolloProvider from "../graphql/apollo/client/Provider";
import MyThemeProvider from "../theme/ThemeProvider";
import IconProvider from "../icon/Provider";

import NavBar from "../components/generic/Nav/NavBar";

export default function MyApp({ Component, pageProps }) {
    // Will redirect to '/login' page on logout
    // and '/' on login

    return (
        <ApolloProvider>
            <MyThemeProvider>
                <IconProvider>
                    <NavBar />

                    <Component {...pageProps} />
                </IconProvider>
            </MyThemeProvider>
        </ApolloProvider>
    );
}
