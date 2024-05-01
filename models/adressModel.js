const mongoose = require('mongoose');

const adressSchema = new mongoose.Schema({
    name: {type:String,required:true, minLength:2},
    surname:{type:String,required:true, minLength:2},
    city:{type:String,required:true},
    district:{type:String, required:true},
    location:{type:String,required:true},
    postalCode:{type:Number,required:true},
    country:{type:String,required:true},
    areaCode:{type:Number,required:true},
    phoneNumber:{type:Number,required:true}
})

const Adress = mongoose.model('adress',adressSchema);

module.exports = Adress;


// SchemaTypes: required, default, select, validate, get, set, alias, immutabe, transform
// indexes: index, unique, sprase
// String: lowercase, uppercase, trim, match, enum, minLength, maxLength, populate
// Number: min, max, enum, populate
// Date: min, max, expires
// ObjectId: populate
