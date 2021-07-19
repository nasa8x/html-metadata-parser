
const { parser } = require('./dist');


(async () => {

    var result = await parser('https://www.youtube.com/watch?v=eSzNNYk7nVU');

    console.log(JSON.stringify(result, null, 3));

})();