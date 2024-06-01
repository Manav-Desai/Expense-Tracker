import app from "./app.js";
import connectionDB from "./db.js";

const PORT = process.env.PORT;

connectionDB().then( () => {

    app.listen(PORT , () => {
        console.log("Server started at port : " + PORT);
    });

}).catch( (err) => {
    console.log("Error in index file : " + err);
});
