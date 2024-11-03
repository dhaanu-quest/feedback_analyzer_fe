import React, { useState } from 'react';
import { LogIn, UserPlus, FileQuestion } from 'lucide-react';

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
  onSkip: () => void;
}

export function AuthForm({ onLogin, onRegister, onSkip }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(email, password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
          <FileQuestion className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white">AI Feedback Analyzer</h1>
        </div>
      </div> */}

      <div className="text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
              <FileQuestion className="h-6 w-6 text-white" />
              <h1 className="text-2xl font-bold text-white">AI Feedback Analyzer</h1>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Transform Your Customer Feedback
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            AI Feedback Analyzer uses advanced machine learning to analyze customer feedback,
            providing actionable insights, sentiment analysis, and trend identification.
            Integrate with your favorite tools like Jira and ClickUp to streamline your
            workflow and make data-driven decisions.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/90">
              Sentiment Analysis
            </div>
            <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/90">
              Theme Detection
            </div>
            <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/90">
              Priority Insights
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full m-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-white/10 mb-4">
              {isLogin ? (
                <LogIn className="h-8 w-8 text-white" />
              ) : (
                <UserPlus className="h-8 w-8 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back!' : 'Create account'}
            </h2>
            <p className="text-white/80">
              {isLogin
                ? 'Enter your credentials to access your account'
                : 'Sign up for a new account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-purple-600 rounded-xl font-medium hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>

            <div className="flex flex-col space-y-3 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : 'Already have an account? Sign in'}
              </button>

              <button
                type="button"
                onClick={onSkip}
                className="text-sm text-white/60 hover:text-white/90 transition-colors underline decoration-dashed underline-offset-4"
              >
                Skip, I will do later!
              </button>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}