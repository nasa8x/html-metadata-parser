# Html Metadata Parser

Html Metadata scraper and parser for Node.js


### Install

```
npm install html-metadata-parser
```

```
yarn install html-metadata-parser
```


```js
const { parser } = require('html-metadata-parser');

parser('https://www.youtube.com/watch?v=eSzNNYk7nVU').then(result=>{
   console.log(JSON.stringify(result, null, 3));
})

```

```js
// async 
const { parser } = require('html-metadata-parser');
(async () => {
    var result = await parser('https://www.youtube.com/watch?v=eSzNNYk7nVU');
    console.log(JSON.stringify(result, null, 3));
})();

```

```js
// result

{
   "og": {
      "site_name": "YouTube",
      "url": "https://www.youtube.com/watch?v=eSzNNYk7nVU",
      "title": "Rebuilding iOS 15 with Tailwind CSS",
      "image": "https://i.ytimg.com/vi/eSzNNYk7nVU/maxresdefault.jpg",
      "description": "In this video, I'll show you how to rebuild the new Notification Summary UI from iOS 15 using Tailwind CSS.Source code: https://play.tailwindcss.com/kY4LYXwsNZ",
      "type": "video.other"
   },
   "meta": {
      "title": "Rebuilding iOS 15 with Tailwind CSS",
      "description": "In this video, I'll show you how to rebuild the new Notification Summary UI from iOS 15 using Tailwind CSS.Source code: https://play.tailwindcss.com/kY4LYXwsNZ"
   },
   "images": []
}

```

☞ [15 Best Visual Studio Code Themes of 2021](https://morioh.com/p/fc50cc45927f)

☞ [What is the difference between PM2 Cluster vs Fork Mode](https://morioh.com/p/a1c2c2503e62)

☞ [Lightbox Photo Grid and Slideshow component for Vue.JS?](https://morioh.com/p/da2adf3f7eac)

Contributing
------------

Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

Community
------------
Stay up to date on the development of Morioh UI and reach out to the community with these helpful resources.

Follow [@codek_tv](https://twitter.com/codek_tv) and [@im_a_developer](https://twitter.com/im_a_developer) on Twitter.

Follow [Morioh](https://www.facebook.com/moriohdotcom) and [Javascript Developers](https://www.facebook.com/javascript4u/) on FaceBook.

Join the official [Discord](https://discord.gg/sqxU6un) room: [https://discord.gg/sqxU6un](https://discord.gg/sqxU6un).
