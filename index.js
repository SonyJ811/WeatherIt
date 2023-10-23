import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const API_KEY="55e7860334d48723b6950aa391a2cb29";
const API_URL="https://api.openweathermap.org/data/2.5/weather";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/",async (req,res)=>{
    try {
        const cityName=req.body.cityName;
        const url=API_URL+"?q="+cityName+"&units=metric"+"&appid="+API_KEY;
        const result = await axios.get(url);
        res.render("index.ejs", { data: result.data });
      } catch (error) {
        res.send(error.response.data.cod);
      }
});

app.listen(port,()=>{
    console.log("server is running on port "+port);
});