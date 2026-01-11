"use client"
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src={'/logo1.png'} alt="logo" width={180} height={180} className="h-10 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Get Started Free
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center gap-3">
                  <a href="/dashboard" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                    Dashboard
                  </a>
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                ✨ AI-Powered Career Assistant
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transform Your Career
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                with AI Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Unlock your professional potential with cutting-edge AI tools for resume building, 
              career planning, interview preparation, and personalized job search strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/dashboard" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Start Your Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful AI Tools for Your Career
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to stand out in today's competitive job market
            </p>
          </div>

          {/* First Row - 2 Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="10" height="14" x="3" y="8" rx="2" strokeWidth="2" />
                    <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" strokeWidth="2" />
                    <path d="M8 18h.01" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  AI Resume Builder
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Create ATS-optimized resumes that get noticed. Our AI analyzes job descriptions and tailors your resume for maximum impact.
                </p>
                <a href="/dashboard" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 gap-2 transition-all">
                  Build Resume 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20 7h-9" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 17H5" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="17" cy="17" r="3" strokeWidth="2" />
                    <circle cx="7" cy="7" r="3" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  AI Resume Analyzer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Get instant feedback on your resume. Our AI identifies weak spots and suggests improvements to boost your chances.
                </p>
                <a href="/dashboard" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 gap-2 transition-all">
                  Analyze Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Center Card - AI Mock Interview */}
          <div className="flex justify-center mb-8">
            <div className="group relative bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-500 dark:hover:border-cyan-400 w-full md:w-2/3 lg:w-1/2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
                    <path d="M9 10h.01M15 10h.01M9.5 15.5a3.5 3.5 0 005 0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  AI Mock Interview
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Practice interviews with our AI interviewer. Get real-time feedback, improve your answers, and build confidence for the big day.
                </p>
                <a href="/dashboard" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 gap-2 transition-all">
                  Start Practice
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Second Row - 2 Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-500 dark:hover:border-green-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" strokeWidth="2" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Career Roadmap Generator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Visualize your career path with personalized roadmaps. Set goals, track milestones, and achieve your dreams.
                </p>
                <a href="/dashboard" className="inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:gap-3 gap-2 transition-all">
                  Create Roadmap
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-500 dark:hover:border-orange-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" strokeWidth="2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Cover Letter Generator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Generate compelling cover letters in seconds. Personalized content that highlights your strengths and passion.
                </p>
                <a href="/dashboard" className="inline-flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:gap-3 gap-2 transition-all">
                  Generate Letter
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've transformed their careers with our AI-powered tools.
              </p>
              <a 
                href="/dashboard" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2"
              >
                Get Started for Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2026 AI Career Coach. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
