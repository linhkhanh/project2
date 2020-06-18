module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                id: {
                    bsonType: "string",
                },
                url: {
                    bsonType: "string",
                },
                description: {
                    bsonType: "string",
                },
                userName: {
                    bsonType: "string"
                },
                comment: {
                    bsonType: "array"
                },
                createdAt: {
                    bsonType: "date"
                }
            },
            required: [
                "id", "url", "createdAt", "userName"
            ]
        }
    }
}