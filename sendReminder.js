require('dotenv').config();
const axios = require('axios');

// Array of non-static reminder messages
const reminderMessages = [
  "💧 Time to hydrate! Drink a glass of water to stay refreshed.",
  "🚰 Hey there! Don't forget to drink some water. Your body will thank you!",
  "💦 Water break! Stay healthy and hydrated throughout the day.",
  "🌊 Reminder: Sip some water now. Keep your energy levels up!",
  "💧 Hydration checkpoint! Time for a refreshing glass of water.",
  "🥤 Your body is calling for water. Take a moment to hydrate!",
  "💦 Stay sharp and focused - drink some water right now!",
  "🌊 Quick reminder: Water is essential. Have you had your glass today?",
  "💧 Beat the afternoon slump with a glass of water!",
  "🚰 Water time! Keep your body functioning at its best.",
  "💦 Don't wait until you're thirsty. Drink water now!",
  "🌊 Your daily hydration reminder is here. Take a sip!",
  "💧 Time to nourish your body with some good old H2O!",
  "🥤 Pause and hydrate. Your future self will appreciate it!",
  "💦 Water reminder: Stay hydrated, stay healthy, stay happy!",
];

// Function to get a random reminder message
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * reminderMessages.length);
  return reminderMessages[randomIndex];
}

// Function to check if current time is within reminder hours (10 AM - 6 PM IST)
function isWithinReminderHours() {
  // Get current time in IST using Intl API for accuracy
  const now = new Date();
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const hourPart = parts.find(p => p.type === 'hour');
  const hours = parseInt(hourPart.value);
  
  // Check if between 10 AM (10) and 6 PM (18)
  return hours >= 10 && hours < 18;
}

// Function to get current IST time as string
function getCurrentISTTime() {
  const now = new Date();
  return now.toLocaleString('en-US', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
}

// Function to send message to Google Chat
async function sendToGoogleChat(message) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('Error: GOOGLE_CHAT_WEBHOOK_URL is not set in environment variables');
    process.exit(1);
  }
  
  try {
    const response = await axios.post(webhookUrl, {
      text: message
    });
    
    console.log('Reminder sent successfully!');
    console.log('Message:', message);
    console.log('Response status:', response.status);
    return response.data;
  } catch (error) {
    console.error('Error sending reminder:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

// Main function
async function main() {
  console.log('Water Reminder Service Starting...');
  console.log('Current IST time:', getCurrentISTTime());
  
  // Check if we're within reminder hours
  if (!isWithinReminderHours()) {
    console.log('Outside reminder hours (10:00 AM - 6:00 PM IST). No reminder sent.');
    return;
  }
  
  // Get a random message and send it
  console.log('Within reminder hours - sending reminder...');
  const message = getRandomMessage();
  await sendToGoogleChat(message);
}

// Run the main function
main().catch(error => {
  console.error('Failed to send reminder:', error);
  process.exit(1);
});
