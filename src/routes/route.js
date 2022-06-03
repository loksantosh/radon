const express = require('express');
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});



router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})
//----------------------------------Sahiba Mam Assignment---------------------------------------------------------------------------------------------------

router.get('/movies', function (req, res) {
    
    let movies = ['avatar','hitman','RRR','bahubali']
     res.send(movies)
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/movies/:movieIndex', function (req, res) {
    
    let movies = ['avatar','hitman','RRR','bahubali']
    let output=0
   if(req.params.movieIndex>movies.length){
         output="error use a valid index"
         res.send(output)
    }
    else{
        let movieout=movies[req.params.movieIndex]
        
                res.send(movieout)
                
            }

        
    });

    //---------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/films', function (req, res) {
    
    let movies = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]
res.send(movies)
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/films/:filmid', function (req, res) {
    
    let movies = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]

       let output=0
    if(req.params.filmid>movies.length+1){
         output="No movie exists with this id"
         res.send(output)
    }
    else{
        let movieout=movies[req.params.filmid-1]
        
                res.send(movieout)
                
            }
      
       
    
});















//------------------------------------------------ pritesh Sir ASSignment-----------------------------------------------------------------------------------------
router.get("/api1", function (req, res) {
   
    let original=[1,2,3,4,5,6,7,8,9]
    let array=[1,2,3,4,5,7,8,9]
     
    let sum=0
    let sum2=0
    for(let i=0;i<original.length;i++){
      
     sum=sum +original[i]
      }
    let OriginalSum=sum
    
    for(let i=0;i<array.length;i++){
      
        sum2=sum2 +array[i]
         }
       let WrongSum=sum2
    
    
    let miss=OriginalSum-WrongSum
  
    res.send(  { data: miss }  );
  });


  //-------------------------------------------------------------------------------------------------------------------------------------------------------

  router.get("/api2", function (req, res) {
   
    let given=[56,57,58,60,61,62,63,64,65]
    let arr=[]
    let ori=given[0] 
 
for(let i=0;i<=given.length;i++){
    arr.push(ori)
    ori=ori+1

}


let original=arr



let sum=0
let sum2=0
for(let i=0;i<original.length;i++){
  
 sum=sum +original[i]
  }
let OriginalSum=sum

for(let i=0;i<given.length;i++){
  
    sum2=sum2 +given[i]
     }
   let WrongSum=sum2


let miss=OriginalSum-WrongSum

  
    res.send(  { data: miss }  );
  });


 


module.exports = router;
// adding this comment for no reason