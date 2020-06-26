const { expect } = require('chai');
const usersRepository = require('../../usersRepository');
const db = require('../../../models');
const bcrypt = require('bcrypt');
describe('shopRepository.create', () => {
    beforeAll(async () => {
        await db.connect();
    });
    
    afterAll(async () => {
        await db.disconnect();
    });

    it('should return insertedCount when insert a new object into db collection', async () => {
        const hashedString = bcrypt.hashSync('12345', bcrypt.genSaltSync(10));
        const result = await usersRepository.create({
            'userName': 'Jane',
            'email': 'jane@gmail.com',
            'password': hashedString,
            'gender': 'female',
            'createdAt': new Date(),
            'avata': "/images/female.png"
        });
        expect(result).to.be.true;
        const user = await usersRepository.show("Jane");
        expect(user.userName).to.equal("Jane");
    });
});