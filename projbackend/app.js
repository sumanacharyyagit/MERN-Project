require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

// DB Connections

mongoose.set({strictQuery: false,
    // useNewUrlParser: true,
    // useUndefinedTopology: true,
    // useCreateIndex: true,
});
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUndefinedTopology: true,
//     useCreateIndex: true,
// }).then(() => {
//     console.log("mongodb://127.0.0.1:27017/test")
// }).catch((err) => console.log(err)););

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB CONNECTED...!")
}).catch((err) => console.log("DB CONNECTION ERROR...!", err));

//   Middlewares
const corsOptions = {
    // origin: 'http://localhost:8000',
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json(), cookieParser(), cors(corsOptions));


// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// PORT
const port  = process.env.PORT || 9000;

app.get("/", (req, res) => {
    return res.send("Hello World");
});


// Starting Server
app.listen(port, (req, res) => {
    console.log(`App listening on port: http://localhost:${port}`);
});

