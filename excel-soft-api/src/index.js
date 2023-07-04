const express = require('express');
const cors = require('cors');

const jobsRouter = require('./routes/jobsRouter');
const applicationsRouter = require('./routes/applicationsRouter');

const app = express();

app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req,res,next) {
    console.log("REQ:", req.method, req.url);
    next();
});

app.get('/hii', (req, res, next) => {
    res.write("Hello..");
    res.end();
});



app.use('/api/jobs', jobsRouter);


app.use('/api/applications', applicationsRouter);






app.listen(8080, function () {
    console.log("App listening in port:", 8080);
});