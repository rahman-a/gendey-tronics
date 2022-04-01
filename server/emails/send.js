// import nodemailer from 'nodemailer'
import mailgun from 'mailgun-js'
import template from './template.js'
import dotenv from 'dotenv'
dotenv.config()


const mg = mailgun({
  apiKey:process.env.MG_APIKEY, 
  domain:process.env.MG_DOMAIN,
  host: "api.eu.mailgun.net"
})

const sendEmail = async (data) => {
  const html = data.html ? data.html :  template[data.type](data.info)
  data.html = html
  mg.messages().send(data, function (error, body) {
    if(error){
      console.log(error);
      throw new Error(error)
    }
    console.log('BODY: ',body);
  });
}

export default sendEmail


/**
 * const data = {
    from: 'noreplay@Gendytronics.com',
    to: info.email,
    subject: type === 'activate' 
    ?'Email Verification'
    :'Reset Account Password',
    html
  };
 */