const express = require("express");
app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.get('/',(req,res) => {
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Express server listening on port ${port} `)
})


app.set('view engine','ejs')
