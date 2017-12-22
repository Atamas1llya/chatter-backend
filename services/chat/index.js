const users = {}; // FIXME: Use REDIS

import { checkToken } from '../../middlewares/checkToken';
import { getUserByToken } from '../../middlewares/getUser';

module.exports = (io) => {
  io.use(async (socket, next) => {
    const { token } = socket.handshake.query;
    let user;

    try {
      if (!token) throw new Error('Unauthorized!');
      const tokenObj = await checkToken(token);
      user = await getUserByToken(tokenObj);
    } catch ({ message }) {
      next(new Error('Authentication error'));
    }
    socket.user = user;
    next();
  });

  io.on('connection', async (socket) => {
    socket.emit('connected');

    socket.on('new_message', (message) => {
      console.log(socket.user);
      socket.broadcast.emit('new_message', {
        from: socket.user.local.email || socket.user.name,
        message,
        timestamp: Date.now(),
      });
    });
  });
};
