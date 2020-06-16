module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                userName: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 30
                },
                email: {
                    bsonType: "string",
                },
                password: {
                    bsonType: "string",
                    minLength: 5
                },
                avata: {
                    bsonType: "string"
                },
                gender: {
                    bsonType: "string"
                },
                createdAt: {
                    bsonType: "date"
                }
            },
            required: [
                "userName", "email", "password"
            ]
        }
    }
}