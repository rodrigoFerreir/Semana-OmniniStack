const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray')

//index, show, store, update, destroy
module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body; 

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = ParseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //filtrar conexões que estao a no max 10km de distancia,
            //e que tenha uma das techs filtradas.
            
        }
        return response.json(dev);
    },

    async update(){
        //buscar Dev pelo username,
        //atualizar techs e Nome.
    },
    
    async delete(){
        //buscar Dev pelo username,
        //apagar seu registro no sistema.
    },
};