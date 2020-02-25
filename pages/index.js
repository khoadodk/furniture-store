import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';

const Home = ({ products, totalPages }) => {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
};

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 10;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };

  const {
    data: { products, totalPages }
  } = await axios.get(url, payload);

  return { products, totalPages };
};

export default Home;
