import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
vedioFile: {
    type: String, //cloudinary Url
required: true
},
thumbnail:{
    type: String, 
    required: true
},

description:{
    type: String, 
    required: true
},

duration:{
    type: Number, 
    required: true
},
views:{
    type: Number,
    default:0
},
isPublished:{
    type: Boolean,
    default: true
},
owner:{
    type: Schema.Types.ObjectId,
    ref: "User"
}
},
    {
        timestamps:true
    }
)

VideoDecoder.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)