// import nodemailer from 'nodemailer'
import mailgun from 'mailgun-js'
import template from './template.js'
import dotenv from 'dotenv'
dotenv.config()


const mg = mailgun({
  apiKey:process.env.MG_APIKEY, 
  domain:process.env.MG_DOMAIN
})

const sendEmail = async (info, type) => {
 const data = {
    from: 'noreplay@Gendytronics.com',
    to: info.email,
    subject: type === 'activate' 
    ?'Email Verification'
    :'Reset Account Password',
    html: type === 'activate' 
    ? template.activate(info) 
    : template.reset(info)
  };
  mg.messages().send(data, function (error, body) {
    if(error){
      console.log(error);
      throw new Error(error)
    }
    console.log('BODY: ',body);
  });
}

export default sendEmail
