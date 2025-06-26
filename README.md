# My Alert - Bus Arrival Notification System

A Node.js application that monitors KMB bus arrivals and sends push notifications when buses are approaching. Perfect for commuters who want to be alerted when their bus is about to arrive.

## Features

- 🚌 **Real-time Bus Monitoring**: Monitors KMB bus arrivals using the Hong Kong eTransport API
- 📱 **Push Notifications**: Sends alerts via Pushover when buses are 15-16 minutes away
- ⏰ **Smart Scheduling**: Automatically runs on workdays (Monday-Friday) at 8:54 AM
- 🔄 **Continuous Monitoring**: Checks bus arrivals every 30 seconds for up to 30 minutes
- 🛡️ **Error Handling**: Robust error handling with console logging

## How It Works

The application:
1. Runs a cron job every weekday at 8:54 AM
2. Monitors bus arrivals at the specified bus stop (屯門官立中學 - TM731)
3. Tracks routes 67M and 67A
4. Sends a push notification when a bus is 15-16 minutes away
5. Continues monitoring for up to 30 minutes or until an alert is sent

## Prerequisites

- Node.js (v14 or higher)
- Pushover account and API credentials
- TypeScript knowledge (for development)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fredFung9527/my-alert.git
   cd my-alert
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PUSHOVER_TOKEN=your_pushover_token_here
   PUSHOVER_USER=your_pushover_user_key_here
   ```

   To get these credentials:
   - Sign up at [Pushover](https://pushover.net/)
   - Create a new application to get your token
   - Your user key is available in your account settings

## Usage

### Development
```bash
npm run dev
# or
yarn dev
```

### Production
```bash
# Build the project
npm run build
# or
yarn build

# Start the application
npm start
# or
yarn start
```

## Configuration

### Bus Stop and Routes
The application is currently configured for:
- **Bus Stop**: 屯門官立中學 (TM731) - Stop ID: `665CE110A84542E9`
- **Routes**: 67M, 67A
- **Schedule**: Weekdays at 8:54 AM

To modify these settings, edit `croner/bus.ts`:
```typescript
const stopId = 'YOUR_STOP_ID' // Change bus stop
const routes = ['YOUR_ROUTE_1', 'YOUR_ROUTE_2'] // Change routes
```

### Alert Timing
The alert is triggered when buses are 15-16 minutes away. To change this, modify the condition in `croner/bus.ts`:
```typescript
if (minDiff === 15 || minDiff === 16) { // Change timing here
```

## Project Structure

```
my-alert/
├── croner/
│   └── bus.ts              # Bus monitoring cron job
├── utils/
│   ├── bus-kmb.ts          # KMB API integration
│   └── pushover.ts         # Pushover notification service
├── index.ts                # Main application entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## API Integration

The application uses the Hong Kong eTransport API to fetch real-time bus arrival data:
- **Endpoint**: `https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/{stopId}`
- **Data Source**: KMB (Kowloon Motor Bus) real-time data

## Dependencies

- **croner**: Cron job scheduling
- **axios**: HTTP client for API calls
- **dotenv**: Environment variable management
- **typescript**: Type safety and compilation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions:
- Create an issue on [GitHub](https://github.com/fredFung9527/my-alert/issues)
- Check the console logs for error messages
- Verify your Pushover credentials are correct

## Roadmap

- [ ] Support for multiple bus stops
- [ ] Configurable alert timing
- [ ] Web interface for configuration
- [ ] Support for other bus companies
- [ ] Weather-based alerts
- [ ] Multiple notification channels