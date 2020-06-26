const { expect } = require('chai');

const usersRepository = require('../../usersRepository');
const db = require('../../../models');

describe('shopRepository.getOneByName', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    fit('should return an object', async () => {
        const user = await usersRepository.getOneByEmail('mike@gmail.com');
        expect(user).to.be.an('object');
    });

    it('should throw an error if email cannot be found', async () => {
        try {
            await usersRepository.getOneByEmail('aha@gmail.com');
            throw new Error('test should have thrown an error');
        } catch (err) {
            expect(err.message).to.equal('User with email aha@gmail.com does not exist');
        }
    });
});