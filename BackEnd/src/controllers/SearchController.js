const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')


module.exports = {
    async index(request, respose){
        const { latitude, longitude, techs } = request.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({ //fazendo filtro pela tecnologia e pela distancia do Dev
            techs: {
                $in: techsArray,
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100000000,
                },
            },
        })

        return respose.json({ devs })
    }
}