const dotenv = require('dotenv');
const app = require('./server/index');
const path = require('path');

dotenv.config();

const port = process.env.SERVERPORT || 8080;
const host = process.env.SERVERHOST || '0.0.0.0';
app.listen(port, host, () => {
  /* eslint-disable */
  console.log('Express server listening on port', port);
  const cwd = process.cwd();
  console.log('listen ->', path.join(cwd, '/app/html/'));
  /* eslint-enable */
});

app.get('/', (req, res) => {
  const cwd = process.cwd();
  console.log(path.join(cwd, '/app/html/'));
  res.render('index', {
    title: 'My Home',
    message: 'Geolocation',
    gmapApi: process.env.GMAPAPI,
    apiUrl: process.env.GEOLOCATIONADDURL,
    clientId: process.env.GAPPCLIENTID,
  });
});

app.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'My Home',
    message: 'Please sign in to proceed',
    clientId: process.env.GAPPCLIENTID,
  });
});
