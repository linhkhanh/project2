module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
            userName, email, password
            ],
            properties: {
                userName: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 15

                },
                email: {
                    bsonType: "string",
                    format: "email"
                },
                password: {
                    bsonType: "string",
                    minLength: 5
                },
                biography: {
                    bsonType: "string",
                    minLength: 5,
                    maxLength: 100
                },
                avata: {
                    bsonType: "string"
                }
            }
        }
    }
}