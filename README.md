# TraceVault Frontend - Vercel Demo

This is a standalone version of the TraceVault frontend that works without a backend, using hardcoded authentication for demo purposes.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## 🔐 Demo Login Credentials

The frontend uses hardcoded mock users for demonstration:

### Admin User
- **Email:** admin@tracevault.com
- **Password:** admin123
- **Role:** Admin (full access)

### Manager User  
- **Email:** manager@tracevault.com
- **Password:** manager123
- **Role:** Manager (team management)

### Analyst User
- **Email:** analyst@tracevault.com
- **Password:** analyst123
- **Role:** Analyst (read/write access)

## 📱 Features Available

- ✅ User authentication with mock users
- ✅ Dashboard with mock data
- ✅ Vulnerability management interface
- ✅ Security analytics
- ✅ User management (mock)
- ✅ Settings and profile

## 🛠️ Technical Details

### Authentication
- Uses localStorage for session management
- Mock JWT tokens generated client-side
- No backend API calls required
- Session persists on page refresh

### Data
- All data is mocked/hardcoded
- No database connections
- Simulated API delays for realistic UX

### Deployment
- Ready for Vercel deployment
- No environment variables required
- Static site compatible

## 🚀 Deploy to Vercel

1. Push this folder to GitHub
2. Connect repository to Vercel
3. Deploy - no configuration needed!

## 📝 Notes

- This is a demo/prototype version
- Data changes are not persisted
- For production use, connect to the TraceVault backend API
- Mock users can be modified in `src/services/auth.service.ts`
