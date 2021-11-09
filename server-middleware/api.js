require('dotenv').config()

const app = require('express')()

const cloudinary = require('cloudinary');

const multer = require('multer')

const upload = multer({ dest: 'uploads/' });


cloudinary.config({
    cloud_name: process.env.NUXT_ENV_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.post('/upload', upload.single('file'), async (req, res) => {

    const up_options = {
        resource_type: "video",
        upload_preset: "adaptive-streaming"
    };

    cloudinary.v2.uploader.upload(
        req.file.path,
        up_options,
        function (result) { console.log(result); }
    );

    let backURL = req.header('Referer') || '/';

    backURL += "?uploading=true";

    res.redirect(backURL);
});

app.get('/resources', async (req, res) => {

    const results = await cloudinary.v2.search
        .expression(
            'folder:nuxtjs-adaptive-bitrate-streaming'
        ).sort_by('public_id', 'desc')
        .max_results(30)
        .execute();


    res.json(results);
});

module.exports = app