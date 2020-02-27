module.exports = {
  servers: {
    one: {
      host: '54.69.115.65',
      username: 'ubuntu',
      pem: '~/Keys/GaloreTV.pem',
    }
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
  meteor: {
    name: 'GaloreTV',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      "port": 80,
      "ROOT_URL": "http://tv.galoremag.com",
      "MONGO_URL": "mongodb://localhost/meteor"
    },

    proxy: {
      domains: 'tv.galoremag.com',
      // ssl: {
      //   certificate: "/Users/smokey/Keys/getclark.pem", 
      //   key: "/Users/smokey/Keys/getclark.key",
      //   port: 443

      //   // Enable let's encrypt to create free certificates.
      //   // The email is used by Let's Encrypt to notify you when the
      //   // certificates are close to expiring.
      //   // letsEncryptEmail: 'aaron@getclark.io'
      // }
    },
    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60,
    // dockerImage: 'abernix/meteord:base',
    dockerImage: 'abernix/meteord:node-8.9.1-base',
    // dockerImage: 'zodern/meteor:root',
  },
};