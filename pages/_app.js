import App from 'next/app';
import Layout from '../components/_App/Layout';

class MyApp extends App {
  //Pass the props to the child component
  static async getInitialProps({ Component, context }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context);
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
