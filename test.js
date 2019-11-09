
var Meta = require('./index');


// Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

//     console.log(result);
// })


(async () => {


    var result = await Meta.parser('https://www.youtube.com/watch?v=ValAnR41XaY');

    console.log(JSON.stringify(result, null, 3));


})();