const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    user: {

    },
    title: {
        type: string,
        require: true,
    },
    status: {
        type: string,
        default: 'public',
    },
    allowComments: {
        type: string,
        require: true,
    },
    body: {
        type: string,
        require: true,

    }
});