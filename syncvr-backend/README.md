# SyncVR Server

The server acts as the backbone of SyncVR, managing API requests, handling user data, and connecting to the MongoDB database to store session and synchronization data.

## Setup Instructions

### Environment Variables:
- `PORT`: Port on which the server runs.
- `MONGODB_URI`: MongoDB connection string.
- `MONGODB_DB_NAME`: Name of the database in MongoDB.
- `TEST_IP` (optional): For local or external server testing.

### Running the Server

1. Install dependencies: `npm install`
2. Set up environment variables as described above.
3. Start the server: `npm start`

The server communicates with both the front-end dashboard and the Unity VR application to provide real-time data and manage participant sessions.
