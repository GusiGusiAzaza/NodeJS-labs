const mail = require('sendmail')();

function sendMail(from, to, title, msg){
    mail({
        from: from,
        to: to,
        subject: title,
        html: msg,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}

exports.send = sendMail;