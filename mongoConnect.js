import mongoose from 'mongoose';

const connect = async () => {
  const URL = process.env.DB_URI;

  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once('open', () => {
    console.log('🔗 Connected to Mongo');
  });

  return db;
};

export default connect;
