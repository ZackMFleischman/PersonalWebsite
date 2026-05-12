# PersonalWebsite
This repository has all the code for my website [ZackMFleischman.com](https://www.zackmfleischman.com).

This site is built in Typescript using React/Redux to store state. The use of redux is not particularly necessary as this site isn't dynamic and doesn't change state, but it allows me to control the entirety of the content of the site by modifying a [single YAML file](https://github.com/ZackMFleischman/PersonalWebsite/blob/master/configs/store.yaml)! ^_^

### How to build and deploy

- Build dev and run with webpack-dev-server: `npm start`
- Build prod and deploy to GitHub Pages: `npm run deploy`

`npm run deploy` runs webpack in production mode, stages `assets/`, `configs/`, and a `CNAME` file into `www/`, then pushes that directory to the `gh-pages` branch via the `gh-pages` package.

### First-time GitHub Pages setup

After the first `npm run deploy` populates the `gh-pages` branch:

1. Repo Settings → Pages
   - Source: branch `gh-pages`, folder `/ (root)`
   - Custom domain: `www.zackmfleischman.com`
   - Enforce HTTPS: ☑
2. DNS — point `www.zackmfleischman.com` at GitHub Pages:
   - CNAME `www` → `zackmfleischman.github.io`
   - (Optional) Apex `zackmfleischman.com` → A records for GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
