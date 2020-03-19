const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location:{
        type: PointSchema,
        createIndex: '2dsphere', // indice padrão para coordenadas X, Y
    }
});

module.exports = mongoose.model('Dev', DevSchema);