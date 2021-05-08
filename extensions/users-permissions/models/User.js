'use strict';
const axios = require('axios');

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      try {
        const res = await axios(`https://api.twitter.com/labs/2/users/by?usernames=${data.username}&user.fields=profile_image_url`, {
          headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER}`,
          },
        });
        data.image = res.data.data[0].profile_image_url;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
