import { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import cookie from 'js-cookie';

import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/calculateCartTotal';

const Cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async _id => {
    const url = `${baseUrl}/api/cart/${_id}`;
    const token = cookie.get('token');
    const payload = {
      headers: { Authorization: token }
    };
    const { data } = await axios.delete(url, payload);
    setCartProducts(data);
  };

  const handleCheckout = async paymentData => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get('token');
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment>
      <CartItemList
        handleRemoveFromCart={handleRemoveFromCart}
        user={user}
        products={cartProducts}
        success={success}
      />
      <CartSummary
        products={cartProducts}
        handleCheckout={handleCheckout}
        success={success}
      />
    </Segment>
  );
};

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  return { products: response.data };
};

export default Cart;
