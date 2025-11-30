import { LoginForm } from '@/components/LoginForm';

/**
 * Login Page - Server Component
 *
 * CORRECT PATTERN: Page is a Server Component
 * - The form component handles the client-side interactivity
 * - Login action is a Server Action with built-in CSRF protection
 */
export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Login</h1>
        <p className="page-description">
          Sign in to access the dashboard
        </p>
      </div>

      <div className="card">
        <LoginForm />
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3 className="card-title">Test Credentials</h3>
        <div className="card-content">
          <p><strong>Admin:</strong> admin@test.com / admin123</p>
          <p><strong>User:</strong> user@test.com / user123</p>
        </div>
      </div>
    </div>
  );
}
