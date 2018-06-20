const mongoose      = require('mongoose');
const schema        = mongoose.Schema;

const PostSchema = new schema({
    user_id: {
        type: String,
        required: [true, 'User id is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    }
});

module.exports = mongoose.model('post', PostSchema);