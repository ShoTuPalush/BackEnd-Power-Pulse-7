const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();
const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
  cloud_name: 'dxqzi4x9j',
  api_key: 417617877398435,
  api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { user } = req;
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'documents') {
      folder = 'documents';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: `${user.email}_avatars`,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
