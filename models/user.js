const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name field is require']
    },
    password: {
        type: String,
        required: [true, 'ID is required']
    }
}); 

module.exports = mongoose.model('user', UserSchema);