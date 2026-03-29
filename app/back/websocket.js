export default (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('a user disconnected:', socket.id);
    });

    socket.on('message', (data) => {
        console.log(data);
        socket.send("message");
    });
}