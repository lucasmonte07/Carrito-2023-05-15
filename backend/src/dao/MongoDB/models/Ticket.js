import {Schema, model} from 'mongoose';
const ticketCollection = "ticket" // nombre de la colección

const ticketSchema = new Schema({   
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: Date,
    acount: Number,
    purchaser: {
        type: String,
        unique:true
    }    
}
)

export const ticketModel = model(ticketCollection, ticketSchema)
