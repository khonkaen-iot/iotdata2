import connectDB from '@/lib/db';
import mongoose from 'mongoose';

connectDB();

const DataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now }, // Add timestamp field
  // Add other fields as needed
});

const Data = mongoose.models.somthing || mongoose.model('somthing', DataSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { temperature, humidity } = req.body;

    if (!temperature || !humidity) {
      res.status(400).json({ message: 'Temperature and humidity are required.' });
      return;
    }

    const newData = new Data({
      temperature,
      humidity,
      timestamp: new Date(), // Set timestamp to current date and time
    });

    try {
      await newData.save();
      res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while saving the data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
