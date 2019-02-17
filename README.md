### Home Page Front-end Code

This repo contains a slightly modified version of the front-end React code for [atcsportal.com](https://atcsportal.com) for demo purposes. The code can be used to build a stand-alone version of the main page.

Simply download/clone the code and:

`npm install`

and 

`npm run build`

which will produce the HTML file in the `./build` folder. 

### What's different from the live page?
Nothing much, really. The live page uses a web worker to run part of the "Game of Life" code for experimental purposes. However, browsers prevent web worker from working for `file://` paths, so it had to be modified.

### About the rest of the site
While the rest of the site will not have its code base published in its entirely, sample front- and back-end code can be found within their respective repositories ([Crypto](https://github.com/atcsrepo/Crypto-sample) and [Stock](https://github.com/atcsrepo/Stock-sample)). For a more complete sample of back-end code, try visiting this [demo project](https://glitch.com/edit/#!/glaze-tank) hosted on Glitch. All this information, and more, can be found under the "Misc Parts and Pieces" section of the [site](https://atcsportal.com).

The live application currently consists of multiple Docker containers (Nginx reverse proxy + Certbot + application) running on an AWS EC2 instance and makes use of AWS' task definitions and services functions. General notes about the set-up process can be found [here](https://github.com/atcsrepo/Misc-notes).
