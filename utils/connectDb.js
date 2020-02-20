import mongoose from 'mongoose';
const connection = {};

export const connectDb = async () => {
  try {
    if (connection.isConnected) {
      console.log('Using exisitng connection');
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('----MongoDB connected----');
    // make sure the db is connected only once
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err);
  }
};
