
var Meta = require('./index');


// Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

//     console.log(result);
// })


(async () => {


    var result = await Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx');

    console.log(JSON.stringify(result, null, 3));


})();


var html = ` <div>
                    < span > Some HTML here</span>
            </div >    `

var res = Meta.parseHtml(html)
console.log(res)

