import {
  Header,
  Icon,
  Item,
  Message,
  Segment,
  Button
} from 'semantic-ui-react';
import { useRouter } from 'next/router';

const CartItemList = ({ products, user, success, handleRemoveFromCart }) => {
  const router = useRouter();

  const mapCartProductsToItems = products => {
    return products.map(
      ({ quantity, product: { _id, name, mediaUrl, price } }) => ({
        childKey: _id,
        header: (
          <Item.Header as="a" onClick={() => router.push(`/product/${_id}`)}>
            {name}
          </Item.Header>
        ),
        image: mediaUrl,
        meta: `${quantity} x $${price}`,
        fluid: 'true',
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => handleRemoveFromCart(_id)}
          />
        )
      })
    );
  };

  if (success) {
    return (
      <Message
        success
        header="Success!"
        content="Your order and payment has been accepted."
        icon="star outline"
      />
    );
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="blue" inverted textAlign="center">
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Keep Shopping!
        </Header>
        <div>
          {user ? (
            <Button color="teal" onClick={() => router.push('/')}>
              View Products
            </Button>
          ) : (
            <Button color="teal" onClick={() => router.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return <Item.Group items={mapCartProductsToItems(products)} divided />;
};

export default CartItemList;
