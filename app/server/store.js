const firebase = require('firebase');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

class Store {
  constructor() {
    const config = {
      apiKey: process.env.FBAPIKEY,
      authDomain: process.env.FBDOMAIN,
      databaseURL: process.env.FBDBURL,
      storageBucket: process.env.FBSTORAGEEBUCKET,
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  add(location) {
    const ref = this.database.ref(process.env.DBREFERENCE);
    const pushRef = ref.child(`${process.env.DBCHILD}`);
    const newPostRef = pushRef.push();

    return new Promise((resolve, reject) => {
      newPostRef
        .set({
          created: moment.utc().format(),
          long: location.long,
          lat: location.lat,
          email: location.email,
          userid: location.userid,
        })
        .then(() => resolve({
          status: 200,
          msg: 'Done',
        }))
        /* eslint-disable */
        .catch(() => reject({
          status: 500,
          msg: 'Error',
        }));
        /* eslint-enable */
    });
  }
}

module.exports = Store;
