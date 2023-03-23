import mongoose from "mongoose";
import {createHmac} from 'crypto'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true,
        lowercase: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})
userSchema.methods = {

    // check password in login
    authenticate(password){
        try {
            return this.password == this.encryPassword(password)
        } catch (error) {
            console.log(error);
        }
    },
    encryPassword(password){
        
        try {
            return createHmac("sha256", "123456").update(password).digest('hex')
        } catch (error) {
            console.log(error);
        }
    }
}
userSchema.pre("save", function(next) {
    try {
        this.password = this.encryPassword(this.password)
        next();
    } catch (error) {
        console.log(error);
    }
})
export default mongoose.model('User',userSchema);   