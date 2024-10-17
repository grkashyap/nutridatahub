import getAllProducts from "./utils/getAllProducts";
import { APIGatewayEvent, Handler } from "aws-lambda";

export const handler: Handler = async(event: APIGatewayEvent) => {

  const searchTerm = event.queryStringParameters.search_term;
  const pageNum = parseInt(event.queryStringParameters.page_num) || 1;

  const response = await getAllProducts(searchTerm, pageNum);

  return response;
}