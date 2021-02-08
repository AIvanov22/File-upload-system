import { getPresignedPostData } from '../controllers/AwsS3Upload.js';

export default {
  Mutation: {
	createMetaData: async (parent, { input: { name, size, contentType } }, { models: { metaData } }) => {
	  const dbData = await metaData.create({
		name,
		size,
		contentType,
		loading: true,
		error: false,
	  });

	  const { url, fields } = await getPresignedPostData(name, size, contentType);

	  return {
	    _id: dbData._id,
		...dbData,
		url,
		fields: JSON.stringify(fields),
	  }
	},
	updateLoadingStatus: async (parent, { input: { _id, loading, error } }, { models: { metaData } }) => {
	  return await metaData.updateOne({ _id }, { loading, error });
	}
  },
};
