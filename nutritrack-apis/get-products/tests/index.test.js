const handler = require('../dist/index');
const axios = require('axios');

const mockData = { 
    "status": 200,
    "data": {"products": [{"_id":"12345", "product_name":"Test Product", "product_name_en": "Test Product"}]}        
};

jest.mock('axios', () => {
    return {
        get: jest.fn().mockResolvedValue({ 
            "status": 200,
            "data": {"products": [{"_id":"12345", "product_name":"Test Product", "product_name_en": "Test Product"}]}        
        })
    }
});

const mockedAxios = jest.mocked(axios);

test("Check whether response is successful", async () => {
    
    mockedAxios.get.mockResolvedValue(mockData);
    const event = {
        "queryStringParameters": {
            "search_term": "Coke"
        }
    }

    const response = await handler.handler(event);

    expect(response.statusCode).toBe(200);
        expect(JSON.parse(JSON.stringify(response))).toEqual({
            "statusCode": 200,
            "body": [{"_id":"12345", "product_name":"Test Product", "product_name_en": "Test Product"}]
        })
});

test('Should handle error from Axios', async() => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const event = {
        "queryStringParameters": {
            "search_term": "Coke"
        }
    }
    const response = await handler.handler(event);
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
    const response = await handler.handler(event);
    
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(JSON.stringify(response))).toEqual({
        "statusCode": 200,
        "body": [{"_id":"12345", "product_name":"Test Product"}]
    })
});