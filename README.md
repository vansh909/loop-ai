# Loop AI - Batch Processing API

A Node.js REST API that handles data ingestion with priority-based batch processing. The system processes data in batches with configurable priorities and provides real-time status updates.

## Features

- Batch processing with configurable batch sizes
- Priority-based queue processing (HIGH, MEDIUM, LOW)
- Real-time status tracking for each batch
- MongoDB integration for data persistence
- RESTful API endpoints
- Test coverage with Jest

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- Jest & Supertest for testing
- UUID for unique identifiers
- MongoDB Memory Server for testing

## Installation

```bash
# Clone the repository
git clone https://github.com/vansh909/loop-ai.git

# Navigate to project directory
cd loop-ai

# Install dependencies
npm install

# Create .env file and add your MongoDB URI
echo "MONGO_URI=your_mongodb_uri" > .env

# Start the server
npm start

# For development with auto-reload
npm run dev
```

## API Endpoints

### 1. Create Ingestion
```http
POST /api/ingest
Content-Type: application/json

{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
```

Response:
```json
{
  "ingestion_id": "uuid-generated-id"
}
```

### 2. Get Status
```http
GET /api/status/:ingestion_id
```

Response:
```json
{
  "ingestion_id": "abc123",
  "status": "triggered",
  "batches": [
    {
      "batch_id": "uuid",
      "ids": [1, 2, 3],
      "status": "completed"
    },
    {
      "batch_id": "uuid",
      "ids": [4, 5],
      "status": "triggered"
    }
  ]
}
```

## Architecture

- Data is processed in batches of 3 items
- Priority levels: HIGH > MEDIUM > LOW
- Queue processor runs every 5 seconds
- Each batch goes through states: yet_to_start → triggered → completed

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000 # Optional, defaults to 5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Vansh Chaudhary
- GitHub: [@vansh909](https://github.com/vansh909)