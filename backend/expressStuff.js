const app = require("./server").app;

app.get("/",(req,res)=>res.json("ok"));