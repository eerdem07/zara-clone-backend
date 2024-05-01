const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber:{type:Number,required:true},
    products:[{type:Schema.types.ObjectId, ref:'Product'}],
    purchaseDate:{type:Date},
    deliveryDate:{type:Date},
    shippingType:{type:String},
    adress:{type:Schema.types.ObjectId, ref:'Adress'}
});

const Order = mongoose.Model('Order',orderSchmea);

module.exports = Order;

// SchemaTypes: required, default, select, validate, get, set, alias, immutabe, transform
// indexes: index, unique, sprase
// String: lowercase, uppercase, trim, match, enum, minLength, maxLength, populate
// Number: min, max, enum, populate
// Date: min, max, expires
// ObjectId: populate

//ürünün kodu eklenecek.

// EN SONA SAKLANACAKLAR.
// BİR ÇOK YERDE EMBEDDING YAPMAK YERİNE BEN SADECE REFERANS KULLANACAĞIM.
// VERİLER BU ŞEKİLDE ÇEKİLECEK.