import {GraphQLClient} from "graphql-request";

export function jsonParser(json:string){
	return JSON.parse((JSON.stringify(json)));
}


export function checkInput(values: string[]) {
	let isNun = true;
	for (const value of values) {
		if (value) {
			isNun = isNun && /^\d+$/.test(value);
		}
	}
	return isNun;
}

export function createGraphqlClient(token?:string) {
	const endpoint = process.env.SERVER_URL!;
	console.log(endpoint);
	return new GraphQLClient(endpoint, { headers: {Authorization:"Bearer " +token} });
}