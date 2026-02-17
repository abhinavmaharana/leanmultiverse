# Admin Dashboard Setup Guide

## Step 1: Database Setup

1. Go to your Supabase project: https://supabase.com
2. Navigate to **SQL Editor**
3. Run the following SQL to create the `admin_users` table:

```sql
-- Admin Users Table Schema
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Function to update updated_at timestamp (if not already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for admin_users
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 2: Environment Variables

Add these to your `.env.local` file:

```env
# Admin Authentication
ADMIN_JWT_SECRET=your-secret-key-here-change-this-in-production
ADMIN_DEFAULT_USERNAME=admin
ADMIN_DEFAULT_PASSWORD=your-secure-password-here
```

**Important:**
- `ADMIN_JWT_SECRET`: Use a long, random string (at least 32 characters)
- `ADMIN_DEFAULT_PASSWORD`: Choose a strong password
- Never commit `.env.local` to version control

**Production:** To allow initializing or resetting the default admin in production, set `ADMIN_INIT_SECRET` and send it in the `x-admin-init-secret` header (or in the request body as `adminInitSecret`) when calling `POST /api/admin/init`. If `ADMIN_INIT_SECRET` is not set in production, the init endpoint returns 404.

## Step 3: Initialize Admin User

After setting the environment variables, initialize the default admin user:

**Option 1: Using curl**
```bash
curl -X POST http://localhost:3000/api/admin/init
```

**Option 2: Using browser**
- Open: `http://localhost:3000/api/admin/init` (you'll need to use a tool like Postman or make a POST request)

**Option 3: Using the terminal**
```bash
# If you have httpie installed
http POST http://localhost:3000/api/admin/init
```

You should see:
```json
{"success":true,"message":"Default admin user initialized (if it did not exist)"}
```

## Step 4: Login

1. Navigate to: `http://localhost:3000/admin/login`
2. Use the credentials from your `.env.local`:
   - Username: `admin` (or whatever you set in `ADMIN_DEFAULT_USERNAME`)
   - Password: The password you set in `ADMIN_DEFAULT_PASSWORD`

## Troubleshooting

### Error: "Invalid username or password"

1. **Check if the table exists:**
   - Go to Supabase → Table Editor
   - Verify `admin_users` table exists

2. **Check environment variables:**
   - Make sure `ADMIN_DEFAULT_USERNAME` and `ADMIN_DEFAULT_PASSWORD` are set
   - Restart your dev server after adding them

3. **Initialize the admin user:**
   - Call `POST /api/admin/init` to create the default user

4. **Check database connection:**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set correctly

### Error: "Table admin_users does not exist"

- Run the SQL migration from Step 1 in your Supabase SQL Editor

### Error: "Failed to initialize admin user"

- Check your Supabase connection
- Verify the `admin_users` table was created
- Check server logs for detailed error messages

## Security Notes

- Change the default password after first login
- Use a strong `ADMIN_JWT_SECRET` in production
- Consider adding additional admin users through the database if needed
- The JWT token expires after 24 hours

