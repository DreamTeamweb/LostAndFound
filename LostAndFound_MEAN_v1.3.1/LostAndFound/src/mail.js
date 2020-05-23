//MAILING TEST

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken')

const secretkey='acm1pt'
const UserTest = require('./models/UserTest')



const token = jwt.sign({ name: 'Jose Nicolas',email:'Chaparrojosenicolas2@gmail.com' }, secretkey, {expiresIn:'24h'});
const newUser = new UserTest({ name:'Jose Nicolas', email:'Chaparrojosenicolas2@gmail.com', password:'Hola',temporarytoken: token });

console.log(token);

/*huhuhu*/
const oauth2Client = new OAuth2(
    "627868108356-j67441tc82e0cvfkop8k2ig95mm3bjhv.apps.googleusercontent.com",
    "TUKa-K1PVqQH-ecwUiDf_l-O", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04BHBLhv2PGWiCgYIARAAGAQSNwF-L9IrpSii0YiVLDwwF-K51Oot9o53qPycxZJRnUS1vYb3DXY_G16l-BRL9DZ4hVCIoqERo9I"
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "lostnfound.service.insa@gmail.com", 
         clientId: "627868108356-j67441tc82e0cvfkop8k2ig95mm3bjhv.apps.googleusercontent.com",
         clientSecret: "TUKa-K1PVqQH-ecwUiDf_l-O",
         refreshToken: "1//04BHBLhv2PGWiCgYIARAAGAQSNwF-L9IrpSii0YiVLDwwF-K51Oot9o53qPycxZJRnUS1vYb3DXY_G16l-BRL9DZ4hVCIoqERo9I",
         accessToken: accessToken
    }
});

const mailOptions = {
    from: '"Lost n\' Found" <lostnfound.service.insa@gmail.com>',
    to: newUser.email,
    subject: "Mail de confirmation",
    generateTextFromHTML: true,
    html: "<b>Salut " +newUser.email+"!</b> <p>Il ne vous reste qu'à cliquer sur le lien pour complèter votre inscrption</p><a href=http://localhost:3000/activate/"+newUser.temporarytoken+">Activer</a>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});