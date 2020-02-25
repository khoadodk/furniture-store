const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://furniture-store.now.sh'
    : 'http://localhost:3000';

export default baseUrl;
