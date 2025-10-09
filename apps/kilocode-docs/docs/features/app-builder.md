# App Builder

The App Builder feature in Kilo Code allows you to quickly scaffold new applications using AI-powered code generation. Instead of manually running setup commands or scaffolding tools, Kilo Code can create entire project structures for you with best practices built in.

## Overview

App Builder leverages Kilo Code's task execution capabilities to:
- Generate project structures for various application types
- Set up configuration files and dependencies
- Create README files with setup instructions
- Follow best practices for each framework or language

## Accessing App Builder

There are two ways to access the App Builder:

1. **Via the Sidebar Menu**: Click the rocket icon (🚀) in the Kilo Code sidebar toolbar
2. **Via Command Palette**: Open the VS Code Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and search for "App Builder"

## Supported Application Types

App Builder supports the following application types out of the box:

### Frontend Frameworks
- **React** - Modern React application with Vite or Create React App
- **Next.js** - Full-stack React framework with TypeScript support
- **Vue.js** - Progressive JavaScript framework
- **Angular** - TypeScript-based web framework

### Backend Frameworks
- **Node.js** - Backend Node.js server with Express (optional)
- **Express.js API** - Fast Node.js web framework
- **Python** - Python application with virtual environment setup
- **FastAPI** - Modern Python API framework
- **Django** - High-level Python web framework

### Mobile
- **Flutter** - Cross-platform mobile application
- **Android** - Native Android application with Kotlin

### Custom
- **Custom Application** - Specify your own requirements and let Kilo Code build it

## Using App Builder

1. **Select Application Type**: Choose from the dropdown menu of available application types
2. **Enter Application Name**: Provide a name for your application (required)
3. **Choose Target Directory** (optional): 
   - Leave empty to create in the current workspace
   - Click "Browse" to select a specific directory
   - Or manually enter a path like `./projects/my-app`
4. **Add Additional Requirements** (optional): Specify any custom features or configurations you'd like included, such as:
   - "Include authentication using JWT"
   - "Use Material-UI for styling"
   - "Add Jest testing setup"
   - "Include Docker configuration"
5. **Enable Dev Mode (Hybrid CI/CD)** (optional): Check this option to set up the application with:
   - Hot-reload/live-reload capabilities for real-time code changes
   - Embedded development tools and command-line interface
   - Runtime iteration support on device/emulator
   - Development server configuration for easy testing
6. **Click "Build Application"**: Kilo Code will create a new task and start building your application

## How It Works

When you click "Build Application", Kilo Code:

1. Creates a new task with a detailed description of what to build
2. Uses AI to generate the appropriate project structure
3. Creates all necessary files and folders
4. Sets up configuration files (package.json, requirements.txt, etc.)
5. Adds a README with instructions for running the app
6. Installs or lists required dependencies

The entire build process happens in the chat interface, so you can see each step and provide feedback if needed.

## Examples

### Creating a React Application

1. Select "React Application" from the dropdown
2. Name: `my-react-app`
3. Additional Requirements: "Use TypeScript, include React Router, add Tailwind CSS"
4. Click "Build Application"

Kilo Code will create a complete React app with TypeScript, routing, and Tailwind CSS configured.

### Creating a Python API

1. Select "FastAPI Application" from the dropdown
2. Name: `user-api`
3. Target Directory: `./backend/user-api`
4. Additional Requirements: "Include user authentication endpoints, use SQLAlchemy for database"
5. Click "Build Application"

Kilo Code will create a FastAPI application with authentication and database setup.

### Creating an Android App with Dev Mode

1. Select "Android Application" from the dropdown
2. Name: `my-android-app`
3. Enable Dev Mode: Check the "Enable Dev Mode (Hybrid CI/CD)" checkbox
4. Click "Build Application"

Kilo Code will create a native Android application with Kotlin that includes:
- Hot-reload capabilities for instant code changes
- Embedded development tools
- Terminal access for runtime commands
- Easy testing on emulator or physical device

## Dev Mode (Hybrid CI/CD)

Dev Mode is a special feature that configures your application for real-time iteration during development. When enabled, Kilo Code will set up:

### Key Features
- **Hot Module Replacement**: See your changes instantly without restarting the app
- **Live Reload**: Automatic app refresh when code changes
- **Embedded Terminal**: Command-line access during runtime for debugging and testing
- **Development Server**: Configured server environment for easy testing
- **Device/Emulator Support**: Optimized for testing on actual devices or emulators

### Supported App Types
Dev Mode is particularly useful for:
- **Mobile Apps** (Android, Flutter): Test changes on emulator or device in real-time
- **Web Apps** (React, Next.js, Vue): Instant browser refresh with hot reload
- **Backend APIs** (Node.js, Python): Auto-restart server on code changes

### Use Cases
- Rapid prototyping and feature development
- Live debugging on actual devices
- Interactive development with immediate feedback
- Real-time UI/UX adjustments

## Tips

- **Be Specific**: The more specific you are in the additional requirements, the better Kilo Code can tailor the application to your needs
- **Review the Output**: After the app is built, review the generated files to understand the structure
- **Customize Further**: You can always ask Kilo Code to modify the generated application in a follow-up message
- **Check Dependencies**: Make sure to install any dependencies (npm install, pip install, etc.) as instructed in the generated README

## Troubleshooting

### App Builder button not visible
Make sure you're using the latest version of Kilo Code. The App Builder is available in v4.101.0 and later.

### Build fails or times out
If the build process fails:
1. Check the error messages in the chat
2. Ensure you have the necessary tools installed (Node.js, Python, etc.)
3. Try with a simpler configuration first
4. Ask Kilo Code to fix any issues in a follow-up message

### Generated app doesn't match expectations
You can always ask Kilo Code to modify the generated application. Just describe what you'd like changed in the chat.

## API Usage

Developers can also use the App Builder programmatically via the Kilo Code API:

```typescript
import { API } from '@roo-code/api'

const api = new API(...)

// Build a React application
const taskId = await api.buildApp(
  'react',
  'my-app',
  './projects/my-app',
  {
    customRequirements: 'Include authentication and dark mode support'
  }
)
```

See the [API Documentation](../api) for more details.
