const { expect } = require('chai');
const usersRepository = require('../../usersRepository');
const db = require('../../../models');

describe('shopRepository.show', () => {
    beforeAll(async () => {
        await db.connect();
    });
    
    afterAll(async () => {
        await db.disconnect();
    });

    it('should return one object user, and has userName is mike', async () => {
        const user = await usersRepository.show('mike');
        expect(user).to.be.an('object');
        expect(user.userName).to.equal('mike');
    });

    it('should return an error if I am searching for "aha" which does not exist',  async () => {
        try {
            await usersRepository.show('aha');
        } catch(err) {
            expect(err.message).to.equal('Non-existance'); 
        }
    });
});