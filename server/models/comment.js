let mongoose = require('mongoose');
Schema = mongoose.Schema;

let CommentSchema = new Schema({
    createdAt   :{ type: Date }
    ,updatedAt  :{ type: Date }
    ,comments :{ type: String, required: true }
});

CommentSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        console.log("pass")
        this.createdAt = now;
    }
    next();
});



module.exports = mongoose.model('Comment', CommentSchema);