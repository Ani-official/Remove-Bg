import multer from 'multer'

// Creating multer middleware for parsing the form-data
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${file.originalname}`);
    }
});

const upload = multer({storage})

export default upload