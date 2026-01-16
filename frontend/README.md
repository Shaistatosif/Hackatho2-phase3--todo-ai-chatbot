# Todo AI Chatbot - Frontend

Modern, responsive chat interface for the Todo AI Chatbot built with Next.js 14, TypeScript, and Better Auth.

## Features

- Clean, modern chat interface with real-time messaging
- User authentication with Better Auth
- Conversation history and context preservation
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Fast page loads with Next.js App Router

## Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm
- Backend API running (see backend README)

## Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Configuration

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables in `.env.local`:**
   ```env
   # Backend API URL
   NEXT_PUBLIC_API_URL=http://localhost:8000

   # Better Auth Configuration
   # Generate with: openssl rand -base64 32
   # IMPORTANT: Must be at least 32 characters and match backend AUTH_SECRET
   AUTH_SECRET=your-secret-key-at-least-32-characters-long

   # App URL (for authentication callbacks)
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Optional: OpenAI API Key (if using client-side AI features)
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at http://localhost:3000

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Login/Home page
│   │   ├── signup/          # Sign up page
│   │   │   └── page.tsx
│   │   ├── chat/            # Main chat interface
│   │   │   └── page.tsx
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── ChatWindow.tsx   # Main chat interface component
│   │   ├── MessageList.tsx  # Message display component
│   │   ├── MessageInput.tsx # Message input component
│   │   └── SignUpBuddy.tsx  # Sign up form component
│   ├── hooks/               # Custom React hooks
│   │   └── useChat.ts       # Chat state management hook
│   ├── lib/                 # Utility libraries
│   │   ├── api.ts           # API client functions
│   │   └── auth.ts          # Better Auth configuration
│   └── middleware.ts        # Next.js middleware for auth
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── .env.local              # Local environment variables (gitignored)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Key Components

### ChatWindow
The main chat interface component that handles:
- Message display
- User input
- Real-time conversation updates
- Loading states

### useChat Hook
Custom hook for managing chat state:
- Sending messages to backend
- Maintaining conversation history
- Error handling
- Loading states

### API Client
Centralized API communication with:
- Type-safe request/response handling
- Error handling
- Authentication headers
- Base URL configuration

## Authentication

The app uses Better Auth for authentication:

1. **Sign Up**: Users can create accounts via `/signup`
2. **Login**: Existing users log in at the home page
3. **Protected Routes**: Chat page requires authentication
4. **Session Management**: Automatic session handling with Better Auth

## API Integration

The frontend communicates with the backend via REST API:

### Endpoints Used

- `POST /api/{user_id}/chat` - Send messages
  ```typescript
  {
    message: string;
    conversation_id: number | null;
  }
  ```

- `GET /api/{user_id}/tasks` - Get user's tasks
- `GET /api/{user_id}/conversations` - Get conversation list
- `GET /api/{user_id}/conversations/{id}` - Get specific conversation

### API Client Example

```typescript
import { sendMessage, getTasks } from '@/lib/api';

// Send a message
const response = await sendMessage(userId, {
  message: 'Add buy groceries',
  conversation_id: null
});

// Get tasks
const tasks = await getTasks(userId, 'pending');
```

## Styling

The app uses Tailwind CSS for styling:

- Responsive design (mobile-first)
- Dark mode support (optional)
- Custom color palette
- Utility-first CSS classes

### Customizing Styles

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_API_URL | Backend API base URL | Yes |
| AUTH_SECRET | Secret key for Better Auth (32+ chars) | Yes |
| NEXT_PUBLIC_APP_URL | Frontend app URL for callbacks | Yes |
| OPENAI_API_KEY | OpenAI API key (if using client features) | No |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Development Tips

### Hot Reload
Next.js automatically reloads when you save files.

### Type Checking
TypeScript provides type safety. Run type check:
```bash
npx tsc --noEmit
```

### Component Development
- Keep components small and focused
- Use TypeScript interfaces for props
- Extract reusable logic into custom hooks
- Follow Next.js best practices for Server/Client Components

### API Error Handling
The API client includes error handling:
```typescript
try {
  const response = await sendMessage(userId, data);
  // Handle success
} catch (error) {
  // Error already logged by API client
  // Show user-friendly message
}
```

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel auto-deploys on git push

### Other Platforms

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Or serve static files** (for static export):
   ```bash
   # Add to next.config.js: output: 'export'
   npm run build
   # Serve the 'out' directory
   ```

## Performance

- **Fast Page Loads**: Next.js App Router with streaming
- **Code Splitting**: Automatic code splitting per route
- **Image Optimization**: Next.js Image component
- **Caching**: Automatic caching of static assets

## Security

- **Environment Variables**: Sensitive data in `.env.local`
- **Authentication**: Better Auth with secure session management
- **HTTPS**: Use HTTPS in production
- **Input Validation**: All user inputs validated
- **XSS Protection**: React's built-in XSS protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS settings in backend
- Check browser console for errors

### Authentication Issues
- Ensure `AUTH_SECRET` matches backend
- Clear browser cookies and try again
- Check Better Auth configuration in `lib/auth.ts`

## Contributing

When contributing:
1. Follow TypeScript and ESLint conventions
2. Write tests for new features
3. Update documentation
4. Test on multiple browsers

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Better Auth](https://better-auth.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
