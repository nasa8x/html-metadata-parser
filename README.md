# Html Metadata Parser

Html Metadata scraper and parser for Node.js

☞ [How To Build a Blog with Nest.js, MongoDB, and Vue.js](https://morioh.com/p/74ffc8a798bb)

☞ [What is the difference between PM2 Cluster vs Fork Mode](https://morioh.com/p/a1c2c2503e62)

☞ [What is new Renderer in Angular 9?](https://morioh.com/p/e920f9d6cfcc)


### Install

```
npm install html-metadata-parser
```

```
yarn install html-metadata-parser
```


```js
var Meta = require('html-metadata-parser');

Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

    console.log(result);
})

```

```js
// async 

(async () => {

    var result = await Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx');

    console.log(JSON.stringify(result, null, 3));


})();

```

```js
// result

{
   "meta": {
      "title": "The Complete Node.js Developer Course (3rd Edition)",
      "description": "Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!",
      "keywords": "javascript, angular, nodejs, blockchain, MongoDB, nodejs PHP,mobile app development, Responsive Web Design, Maketing",
      "canonical": "/p/BJQWO5_Wnx"
   },
   "og": {
      "title": "The Complete Node.js Developer Course (3rd Edition)",
      "description": "Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!",
      "url": "",
      "site_name": "",
      "type": "",
      "images": [
         {
            "url": "https://i.udemycdn.com/course/750x422/922484_52a1_7.jpg"
         }
      ]
   },
   "images": [
      {
         "url": "https://i.udemycdn.com/course/750x422/922484_52a1_7.jpg"
      }
   ]
}

```

