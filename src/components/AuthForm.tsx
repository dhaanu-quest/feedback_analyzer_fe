// import React, { useState } from 'react';
// import { LogIn, UserPlus } from 'lucide-react';

// interface AuthFormProps {
//   onLogin: (email: string, password: string) => void;
//   onRegister: (email: string, password: string) => void;
//   onSkip: () => void;
// }

// export function AuthForm({ onLogin, onRegister, onSkip }: AuthFormProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       onLogin(email, password);
//     } else {
//       onRegister(email, password);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isLogin ? 'Sign in to your account' : 'Create a new account'}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 {isLogin ? (
//                   <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
//                 ) : (
//                   <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
//                 )}
//               </span>
//               {isLogin ? 'Sign in' : 'Register'}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-sm text-blue-600 hover:text-blue-500"
//             >
//               {isLogin
//                 ? "Don't have an account? Register"
//                 : 'Already have an account? Sign in'}
//             </button>
//           </div>


//           <div className="text-center mt-4">
//             <button
//               type="button"
//               onClick={onSkip}
//               className="text-sm text-gray-600 hover:text-gray-500"
//             >
//               Skip, I will do later!
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
          <FileQuestion className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white">AI Feedback Analyzer</h1>
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