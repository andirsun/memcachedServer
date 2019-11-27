const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let valideRoles = {
    values: ['USER_ROLE','USER_VIP_ROLE'],
    message: '{VALUE} no es un rol válido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    id:{
        type:Number,
        require:[true,'id its necesary'],
        default: 0
    },
    name: {
        type: String,
        required: [true, 'The name its necessary']
    },
    phone: {
        type: Number,
        unique: true, 
        required: [true, 'phone its necesary']
    },
    lastName: {
        type: String,
        required: [true, 'Last name its necesary']
    },
    birth: {
        type: Date,
        required: [true, 'birth its necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email must be unique']
    },
    password:{
        type: String,
        required: [true, 'password its necesary']
    },
    address: {
        type: String,
        required: [true, 'address is necesary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


usuarioSchema.methods.toJSON = function() {
    //delete password in the user object 

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });


module.exports = mongoose.model('User', usuarioSchema);