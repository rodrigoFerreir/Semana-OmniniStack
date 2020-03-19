const socketio = require('socket.io');
const parseStringAsArray = require('./utils/ParseStringAsArray');

const connections = [];

exports.setupWebSocket = (server) =>{
    const io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });

        /*setTimeout(() => {
            socket.emit('message', 'Funcionou aqui em!')
        }, 3000)//3000 = a 3 segundos.*/
    });
};