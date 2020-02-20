import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import ProductList from '../components/Index/ProductList';

const Home = ({ products }) => {
  return <ProductList products={products} />;
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${baseUrl}/api/products`);
  return { products: response.data };
};

export default Home;
