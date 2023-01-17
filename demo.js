import bcrypt from 'bcrypt'

const userPassword = 'ahm4055189'
const saltRounds = 10
const salt = bcrypt.hashSync(userPassword, saltRounds)
console.log('salt: ', salt)
