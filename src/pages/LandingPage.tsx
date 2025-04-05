import { SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { Activity } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FitnessLandingPage = () => {

    const user = useUser();
    const Login = user.isSignedIn;


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MotivateMovers</span>
        </div>
      
          <Link to="/home" className="bg-primary hover:bg-blue-400 text-white font-medium py-2 px-6 rounded-full">
          {!Login? 
              <SignedOut>
              <SignInButton />
            </SignedOut>
             :'Get Started'}
          </Link>
          
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative  py-32 bg-gray-900">

      <div className="absolute inset-0 overflow-hidden">
          <img 
            src="back.jpg" 
            alt="Fitness Background" 
            className="w-full h-full object-cover opacity-30"
          />
       
        </div>

        <div className="max-w-4xl z-20 mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-white">Fitness </span>
            <span className="text-primary">Revolution</span>
          </h1>
          <p className="text-white max-w-3xl mx-auto mb-8">
            Revolutionize your fitness journey with our AI-powered training app, delivering personalized workouts and nutrition plans for maximum results.
          </p>
          <button className="bg-primary hover:bg-primary text-white font-medium py-3 px-8 rounded-full">
            Explore Now
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">100+ Workouts</h3>
          <p className="text-gray-600 mb-4">
            Comprehensive library of exercises for all fitness levels
          </p>
          <a href="#" className="text-primary hover:text-blue-400 font-medium">
            Learn more →
          </a>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Customizable</h3>
          <p className="text-gray-600 mb-4">
            Personalized programs based on your goals and preferences
          </p>
          <a href="#" className="text-primary hover:text-indigo-700 font-medium">
            Learn more →
          </a>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Free to Use</h3>
          <p className="text-gray-600 mb-4">
            Basic features available at no cost with premium upgrades
          </p>
          <a href="#" className="text-primary hover:text-indigo-700 font-medium">
            Learn more →
          </a>
        </div>
        
        {/* Feature 4 */}
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600 mb-4">
            Expert trainers available to answer your questions anytime
          </p>
          <a href="#" className="text-primary hover:text-indigo-700 font-medium">
            Learn more →
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your fitness?</h2>
          <p className="text-gray-700 mb-8">Join thousands of users who have already achieved their fitness goals with our platform.</p>
          <button className="bg-primary hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-full">
            Start Your Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-xl">FitPrime</span>
              <p className="text-gray-400 mt-2">© 2025 FitPrime. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FitnessLandingPage;