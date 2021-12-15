const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var People = require('../models/people');

router.get('/GET/person',(req,res) => {
    People.find((err,docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in retriving People : ' + JSON.stringify(err, undefined, 2)); }
    });
})

router.get('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    }

    People.findById(req.params.id,(err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Person : ' + JSON.stringify(err,undefined,2)); }
    })
})

router.post('/POST/person',(req,res) => {
    var people = new People({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        mobile: req.body.mobile
    })
    people.save((err,doc) => {
        if (!err) {res.send(doc)}
        else { console.log("Error in Employee Save : "+JSON.stringify(err,undefined,2)); }
    });
})

router.put('/PUT/person/:id',(req,res) => {
    if (ObjectId.isValid(req.params.id)) {
        let person = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mobile: req.body.mobile
        }
        People.findByIdAndUpdate(req.params.id,{ $set: person }, { new: true },(err,doc) => {
            if (!err) { res.send(doc); }
            else { console.log('No record with given id : ' + JSON.stringify(err,undefined,2)); }
        })
    } else{
    return res.status(400).send(`No record found with ${req.params.id}`);
    }
})

router.delete('/DELETE/person/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    }
    People.findByIdAndRemove(req.params.id,(err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in person delete : ' + JSON.stringify(err,undefined,2)); }
    })
})


module.exports = router;