const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const openai =require("openai");
const {Configuration, OpenAIApi} = require("openai");
const config = new Configuration({
   apiKey:"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",
   //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
})
const openai = new OpenAIApi(config);
 //setup Server
const app = express ();
app.use(bodyParser.json())
app.use(cors());

//endpoint for chatGpt
// app.post("/chat", async (req, res)=>{
//    const { prompt } = req.body;
//    const completion = await openai.createCompletion({
//       model:"text-davinci-003",
//       max_tokens: 10,
//       temperature:0,
//       prompt: prompt,
//       });
//       res.send(completion.data.choices[0].text);
// }) 


//endpoint for grammerchecker
app.post("/grammar-check", async (req, res)=>{
   const {userPrompt} = req.body.textToCorrect;
    //call the openAi API
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: `
      You are a grammar checker. Correct the following text:
      ${userPrompt}
    `,      max_tokens:50,
      temperature:0.7,
      stop:'/n'
    });
   console.log("response"+response)
  const correctedText = response.data.choices[0].text.trim();
  res.json({ correctedText });
  console.log('teeesting'+ res)
});
const port = 8080;
app.listen(port, ()=>{
   console.log(`server listening on port ${port}`)
})

