import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';

import calculateCartTotal from '../../utils/calculateCartTotal';

const CartSummary = ({ products, handleCheckout, success }) => {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    setCartEmpty(products.length === 0);
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products]);
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name="Furniture Store"
          amount={stripeAmount}
          image="/static/Logo.ico"
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          trigger="onClick"
          stripeKey="pk_test_hK7bMxdFZXJAxCLcxolZMblc"
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>
  );
};

export default CartSummary;
