const { expect } = require('chai');

const usersRepository = require('../../usersRepository');
const db = require('../../../models');

describe('usersRepository.getAll', () => {
    beforeAll(async () => {
        await db.connect();
    });
    
    afterAll(async () => {
        await db.disconnect();
    });
    
    it('should return an array', async () => {
        const users = await usersRepository.getAll();
        expect(users).to.be.an('array');
    });

    it('should return an array of all users, and one of the users has userName is "Juliet"', async () => {
        const users = await usersRepository.getAll();
        const userOne = users.find(user => user.userName === 'Juliet');
       
        expect(userOne.userName).to.equal('Juliet');
    });

    
});