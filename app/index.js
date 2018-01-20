const dotenv = require('dotenv');
const app = require('./server/index');

dotenv.config();

const port = process.env.SERVERPORT || 8080;
app.listen(port, () => {
  /* eslint-disable */
  console.log('Express server listening on port', port);
  /* eslint-enable */
});
