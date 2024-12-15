const express = require("express");
app = express();
const hostname = "127.0.0.1";
const port = 5500;

app.use(express.static('public'))
app.get('/',(req,res) => {
    res.render('index',{username:'John Doe'})
})

app.listen(port,()=>{
    console.log(`Express server listening on port ${port} `)
})


app.set('view engine','ejs')
