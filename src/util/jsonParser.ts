export function jsonParser(json:string){
	return JSON.parse((JSON.stringify(json)));
}