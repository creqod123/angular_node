let socketId;
const mapData = (data) => {
    return {
        success: true,
        code: 200,
        message: 'Thank you for connected',
        data,
        error: null
    }
}

exports.init = (io) => {
    socketId = io
    io.on('connection', (socket) => {
        socket.on('join', (roomId) => {
            socket.join(roomId);
        });
        socket.on('helloworld123', (data) => {
            io.emit('helloworld123', data);
        });
    });
}
exports.getAllProdcut = (event, data) => {
    socketId.emit(event, mapData(data))
}

// exports.emitToSocketId = (socketId, eventName, data) => {
//     global.io.to(socketId).emit(eventName, data);
// };
