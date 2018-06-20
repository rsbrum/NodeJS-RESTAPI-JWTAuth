const UserSchema = require('../models/user');

describe('create new user', () => {
    it('saving new user', (done) => {
        var user = new UserSchema({
           name: 'First User',
           id: 1
        });
        user.save().then( () => {
            done();
        })
    });
});