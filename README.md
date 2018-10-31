# babel-poe

An electron app that automatically translates incoming Path of Exile chat messages into your preferred language and offers translating your reply back.

Uses create-react-app for scaffolding.

## install

`npm install`

## before you run

You will have to create the file `./src/utils/keys.js` and add a valid Google Cloud API key with access to the Translation API. The file has this format:

```JavaScript
module.exports = {
  TRANSLATE_KEY: 'YOUR-KEY-HERE'
}
```

Reason is: I haven't figured out yet how to pass environment variables into the Electron build :/

## run

Development: `npm run dev`
Production build (Mac): `npm run mac:build`
Production build (Windows): `npm run win:build`
