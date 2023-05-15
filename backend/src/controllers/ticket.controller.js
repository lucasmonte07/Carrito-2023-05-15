import mongoose from 'mongoose';
import { ticketModel } from '../dao/MongoDB/models/Ticket.js'

export default class ManagerTicket {    
     
    constructor(collection, schema) {
        this.url = process.env.MONGODBURL;
        this.collection = "ticket";
        this.schema = ticketModel.schema
        this.model = mongoose.model(this.collection, this.schema)
    }
        
    async setConnection() {
        try {
            await mongoose.connect(this.url)
            console.log("MongoDB connected")
        } catch(error) {
            console.log("Connection MongoDB failed", error)
            return error
        }
    }    

    async getElements() {
        this.setConnection()
        try {
            const elements = await this.model.find()
            return elements
        } catch(error) {
            console.log("Error en consulta de elementos MongoDB", error)
        }
    }

    async addElements(elements) {         
        
        this.setConnection()

        let codex = elements.code 
        let purchase_datetimex = elements.purchase_datetime
        let acountx = elements.acount
        let purchaserx = elements.purchaser

        let todiitos = {
            code: codex, 
            purchase_datetime: purchase_datetimex, 
            acount: acountx, 
            purchaser: purchaserx,                    
        }

        console.log(todiitos)
                
        try {
            const ticketAdd = await this.model.insertMany(todiitos)            
            return ticketAdd
        } catch(error) {
            console.log("Error al agregar elemento/s en MongoDB", error)
        }
    }

    
    async getElementById(id) { //Agrego 1 o varios elementos
           this.setConnection()
           try {
            const ticketFind =  await this.model.findById(id) 
            return ticketFind
           } catch (error) {
               return error
           }
       }

    async updateElementById(id, ...info) {
        this.setConnection()        
        try {
            const ticketUpdate = await this.model.findByIdAndUpdate(id, ...info)
            return ticketUpdate
        } catch(error) {
            console.log("Error en Update de elemento en MongoDB", error)
        }
    }

    async deleteElement(id) {
        this.setConnection()        
        try {
            const ticketDelete = await this.model.findByIdAndRemove(id)
            return ticketDelete
        } catch(error) {
            console.log("Error al eliminar elemento en MongoDB", error)
        }
    }    
    
}