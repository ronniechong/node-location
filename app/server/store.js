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

  // delete(id){
  //   const ref = this.database.ref(process.env.DBREFERENCE);
  //   const pushRef= ref.child(process.env.DBCHILD);
  // }

  add(location) {
    const ref = this.database.ref(process.env.DBREFERENCE);
    const pushRef = ref.child(`${process.env.DBCHILD}/${location.userid}`);
    const newPostRef = pushRef.push();

    return new Promise((resolve, reject) => {
      newPostRef
        .set({
          created: moment.utc().format(),
          long: location.long,
          lat: location.lat,
          email: location.email,
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
