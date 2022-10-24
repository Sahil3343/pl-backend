import express from 'express';
import polyUtil from "polyline-encoded";
import { Client } from "@googlemaps/google-maps-services-js";
import cors from 'cors';

const app = express();


const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors(options));

const client = new Client({});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
})

app.get('/getDistance', async (req, res) => {

    const { start } = req.query;
    const { end } = req.query;


    // const result = async () => {
    //     const getDistanceBtwnLocations : string = await getDuration.distanceCalc(start, end).then(console.log);
    //     console.log("first");
    //     console.log(getDistanceBtwnLocations);
    //     res.status(200);
    //     res.send({
    //         distance : getDistanceBtwnLocations,
    //          //duration : duration,
    //          //latLangs : latLangs
    //     })
    // }

    // result();
    

    // let result;

    //const result = await getDuration.distanceCalc(start, end);

    //console.log(result);

    // setTimeout(() => {
    //     console.log(result);
    // }, 1000);
    
    
    //console.log(start);
    //console.log(end);

    //await getData(start, end);

    //console.log("after execution");
    
    
    //console.log(distanceResult);

    // request("https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCVbEexU2_1L3UWiBtrybpMDK4PUOBGuqI", (response) => {
    //     console.log(response);
    //     console.log("hello")
    // })

    // console.log("test")

    // const GetData = fetch('');
    // const convertData = (await GetData).json().then(console.log);


    client.directions({
        params : {
            origin: start,
            destination: end,
            // waypoints: [
            //     {
            //     location: 'Joplin, MO',
            //     stopover: false
            //     },{
            //     location: 'Oklahoma City, OK',
            //     stopover: true
            //     }],
            //provideRouteAlternatives: false,
            // drivingOptions: {
            //     departureTime: new Date(/* now, or future date */),
            //     trafficModel: 'pessimistic'
            // },
            key: "AIzaSyCVbEexU2_1L3UWiBtrybpMDK4PUOBGuqI"
        },
        timeout: 1000
    })
    .then((r) => {
        //console.log(r.data.routes[0].overview_polyline.points);
        const polyLineEncoded = r.data.routes[0].overview_polyline.points;
    
        const latLangs = polyUtil.decode(polyLineEncoded);

        //console.log(r.data.routes[0].legs[0].distance.text);
        //console.log(r.data.routes[0].legs[0].duration.text);

        const distance : string = r.data.routes[0].legs[0].distance.text;
        const duration : string = r.data.routes[0].legs[0].duration.text;

        //return distance;
        
        res.status(200);
        res.send({
            distance : distance,
            duration : duration,
            latLangs : latLangs
        });
    
        //console.log(latLangs);
        
    
    
    })
    .catch((e) => {
        console.log(e.response.data.error_message);
    })
    
    
    
    
})