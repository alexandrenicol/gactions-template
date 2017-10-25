const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;


app.use(cors())
app.use(bodyParser.json({type: 'application/json'}))

app.post('/', function (request, response) {

  const app = new ActionsSdkApp({request: request, response: response});

  const mainIntentHandler = (app) => {
    app.ask('Welcome to .');
  }

  const textIntentHandler = (app) => {
    const input = app.getRawInput();
    app.tell('You said ' + input);
  }

  const customHandler = (app) => {
    //TODO
  }


  const actionMap = new Map();
  actionMap.set(app.StandardIntents.MAIN, mainIntentHandler);
  actionMap.set("customHandler", customHandler);
  actionMap.set(app.StandardIntents.TEXT, textIntentHandler);
  // you can add the function name instead of an action map
  app.handleRequest(actionMap);


})

app.listen(3333, function () {
  console.log('Example app listening on port 3000!')
})
