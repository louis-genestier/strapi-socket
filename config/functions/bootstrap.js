'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  const io = require('socket.io')(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', function(socket) {
    socket.on('join', async ({ username, roomId }) => {
        const currentUser = await strapi.query('user', 'users-permissions').update({ username }, {
          socket_id: socket.id,
        });
        let room = await strapi.query('room', '').findOne({ unique_id: roomId});
        await strapi.query('room', '').update({ unique_id: roomId}, {
          users: [...room.users, currentUser],
        });

        room = await strapi.query('room', '').findOne({ unique_id: roomId});

        const response = {
          id: room.id,
          active: room.active,
          unique_id: room.unique_id,
          users: room.users,
        }

        socket.broadcast.to(room.unique_id).emit('connect', response);
    });

    socket.on('disconnect', async () => {
      const user = await strapi.query('user', 'users-permissions').findOne({ socket_id: socket.id });

      await strapi.query('user', 'users-permissions').update({ socket_id: socket.id }, {
        room: null,
        choice: null,
      })

      const room = await strapi.query('room', '').findOne({ id: user.room.id });

      if (!room.users.length) {
        await strapi.query('room', '').update({ id: room.id }, { active: false });
        return;
      }

      const response = {
        id: room.id,
        active: room.active,
        unique_id: room.unique_id,
        users: room.users,
      }

      socket.broadcast.to(room.unique_id).emit('disconnect', response);
    })
  });
};
