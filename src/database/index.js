import mongoose from 'mongoose'

const connectToDB = async () => {
    const connectionURL = "mongodb+srv://priyabhanderi2:odoo@cluster0.vburhis.mongodb.net/Profile?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(connectionURL).then(()=>{
        console.log("Database is successfully connected");
    }).catch((err)=>{console.log("No connection")})
    
    }
export default connectToDB;

