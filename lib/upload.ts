import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ensure upload directories exist
const createUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Configure storage for different file types
const createStorage = (destination: string) => {
  createUploadDir(destination)
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
}

// File filter functions
const imageFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}

const documentFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and image files are allowed!'))
  }
}

// Upload configurations
export const uploadImage = multer({
  storage: createStorage('./public/uploads/images/'),
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

export const uploadDocument = multer({
  storage: createStorage('./public/uploads/documents/'),
  fileFilter: documentFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
})

export const uploadVideo = multer({
  storage: createStorage('./public/uploads/videos/'),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
})

// Utility function to delete files
export const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}

// Get file URL
export const getFileUrl = (filePath: string) => {
  return filePath.replace('./public', '')
}