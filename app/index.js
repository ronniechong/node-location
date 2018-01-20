const dotenv = require('dotenv');
const app = require('./server/index');

dotenv.config();

const port = process.env.SERVERPORT || 8080;
const host = process.env.SERVERHOST || '0.0.0.0';
app.listen(port, host, () => {
  /* eslint-disable */
  console.log('Express server listening on port', port);
  /* eslint-enable */
});
