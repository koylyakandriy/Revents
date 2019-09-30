import { sampleData } from "../data/sampleData";

const delay = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchSampleData = () => {
	return delay(1000).then(() => {
		return Promise.resolve(sampleData);
	});
};
