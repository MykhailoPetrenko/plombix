const express = require('express');
const router = express.Router();
let MongoClient = require('mongodb').MongoClient;
// let mongo = require('mongodb');
// let nodemailer = require('nodemailer');
let Plombs = require('../models/Plomba');
let Cart =  require('../models/cart');


/*****************************************************************/
                /*MAIN PAGE*/
/****************************************************************/
router.get('/', function (req,res) {
    Plombs.find({},function (err, data) {
        res.render("main/index", {});
    });
});

/*****************************************************************/
/*CATEGORY PAGE*/
/****************************************************************/
router.get('/category', function (req,res) {
    const category = req.query.category_name;
    Plombs.find({"category": category}, function (err, data) {
        res.render('main/category', {plombs : data});
    })
   /* MongoClient.connect('mongodb://localhost', function (err, client) {
        if(err) throw err;
        let db= client.db('Plombix');
        db.collection('Plombs').find({"category": category}).toArray((err, data)=>{
            res.render('main/category', {plombs : data});
        });
        client.close();
    });*/
});

/*****************************************************************/
/*PRODUCT PAGE*/
/****************************************************************/

router.get('/product', function (req,res) {
    const plomb = req.query.plomb_name;
    let plombData;

    async function getPlombs(){
        await Plombs.aggregate([{$sample:{size:4}}], function (err ,data) {
            plombData = data;
        });
    }
    async function pushPlombs(){
        await getPlombs();
        Plombs.find({"plomb_name": plomb}, function (err, data) {
            res.render('main/product', {plomba : data, recomend: plombData, products: req.session.cart ? req.session.cart : {items:{}}});
        });
    }
    pushPlombs();
    /* MongoClient.connect('mongodb://localhost', function (err, client) {
         if(err) throw err;
         let db= client.db('Plombix');
         db.collection('Plombs').find({"plomb_name": plomb}).toArray((err, data)=>{
             plombData = data;
         });
         db.collection('Plombs').aggregate([{$sample:{size:4}}]).toArray((err,data)=>{
             res.render('main/product', {plomba : plombData, recomend: data});
         });
         client.close();
     });*/
});
router.get('/cart', function (req,res) {
    res.render('main/cart',{products: req.session.cart ? req.session.cart : {}})
});

/*****************************************************************/
/*SEND EMAIL*/
/****************************************************************/


/*
router.get('/send', (req,res)=>{
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Pass: ${req.body.pass}</li>
        <li>IsCheck: ${req.body.check}</li>
    </ul>
    `;
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'user',
                pass:  'password'
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '<Mykhailo@>', // sender address
            to: 'Mykhailo@', // list of receivers
            subject: 'Hello from NodeJS', // Subject line
            text: "",
            html: '<H1></H1>' // html body
        }, (error, info) => {
            res.redirect('/');
        });

        //console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);


});
*/
/*
regex: (.*[chert.jpg])

 <%plomba.forEach(function (p) { %>
                                        <%for(i in p.image){%>
                                        <div class="product-slider-dots__item"><img class="product-slider-dots__img" src="<%=p.image[i]%>" alt="Превью продукта"></div>
                                        <%}%>
                                    <%})%>
 */

/*****************************************************************/
/*PRODUCTS PAGE*/
/****************************************************************/

router.get('/products', function (req,res) {
    Plombs.find({}, function (err, data) {
        res.render('main/products', {plombs : data, products: req.session.cart ? req.session.cart : {items:{}}});
    });
 /*   MongoClient.connect('mongodb://localhost', function (err, client) {
        if(err) throw err;
        let db= client.db('Plombix');
        db.collection('Plombs').find({}).toArray((err, data)=>{
            res.render('main/products', {plombs : data});
        });
        client.close();
    });*/
});

/*****************************************************************
                               SEARCH PAGE
/****************************************************************/

router.post('/search', function (req,res) {
    let reg ='.*' + req.body.search_text +'.*';
    Plombs.find({plomb_search : {$regex: reg, $options:"i"}}, function (err, data) {
        res.render('main/search', {plombs : data, reque: req.body.search_text});
    });
  /*  MongoClient.connect('mongodb://localhost', function (err, client) {
        if(err) throw err;
        let db= client.db('Plombix');
        db.collection('Plombs').find({plomb_search : {$regex: reg, $options:"i"}}).toArray((err, data)=>{
            res.render('main/search', {plombs : data, reque: req.body.search_text});
        });
        client.close();
    });*/
});

/********************************************************************
                             ADD TO CART
 *******************************************************************/
router.post('/add-to-cart', function (req, res, next) {
    let plombName = req.body.plombName;
    let count = req.body.count_plombs;

    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Plombs.find({"plomb_name": plombName}, function (err, data) {
        if(err) return res.redirect('/');

        cart.add(data[0], data[0].plomb_name, count);
        req.session.cart = cart;
        console.log('---------------------------------------');
        console.log(req.session.cart);
        console.log('---------------------------------------');

        res.send('ASDSDS');
    })
});
router.post('/delete-from-cart', function (req,res,next) {
    let plombName = req.body.plombName;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.delete(plombName);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.send('123');

});

module.exports.route = router;
