import MyThemeProvider from "../theme/ThemeProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <MyThemeProvider>
      <Component {...pageProps} />
    </MyThemeProvider>
  );
}
