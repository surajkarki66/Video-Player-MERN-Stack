const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    uploaderName: { type: String, required: true },
    uploadTitle: { type: String, required: true },
    videoPath: { type: String, required: true },
    thumbnailPath: { type: String, required: true }
});

module.exports = mongoose.model('Upload', uploadSchema);