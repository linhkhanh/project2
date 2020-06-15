module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                userName: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 15
                },
                email: {
                    bsonType: "string",
                    pattern: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
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
            },
            required: [
                "userName", "email", "password"
            ]
        }
    }
}