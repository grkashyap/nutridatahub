const axios = require('axios');
const { handler } = require('../index');

jest.mock('axios');

describe('Lambda Fucntional tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return successful response', async() => {
        const mockData = { 
            "status": 200,
            "data": {"products": [{"_id":"12345", "product_name":"Test Product"}]} 
        };
        axios.get.mockResolvedValue(mockData);

        const event = {
            "queryStringParameters": {
                "search_term": "Coke"
            }
        }
        const response = await handler(event);
        
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(JSON.stringify(response))).toEqual({
            "statusCode": 200,
            "body": [{"_id":"12345", "product_name":"Test Product"}]
        })
    });

    test('Should handle error from Axios', async() => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const event = {
            "queryStringParameters": {
                "search_term": "Coke"
            }
        }
        const response = await handler(event);
        expect(response.statusCode).toBe(500);
    });

    test('Should return successful response for second page', async() => {
        const mockData = { 
            "status": 200,
            "data": {"products": [{"_id":"12345", "product_name":"Test Product"}]} 
        };
        axios.get.mockResolvedValue(mockData);

        const event = {
            "queryStringParameters": {
                "search_term": "Coke",
                "page_num": 2
            }
        }
        const response = await handler(event);
        
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(JSON.stringify(response))).toEqual({
            "statusCode": 200,
            "body": [{"_id":"12345", "product_name":"Test Product"}]
        })
    });
});