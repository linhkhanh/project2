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
                biography: {
                    bsonType: "string",
                    minLength: 5,
                    maxLength: 100
                },
                avata: {
                    bsonType: "string"
                },
                female: {
                    bsonType: "bool"
                },
                male: {
                    bsonType: "bool"
                },
                birthDay: {
                    bsonType: "date"
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