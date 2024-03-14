const express = require('express'),
      path = require('path'),
      HTTP = require('http'),
      cors = require('cors'),
      cookieParser = require('cookie-parser'),
      connectToDB = require('./config/db'),
      genericRouter = require('./routes/index'),
      { checkFileExists } = require('./utils/storage'),
      { PORT, HOSTNAME, FRONTEND_ORIGIN } = require('./config')


const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true,
  optionSuccessStatus: 200,
}

const startServer = async () => {
  const app = express();

  app.use(cors(corsOptions))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use('/api', genericRouter);
  app.use('/productPhotos', checkFileExists, express.static(path.join(__dirname, '../productPhotos')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

  const db = await connectToDB();
  const server = HTTP.createServer(app);

  const WebServer = server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  WebServer.on('close', async () => {
    try {
      await db.close();
      console.log('MongoDB connection closed.');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  });
}

startServer();
