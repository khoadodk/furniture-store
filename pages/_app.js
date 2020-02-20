import App from 'next/app';
import Layout from '../components/_App/Layout';

class MyApp extends App {
  // https://medium.com/@Hibow/getinitialprops-in-next-js-8b1b7ec8f39
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
export default MyApp;
