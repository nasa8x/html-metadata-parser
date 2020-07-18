
var Meta = require('./index');


// Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

//     console.log(result);
// })


(async () => {


    var result = await Meta.parser('https://www.youtube.com/watch?v=GN2nFJ9Ku6Q');

     console.log(JSON.stringify(result, null, 3));


})();