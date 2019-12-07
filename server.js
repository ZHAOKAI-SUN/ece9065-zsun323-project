//    □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □
//    □                                                               □
//    □                            _ooOoo_                            □
//    □                           o8888888o                           □
//    □                           88" . "88                           □
//    □                           (| -_- |)                           □
//    □                            O\ = /O                            □
//    □                        ____/`---'\____                        □
//    □                      .   ' \\| |// `.                         □
//    □                       / \\||| : |||// \                       □
//    □                     / _||||| -:- |||||- \                     □
//    □                       | | \\\ - /// | |                       □
//    □                     | \_| ''\---/'' | |                       □
//    □                      \ .-\__ `-` ___/-. /                     □
//    □                   ___`. .' /--.--\ `. . __                    □
//    □                ."" '< `.___\_<|>_/___.' >'"".                 □
//    □               | | : `- \`.;`\ _ /`;.`/ - ` : | |              □
//    □                 \ \ `-. \_ __\ /__ _/ .-` / /                 □
//    □         ======`-.____`-.___\_____/___.-`____.-'======         □
//    □                            `=---='                            □
//    □                                                               □
//    □         .............................................         □
//    □                    Buddha bless, No bug                       □
//    □                                                               □
//    □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □

require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

//    □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □
//    □                                                               □
//    □                            _ooOoo_                            □
//    □                           o8888888o                           □
//    □                           88" . "88                           □
//    □                           (| -_- |)                           □
//    □                            O\ = /O                            □
//    □                        ____/`---'\____                        □
//    □                      .   ' \\| |// `.                         □
//    □                       / \\||| : |||// \                       □
//    □                     / _||||| -:- |||||- \                     □
//    □                       | | \\\ - /// | |                       □
//    □                     | \_| ''\---/'' | |                       □
//    □                      \ .-\__ `-` ___/-. /                     □
//    □                   ___`. .' /--.--\ `. . __                    □
//    □                ."" '< `.___\_<|>_/___.' >'"".                 □
//    □               | | : `- \`.;`\ _ /`;.`/ - ` : | |              □
//    □                 \ \ `-. \_ __\ /__ _/ .-` / /                 □
//    □         ======`-.____`-.___\_____/___.-`____.-'======         □
//    □                            `=---='                            □
//    □                                                               □
//    □         .............................................         □
//    □                    Buddha bless, No bug                       □
//    □                                                               □
//    □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □