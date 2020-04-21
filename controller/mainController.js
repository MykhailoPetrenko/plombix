const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
// let nodemailer = require('nodemailer');
let Plombs = require('../models/Plomba');
let Cart =  require('../models/cart');


/*****************************************************************
                         MAIN PAGE
/****************************************************************/
router.get('/', function (req,res) {
    Plombs.find({},function (err, data) {
        res.render("main/index", {});
    });
});

/*****************************************************************
                            CATEGORY PAGE
/****************************************************************/
router.get('/category', function (req,res) {
    const category = req.query.category_name;
    Plombs.find({"category": category}, function (err, data) {
        res.render('main/category', {plombs : data});
    })
});

/*****************************************************************
                            PRODUCT PAGE
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
});
router.get('/cart', function (req,res) {
    res.render('main/cart',{products: req.session.cart ? req.session.cart : {}})
});

/*****************************************************************
                            SEND EMAIL
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

/*****************************************************************
                        PRODUCTS PAGE
/****************************************************************/

router.get('/products', function (req,res) {
    Plombs.find({}, function (err, data) {
        res.render('main/products', {plombs : data, products: req.session.cart ? req.session.cart : {items:{},totalQty:0}});
    });
});

/*****************************************************************
                               SEARCH PAGE
/****************************************************************/

router.post('/search', function (req,res) {
    let reg ='.*' + req.body.search_text +'.*';
    Plombs.find({plomb_search : {$regex: reg, $options:"i"}}, function (err, data) {
        res.render('main/search', {plombs : data, reque: req.body.search_text});
    });
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

        res.status(200).send('Success');
    })
});
router.post('/delete-from-cart', function (req,res,next) {
    let plombName = req.body.plombName;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.delete(plombName);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.status(200).send('Success');

});
router.get('/get-data-post', function (req,res,next) {
    let jsonData = {
        "apiKey": config.apiKey,
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName": req.query.sity
        }
    };
    let sendReq = {
       uri :'https://api.novaposhta.ua/v2.0/json/',
       body: JSON.stringify(jsonData),
       method:'POST',
       headers: {
            'Content-Type': 'application/json'
       }
    };
    request(sendReq, function (err, response) {
        let city = [];
        JSON.parse(response.body).data.filter((i)=>{
            city.push(i.DescriptionRu)
        });
        res.send({city:city})
    });
});

module.exports.route = router;
