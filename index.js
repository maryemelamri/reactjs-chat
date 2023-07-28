const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {Configuration, OpenAIApi} = require("openai");
const config = new Configuration({
   apiKey:"",
   //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
})
const openai = new OpenAIApi(config);
 //setup Server
 const app = express ();
 app.use(bodyParser.json())
app.use(cors());

//endpoint for chatGpt
app.post("/chat", async (req, res)=>{
   const { prompt } = req.body;
   const completion = await openai.createCompletion({
      model:"text-davinci-003",
      max_tokens: 512,
      temperature:0,
      prompt: prompt,
      });
      res.send(completion.data.choices[0].text);
}) 

const port =8080;
app.listen(port, ()=>{
   console.log(`server listening on port ${port}`)

})
