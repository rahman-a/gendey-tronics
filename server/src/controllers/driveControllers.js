// @ts-nocheck
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DIRNAME } from '../constants.js'
import { google } from 'googleapis'
import fetch from 'node-fetch'
import Course from '../models/courseModal.js'
import Product from '../models/productModal.js'

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.appdata',
]

const GOOGLE_COURSES_FOLDER = '12JHc6nWos-HuOmHvPollweyZuVv6b-E7'
const GOOGLE_PRODUCTS_FOLDER = '1zCNLfYRxhrahRi4v0evO81QSg32QCScp'

const getOauthClient = async () => {
  const credentialsPath = path.join(DIRNAME, 'src/gcr.json')
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8')).web

  const { client_id, client_secret, redirect_uris } = credentials

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  )

  return oAuth2Client
}

const getAuthURL = async () => {
  const auth = await getOauthClient()
  return auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
}

const generateAccessToken = async (code) => {
  const auth = await getOauthClient()
  const token = await auth.getToken(code)
  auth.setCredentials(token)
  fs.writeFileSync(path.join(DIRNAME, 'src/gact.json'), JSON.stringify(token))
}

const credential = (_) => {
  const accessToken = JSON.parse(
    fs.readFileSync(path.join(DIRNAME, 'src/gact.json'), 'utf8')
  ).tokens
  return accessToken
}

const listDriveFiles = async (name, folder) => {
  let query = `'me' in owners and mimeType != 'application/vnd.google-apps.folder'`
  if (name) {
    query = `${query} and name contains '${name}'`
  }
  if (folder) {
    query =
      folder === 'courses'
        ? `${query} and '${GOOGLE_COURSES_FOLDER}' in parents`
        : `${query} and '${GOOGLE_PRODUCTS_FOLDER}' in parents`
  }
  const auth = await getOauthClient()
  auth.setCredentials(credential())
  const drive = google.drive({ version: 'v3', auth })
  const response = await drive.files.list({
    // pageSize:25,
    q: query,
    fields: 'nextPageToken, files(id,name)',
  })
  return response.data.files
}

// files(id, name, originalFilename, iconLink, hasThumbnail, fileExtension)
const downloadDriveFile = async (id) => {
  const auth = await getOauthClient()
  auth.setCredentials(credential())
  const drive = google.drive({ version: 'v3', auth })
  try {
    const file = await drive.files.get({
      fileId: id,
      fields: 'id,webContentLink',
    })
    const response = await drive.permissions.list({
      fileId: id,
      fields: 'permissions',
    })
    const permission = response.data.permissions[0]
    if (permission.role !== 'reader') {
      await drive.permissions.create({
        fileId: id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      })
    }
    return { success: true, file: file.data }
  } catch (error) {
    const err = error.response.data.error.message
    return { success: false, error: err }
  }
}

const deleteDriveFilePermission = async (id) => {
  const auth = await getOauthClient()
  auth.setCredentials(credential())
  const drive = google.drive({ version: 'v3', auth })
  try {
    const response = await drive.permissions.list({
      fileId: id,
      fields: 'permissions',
    })
    const permission = response.data.permissions[0]
    await drive.permissions.delete({ permissionId: permission.id, fileId: id })

    return { response: true }
  } catch (error) {
    const err = error.response.data.error.message
    return { response: false, error: err }
  }
}

const deleteDriveFile = async (id) => {
  const auth = await getOauthClient()
  auth.setCredentials(credential())
  const drive = google.drive({ version: 'v3', auth })
  await drive.files.delete({ fileId: id })
}

const getGoogleAccessTokenByRefreshToken = async (_) => {
  const refresh_token = JSON.parse(
    fs.readFileSync(path.join(DIRNAME, 'src/gact.json'), 'utf8')
  ).tokens.refresh_token
  const { client_secret, client_id } = JSON.parse(
    fs.readFileSync(path.join(DIRNAME, 'src/gcr.json'), 'utf8')
  ).web

  const accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token'
  const accessTokenBody = {
    refresh_token,
    client_id,
    client_secret,
    grant_type: 'refresh_token',
  }
  const accessTokenOption = {
    method: 'POST',
    body: JSON.stringify(accessTokenBody),
  }
  return (await (await fetch(accessTokenUrl, accessTokenOption)).json())
    .access_token
}

export async function getResumableURI(req, res, next) {
  const { id, type, part } = req.body

  try {
    if (type === 'course') {
      const course = await Course.findById(id)
      if (!course) {
        res.status(404)
        throw new Error("The course id isn't valid please choose a valid one")
      }
    }

    if (type === 'product') {
      const product = await Product.findById(id)
      if (!product) {
        res.status(404)
        throw new Error("The product id isn't valid please choose a valid one")
      }
    }

    if (!part) {
      res.status(404)
      throw new Error('Please Specify the Part for the Asset')
    }

    const parents =
      type === 'course'
        ? [GOOGLE_COURSES_FOLDER]
        : type === 'product' && [GOOGLE_PRODUCTS_FOLDER]

    const uris = JSON.parse(
      fs.readFileSync(path.join(DIRNAME, 'src/resumable_uri.json'), 'utf8')
    )
    const isResumableURI = uris.find((ur) => ur._id === id && ur.part === part)

    if (isResumableURI) {
      req.resumeURI = isResumableURI.uri
      next()
      return
    }

    const file = req.file
    const access_token = await getGoogleAccessTokenByRefreshToken()

    const body = JSON.stringify({
      name: file.originalname,
      mimeType: file.mimetype,
      parents,
    })

    const url =
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable'
    const option = {
      method: 'post',
      body,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
    const response = await fetch(url, option)

    const resumableURI = response.headers.get('location')

    if (resumableURI) {
      const updatedUris = [...uris, { _id: id, part, uri: resumableURI }]
      fs.writeFileSync(
        path.join(DIRNAME, 'src/resumable_uri.json'),
        JSON.stringify(updatedUris)
      )
      req.resumeURI = resumableURI
      next()
    } else {
      res.status(500)
      throw new Error('something went wrong please upload file again')
    }
  } catch (error) {
    next(error)
  }
}

export const getAccessToken = async (req, res, next) => {
  const { code } = req.query
  try {
    if (!fs.existsSync(path.join(DIRNAME, 'src/gact.json'))) {
      await generateAccessToken(code)
    }
    const files = await listDriveFiles()

    res.send({
      code: 200,
      success: true,
      files,
    })
  } catch (error) {
    next(error)
  }
}

export const authenticateMember = async (req, res, next) => {
  try {
    if (fs.existsSync(path.join(DIRNAME, 'src/gact.json'))) {
      const files = await listDriveFiles()
      res.send({
        success: true,
        code: 200,
        files,
      })

      return
    }
    const url = await getAuthURL()
    res.send({
      code: 200,
      success: true,
      url,
    })
  } catch (error) {
    next(error)
  }
}

export const searchDriveFiles = async (req, res, next) => {
  const { name, folder } = req.query
  try {
    if (fs.existsSync(path.join(DIRNAME, 'src/gact.json'))) {
      const files = await listDriveFiles(name, folder)
      res.send({
        success: true,
        code: 200,
        files,
      })

      return
    } else {
      res.status(400)
      throw new Error('Please Access Google Drive First')
    }
  } catch (error) {
    next(error)
  }
}

export const uploadFile = async (req, res, next) => {
  const { start, end, length, id, type, part } = req.body

  try {
    if (req.file) {
      const file = req.file
      const googleDriveUploadURL = req.resumeURI
      const options = {
        method: 'PUT',
        headers: {
          'Content-Length': file.size,
          'Content-Range': `bytes ${start}-${end - 1}/${length}`,
        },
        body: file.buffer, // contents of the chunk
      }
      const response = await fetch(googleDriveUploadURL, options)
      const errors = [500, 502, 503, 504]
      if (errors.includes(response.status)) {
        res.status(response.status)
        throw new Error(
          'service unavailable right now, please try again after while'
        )
      } else {
        if (response.status === 200 || response.status === 201) {
          // const resumeFile = await fetch(req.resumeURI, {method:'PUT', headers:{'Content-Range':'*/*'}})
          // const formatResponse = response[Object.getOwnPropertySymbols(response)[1]]
          const metadata = await response.json()

          if (type === 'course') {
            const course = await Course.findById(id)
            course.driveFile = course.driveFile.concat({
              link: metadata.id,
              part: parseInt(part),
            })
            await course.save()
          } else if (type === 'product') {
            const product = await Product.findById(id)
            product.driveFile = product.driveFile.concat({
              link: metadata.id,
              part: parseInt(part),
            })
            await product.save()
          }

          const uris = JSON.parse(
            fs.readFileSync(
              path.join(DIRNAME, 'src/resumable_uri.json'),
              'utf-8'
            )
          )
          const idx = uris.findIndex((ur) => ur._id === id && ur.part === part)
          if (idx !== -1) uris.splice(idx, 1)
          fs.writeFileSync(
            path.join(DIRNAME, 'src/resumable_uri.json'),
            JSON.stringify(uris)
          )

          res.status(201).send({
            code: 201,
            success: true,
            message: 'File has Uploaded Successfully',
          })
        } else {
          res.status(200).send({
            success: true,
            uploaded: length - end,
            message: null,
          })
        }
      }
    } else {
      res.status(400)
      throw new Error('Please Select File to upload?!')
    }
  } catch (error) {
    next(error)
  }
}

export const downloadFile = async (req, res, next) => {
  const { id } = req.params

  try {
    const response = await downloadDriveFile(id, res)

    if (!response.success) {
      throw new Error(response.error)
    }

    if (response.success) {
      res.send({
        success: true,
        code: 200,
        file: response.file,
        key: process.env.GOOGLE_API_KEY,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteFilePermission = async (req, res, next) => {
  const { id } = req.params

  try {
    const response = await deleteDriveFilePermission(id, res)

    response && res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

export const deleteFile = async (req, res, next) => {
  const { id } = req.params
  try {
    await deleteDriveFile(id)
    res.send({
      success: true,
      code: 200,
      message: 'The File has deleted successfully',
    })
  } catch (error) {
    const deleteError = error.response.data.error
    next({ message: deleteError.message })
  }
}

export const resumePreviousUpload = async (req, res, next) => {
  const { type, id, size, part } = req.body

  try {
    if (type === 'course') {
      const course = await Course.findById(id)
      if (!course) {
        res.status(404)
        throw new Error("The course id isn't valid please choose a valid one")
      }
    }

    if (type === 'product') {
      const product = await Product.findById(id)
      if (!product) {
        res.status(404)
        throw new Error("The product id isn't valid please choose a valid one")
      }
    }

    if (!part) {
      res.status(404)
      throw new Error('Please Specify the Part for the Asset')
    }

    const uris = JSON.parse(
      fs.readFileSync(path.join(DIRNAME, 'src/resumable_uri.json'), 'utf-8')
    )
    const isResumableURI = uris.find((ur) => ur._id === id && ur.part === part)

    if (!isResumableURI) {
      res.status(404)
      throw new Error(
        "The upload link isn't found, maybe the download completed or you didn't start at all"
      )
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Range': `bytes */${size}`,
      },
    }

    const response = await fetch(isResumableURI.uri, options)

    if (response.status === 404) {
      res.status(404)
      throw new Error('The Upload Link has Expired, Please Upload File Again?!')
    }

    if (response.status === 200 || response.status === 201) {
      res.status(200).send({
        code: 200,
        message: 'The File Has Uploaded Completely, No Need to Resume',
      })
      // remove the resumable link if exist
      const uris = JSON.parse(
        fs.readFileSync(path.join(DIRNAME, 'src/resumable_uri.json'), 'utf-8')
      )
      const idx = uris.findIndex((ur) => ur._id === id && ur.part === part)
      if (idx !== -1) uris.splice(idx, 1)
      fs.writeFileSync(
        path.join(DIRNAME, 'src/resumable_uri.json'),
        JSON.stringify(uris)
      )
      return
    }

    if (response.status === 308) {
      const range = response.headers.get('range')
      res.status(200).send({
        code: 200,
        range,
        message: 'The File Need to Resume',
      })
      return
    }
  } catch (error) {
    next(error)
  }
}
