export type body = {
    "_id": string,
    "_product_name_en": string,
    "_product_name": string
}

export type result = {
    "status": Number,
    "data": body,
    "hasError": boolean,
    "error"?: string
}