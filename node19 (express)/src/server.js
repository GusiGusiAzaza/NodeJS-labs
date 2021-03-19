const app = require('./app');
const PORT = 4001;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
