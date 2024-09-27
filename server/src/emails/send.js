import { Resend } from 'resend'
import template from './template.js'
import dotenv from 'dotenv'
import path from 'path'
import { DIRNAME } from '../constants.js'
dotenv.config({
  path: path.join(DIRNAME, '.env'),
})

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (data, type) => {
  const html = data.html ? data.html : template[type](data.info)
  data.html = html
  delete data.info
  const { data: sendData, error } = await resend.emails.send(data)
  if (error) {
    console.log(error)
  } else {
    console.log('Email Send =>', sendData)
  }
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
