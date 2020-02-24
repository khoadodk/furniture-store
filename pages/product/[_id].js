import axios from 'axios';
import ProductSummary from '../../components/Product/ProductSummary';
import ProductAttributes from '../../components/Product/ProductAttributes';
import baseUrl from '../../utils/baseUrl';

const Product = ({ product, user }) => {
  return (
    <>
      <ProductSummary {...product} user={user} />
      <ProductAttributes {...product} user={user} />
    </>
  );
};

Product.getInitialProps = async ({ query: { _id } }) => {
  const { data } = await axios.get(`${baseUrl}/api/product/${_id}`);
  return {
    product: data
  };
};

export default Product;
