import { AuthProvider } from '../../contexts/authContext';

export const metadata = {
  title: "SONATA | Login",
  description: "Login to SONATA",
};

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
