const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes'); 
const multer = require('multer');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5006;

connectDb();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is Running successfully');
});

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/api/auctions', upload.single('image'), async (req, res) => {
  const { title, description, currentBid, endTime } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
      const newAuction = new Auction({ title, description, currentBid, endTime, image });
      await newAuction.save();
      res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
  } catch (err) {
      res.status(500).json({ error: 'Failed to create auction' });
  }
});



app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
