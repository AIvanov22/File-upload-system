import mongoose from 'mongoose';

const metaDataSchema = new mongoose.Schema({
  name: {
	type: String,
	required: true,
  },
  size: {
	type: Number,
	required: true,
  },
  contentType: {
	type: String,
	required: true,
  },
  loading: {
	type: Boolean,
	required: true,
  },
  error: {
	type: Boolean,
	required: true,
  }
});

const metaData = mongoose.model('metaData', metaDataSchema);

export default metaData;
