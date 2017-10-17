var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const ArticleSchema = new Schema({
    createdAt :{ type: Date },
    updatedAt   :{ type: Date },
    isDeleted   :{ type: Boolean, default: false }

    , category : String

    , articleName: { type: String, required: true }
    , content: { type: String, required: true }
    //, author: { type: Schema.Types.ObjectId, ref: 'User', required: true}
    , comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

module.exports = mongoose.model('Article', ArticleSchema);
