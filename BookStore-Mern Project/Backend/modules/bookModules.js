import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        aurthour:{
            type: String,
            required: true,
        },
        publishYear:{
            type: String,
            required: true,
        }
    },
        {
        timestaps: true
        },
    
);

export const Book= mongoose.model('Cat', bookSchema);