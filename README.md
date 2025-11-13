# Water Reminder 💧

An automated water reminder system that sends non-static, randomized reminders to Google Chat from 10:00 AM to 6:00 PM IST to help you stay hydrated throughout the day.

## Features

- 🕐 **Smart Scheduling**: Sends reminders only during working hours (10:00 AM - 6:00 PM IST)
- 🔄 **Non-Static Messages**: Randomized reminder messages to keep things fresh and engaging
- 🤖 **Automated via GitHub Actions**: Runs automatically every hour via scheduled workflow
- 💬 **Google Chat Integration**: Seamlessly sends reminders to your Google Chat space
- 🌏 **IST Timezone Support**: Properly handles Indian Standard Time (IST/UTC+5:30)

## Setup

### Prerequisites

- Node.js (v18 or higher)
- A Google Chat space with webhook access
- GitHub repository (for automated reminders)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/akhilanwar/water-reminder.git
   cd water-reminder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Get your Google Chat Webhook URL:
   - Open your Google Chat space
   - Click on the space name at the top
   - Select "Manage webhooks"
   - Create a new webhook and copy the URL

5. Add the webhook URL to your `.env` file:
   ```
   GOOGLE_CHAT_WEBHOOK_URL=your_webhook_url_here
   ```

### Running Locally

To test the reminder locally:

```bash
npm start
```

This will send a reminder immediately if the current IST time is between 10:00 AM and 6:00 PM.

## GitHub Actions Setup

To enable automated reminders via GitHub Actions:

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add a secret named `GOOGLE_CHAT_WEBHOOK_URL` with your webhook URL as the value

The workflow is configured to run every hour from 10:00 AM to 6:00 PM IST automatically.

### Manual Trigger

You can also manually trigger the reminder:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Water Reminder** workflow
3. Click **Run workflow**

## How It Works

1. **Scheduled Execution**: GitHub Actions runs the workflow every hour during working hours (10:00 AM - 6:00 PM IST)
2. **Time Check**: The script verifies the current IST time is within the reminder window
3. **Random Message**: A random reminder message is selected from a pool of 15+ different messages
4. **Send to Chat**: The message is sent to your Google Chat space via webhook
5. **Logging**: Success/failure is logged for monitoring

## Reminder Messages

The system includes 15+ unique reminder messages that are randomly selected, including:

- "💧 Time to hydrate! Drink a glass of water to stay refreshed."
- "🚰 Hey there! Don't forget to drink some water. Your body will thank you!"
- "💦 Water break! Stay healthy and hydrated throughout the day."
- And many more!

## Configuration

### Changing Reminder Hours

To modify the reminder schedule, edit the cron expression in `.github/workflows/water-reminder.yml`:

```yaml
schedule:
  - cron: '30 4,5,6,7,8,9,10,11,12 * * *'
```

Note: Times are in UTC. Convert your desired IST time to UTC (IST - 5:30).

### Adding More Messages

Add new messages to the `reminderMessages` array in `sendReminder.js`:

```javascript
const reminderMessages = [
  "💧 Your custom message here!",
  // ... add more messages
];
```

## Troubleshooting

### Reminders Not Sending

1. Check that `GOOGLE_CHAT_WEBHOOK_URL` is correctly set in GitHub Secrets
2. Verify your webhook URL is valid and active
3. Check the Actions logs for error messages

### Wrong Time Zone

The script automatically handles IST (UTC+5:30). If you need a different timezone, modify the `timeZone` parameter in `sendReminder.js`:

```javascript
const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Your/Timezone' }));
```

## License

ISC

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Stay hydrated! 💧