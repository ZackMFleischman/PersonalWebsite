# PersonalWebsite
This repository has all the code for my website [ZackMFleischman.com](www.zackmfleischman.com).

This site is built in Typescript using React/Redux to store state. The use of redux is not particularly necessary as this site isn't dynamic and doesn't change state, but it allows me to control the entirety of the content of the site by modifying a [single YAML file](https://github.com/ZackMFleischman/PersonalWebsite/blob/master/configs/store.yaml)! ^_^

### How to build and deploy

- Build dev and run with webpack-dev-server: `npm start`
- Build prod and deploy to the webz: `npm run deploy`
