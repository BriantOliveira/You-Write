var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comments = require('./comment');

const ArticleSchema = new Schema({
    createdAt   :{ type: Date },
    updatedAt   :{ type: Date },
    isDeleted   :{ type: Boolean, default: false }

    , category: {
        type: String
    }
    , articleName: {
        type: String,
        required: true
    }
    , content: {
        type: String,
        required: true
    }
    , _creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
    , comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

});

ArticleSchema.pre('save', function (next) {
   now = new Date();
   this.updatedAt = now;
   if ( !this.createdAt ) {
       this.createdAt = now;
   }
   next();
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;