const users = {}; // FIXME: Use REDIS

import { checkToken } from '../../middlewares/checkToken';
import { getUserByToken } from '../../middlewares/getUser';

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('a user connected');

    const { token } = socket.handshake.query;
    let user;

    try {
      if (!token) throw new Error('Unauthorized!');
      const tokenObj = await checkToken(token);
      user = await getUserByToken(tokenObj);
    } catch ({ message }) {
      socket.emit('error', message);
    }

    console.log(user);

    socket.emit('connected');
  });
};
