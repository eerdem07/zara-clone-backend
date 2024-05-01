const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber:{type:Number},
    products:[{type:Schema.types.ObjectId, ref:'Product'}],
    purchaseDate:{type:Date},
    deliveryDate:{type:Date},
    shippingType:{type:String},
    adress:{type:Schema.types.ObjectId, ref:'Adress'}
});

const Order = mongoose.Model('Order',orderSchmea);

module.exports = Order;

//ürünün kodu eklenecek.

// EN SONA SAKLANACAKLAR.
// BİR ÇOK YERDE EMBEDDING YAPMAK YERİNE BEN SADECE REFERANS KULLANACAĞIM.
// VERİLER BU ŞEKİLDE ÇEKİLECEK.