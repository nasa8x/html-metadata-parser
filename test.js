
var Meta = require('./index');


// Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

//     console.log(result);
// })


(async () => {


    var result = await Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx');

    console.log(JSON.stringify(result, null, 3));


})();


// var html = ` <div>
//                     < span > Some HTML here</span>
//             </div >    `

// var res = Meta.parseHtml(html)
// console.log(res)


(async () => {

    var html = `  <head>
    <meta charset="UTF-8">
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>  `

    var res = await Meta.parseHtml(html)
    console.log(JSON.stringify(res, null, 3));


})();
