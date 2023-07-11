var mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let blogSchema = new mongoose.Schema({
    date:{
        type: Date,
        default:null
    },
    title:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null // for image we can use aws s3 bucket with multer 
    },
    link:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
    }
},{
    timestamps: true
});

blogSchema.plugin(mongoosePaginate);
exports.blogModel = mongoose.model('blogs', blogSchema);