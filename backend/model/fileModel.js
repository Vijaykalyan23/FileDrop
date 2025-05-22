import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },


})
const fileModel = mongoose.model('file',fileSchema);
export default fileModel;