import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'js-cookie';

import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';

const AddProductToCart = ({ user, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    //Cancel the time out when the component unmount
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const handleAddProductToCart = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      onChange={e => setQuantity(Number(e.target.value))}
      value={quantity}
      action={
        user && success
          ? {
              color: 'blue',
              content: 'Item Added!',
              icon: 'plus cart',
              disabled: true
            }
          : user
          ? {
              color: 'orange',
              content: 'Add to Cart',
              icon: 'plus cart',
              loading,
              disabled: loading,
              onClick: handleAddProductToCart
            }
          : {
              color: 'blue',
              content: 'Log in To Purchase',
              icon: 'signup',
              onClick: () => router.push('/login')
            }
      }
    />
  );
};

export default AddProductToCart;
