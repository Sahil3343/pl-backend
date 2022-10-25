import express from 'express';
import polyUtil from "polyline-encoded";
import { Client } from "@googlemaps/google-maps-services-js";
import cors from 'cors';

const app = express();


const allowedOrigins = ['http://localhost:4200', 'https://plotline-c837f.web.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors(options));

const PORT = 8080;

const client = new Client({});



app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
})

app.get('/getDistance', async (req, res) => {

    try {
        const { start } = req.query;
        const { end } = req.query;

        client.directions({
            params : {
                origin: start,
                destination: end,
                key: "AIzaSyCVbEexU2_1L3UWiBtrybpMDK4PUOBGuqI"
            },
            timeout: 1000
        })
        .then((r) => {
            //console.log(r.data.routes[0].overview_polyline.points);
            const polyLineEncoded = r.data.routes[0].overview_polyline.points;
        
            const latLangs = polyUtil.decode(polyLineEncoded);
    
            const distance : string = r.data.routes[0].legs[0].distance.text;
            const duration : string = r.data.routes[0].legs[0].duration.text;
            
            res.status(200);
            res.send({
                status : 'OK',
                distance : distance,
                duration : duration,
                latLangs : latLangs
            });
            
        
        
        })
        .catch((e) => {
            res.status(200);
            res.send({
                status : 'error'
            });
            console.log(e.response.data.error_message);
        })
    } catch(e) {
        res.status(200);
            res.send({
                status : 'error'
            });
            console.log(e.response.data.error_message);
    }
    

    
    
    
})