import { Header, Segment, Button, Icon } from 'semantic-ui-react';

function CartItemList() {
  const user = true;

  return (
    <Segment secondary color="blue" inverted textAlign="center">
      <Header icon>
        <Icon name="shopping basket" />
        No products in your cart. Keep Shopping!
      </Header>
      <div>
        {user ? (
          <Button color="teal">View Products</Button>
        ) : (
          <Button color="teal">Login to Add Products</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
