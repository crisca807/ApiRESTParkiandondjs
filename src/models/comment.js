const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    IDcomentario: {
        type: Number,
        required: true
    },
    Comentario: {
        type: String,
        required: true
    },
    IDusuario: {
        type: Number,
        required: true
    },
    IDEstablecimiento: {
        type: Number,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
