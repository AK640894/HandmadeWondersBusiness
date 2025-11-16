import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SparkleIcon } from '../components/Icon';
import Button from '../components/Button';

interface LoginPageProps {
  navigateToHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateToHome }) => {
  const { currentUser, login } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigateToHome();
    }
  }, [currentUser, navigateToHome]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
        login(email);
        navigateToHome();
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <SparkleIcon className="mx-auto h-12 w-auto text-brand-terracotta" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            to access your orders and more.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-sage focus:outline-none focus:ring-brand-sage sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;