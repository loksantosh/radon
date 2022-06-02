const express = require('express');
const {chunk} = require('lodash');
const {tail} = require('lodash');
const {unionBy} = require('lodash');
const {fromPairs} = require('lodash');


const router = express.Router();

router.get('/hello', function (req, res) {
    let  array1=[]
    array1=tail([1,3,5,7,9,11,12,13,15,17])
    
        
        console.log(array1)
    res.send('My tail Assignment')
});



router.get('/hello1', function (req, res) {
    let  array1=[]
    array1=chunk(["january","February","March","April","May","June","july","August","september","October","November","December"],3)
    
        
        console.log(array1)
    
    
    
    res.send('My chunk  Assignment')
});

router.get('/hello2', function (req, res) {
    let  array1=[1,2,3]
    let  array2=[2,3,4]
    let  array3=[3,4,5]
    let  array4=[5,6,7]
    let  array5=[6,7,8]
    let arrayCombine=unionBy(array1,array2,array3,array4,array5)
    
        
        console.log("this is the Unioned array  "+arrayCombine)
    
    
    
    res.send('My Union Assignment')
});


router.get('/hello3', function (req, res) {
    let array=[
        ['horror', 'the shinning'], 
        ['drama', 'titanic'], 
        ['thriller', 'shutter island'],
        ['fantacy' , 'Pans Labyrinth']
    ]
    let combo = fromPairs(array);
    
        console.log(combo)
    
    
    
    res.send('My fromPairs  Assignment')
});




module.exports = router;
// adding this comment for no reason