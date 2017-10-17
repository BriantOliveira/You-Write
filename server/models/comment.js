//Calling dependencies
const mongoose = require('mongoose');
//Creating Schema model
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    createdAt   :{ type: Date }
    ,updatedAt  :{ type: Date }
    ,author  :{ type: Schema.ObjectId, ref: 'User', require: true }
    ,comments :{ type: String, required: true }
});

// CommentSchema.pre('save', function(next) {
//     now = new Date();
//     this.updatedAt = now;
//     if ( !this.createdAt ) {
//         console.log("pass");
//         this.createdAt = now;
//     }
//     next();
// });



module.exports = mongoose.model('Comment', CommentSchema);