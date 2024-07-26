# WebRTC Voice Chat Application

This is a real-time voice chat application built using WebRTC, Socket.IO, and Express.js. It allows users to join a lobby, select other users to chat with, and engage in peer-to-peer voice conversations.

## Features

- User lobby system
- Real-time user list updates
- Peer-to-peer voice chat using WebRTC
- Dockerized application for easy deployment
- Configurable for deployment on platforms like Render

## Prerequisites

- Node.js (v14.x or later)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/webrtc-voice-app.git
   cd webrtc-voice-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Local Development

To run the application locally:

```
npm start
```

The server will start on `http://localhost:3000`.

### Using Docker

To run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t webrtc-voice-app .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 webrtc-voice-app
   ```

The application will be accessible at `http://localhost:3000`.

### Using Docker Compose

To run the application using Docker Compose:

```
docker-compose up
```

## Deployment

This application is configured for deployment on Render using the `render.yaml` file. To deploy:

1. Fork this repository to your GitHub account.
2. Create a new Web Service on Render.
3. Connect your GitHub repository to Render.
4. Render will automatically detect the `render.yaml` file and configure the deployment.

## Usage

1. Open the application in a web browser.
2. Enter your username to join the lobby.
3. You'll see a list of other users in the lobby.
4. Select a user to initiate a voice chat.
5. If the selected user also selects you, a voice chat will be established.
6. Use the call controls to manage the voice chat (start call, hang up, mute, adjust volume).

## File Structure

- `server.js`: Main server file handling Express.js setup and Socket.IO logic
- `public/index.html`: Front-end HTML file
- `docker-compose.yml`: Docker Compose configuration for local development
- `Dockerfile`: Docker configuration for containerization
- `package.json`: Node.js package configuration
- `render.yaml`: Render deployment configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
