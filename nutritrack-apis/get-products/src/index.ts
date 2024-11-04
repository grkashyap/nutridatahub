import getAllProducts from "./utils/getAllProducts";
import { APIGatewayEvent, Handler } from "aws-lambda";

export const handler: Handler = async(event: APIGatewayEvent) => {

  if(!event || !event.queryStringParameters) {
    console.error("Event object is undefined")
  }

  if(!event.queryStringParameters) {
    return {
      status: 500,
      body: "Query string is empty"
    }
  }

  let searchTerm: string = "";
  if(event.queryStringParameters.search_term) {
    searchTerm = event.queryStringParameters.search_term;
  }
  
  let pageNum:Number = 1;
  if(event.queryStringParameters.page_num) {
    pageNum = parseInt(event.queryStringParameters.page_num);
  }

  const response = await getAllProducts(searchTerm, pageNum);

  return response;
}