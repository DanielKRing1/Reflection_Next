// THIRD PARTY
import { Provider as ReduxProvider } from "react-redux";

// MY PROVIDERS
import MyThemeProvider from "../theme/ThemeProvider";
import ApolloProvider from "../graphql/apollo/client/Provider";

// REDUX
import store from "../redux/store";

// TOP-LEVEL HOOKS
import useLoginChange from "../appHooks/useLoginChange";
import useHydrateApp from "../appHooks/useHydrateApp";
import useHydrateJournal from "../appHooks/useHydrateJournal";
import useJournalPhase from "../appHooks/useJournalPhase";

export default function MyApp({ Component, pageProps }) {
    // Will redirect to '/login' page on logout
    // and '/' on login
    useLoginChange();
    useHydrateApp();
    useHydrateJournal();
    useJournalPhase();

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
