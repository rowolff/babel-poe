# babel-poe

An electron app that automatically translates incoming Path of Exile chat messages into your preferred language and offers translating your reply back.

Uses create-react-app for scaffolding.

# For users

Go to the release page https://github.com/rowolff/babel-poe and download/run the setup.

# For developers

## install dependencies

`npm install`

## before you run the development environment

You will have to create the file `./src/utils/keys.js` and add a valid Google Cloud API key with access to the Translation API. The file has this format:

```JavaScript
module.exports = {
  TRANSLATE_KEY: 'YOUR-KEY-HERE'
}
```

Reason is: I haven't figured out yet how to pass environment variables into the Electron build :/

## run and build

Development: `npm run dev`

Production build (Mac): `npm run mac:build`

Production build (Windows): `npm run win:build`

## massive thanks

[Vladimir Setka](https://github.com/vsetka) for

- improving the file streaming
- helping with the regex finding and parsing whispers
- proper error handling
- being patiend for all my stupid questions :D
