"use client";

import Image from "next/image";
import { Button } from "../components/ui/button"
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import { ArrowRight, FileText, Brain, Zap, Shield, Users, Upload, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
    
export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.users.create);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        username: user?.fullName,
      });
      console.log("User created:", result);
      } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AI-PDF</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
      <UserButton />
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/sign-in">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered PDF Analysis
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your PDFs with
              <span className="text-indigo-600 block"> Intelligent Notes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload your PDFs and let AI help you take smart notes, answer questions, 
              and extract insights from your documents with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3">
                    Start Taking Notes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/sign-up">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  See How It Works
                </Button>
              </Link>
            </div>
            
            {/* Demo Image */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">Upload your PDF</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-64 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Brain className="h-16 w-16 text-indigo-600" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">AI analyzes content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Document Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make your PDF workflow more efficient and intelligent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy PDF Upload</h3>
              <p className="text-gray-600">
                Simply drag and drop your PDF files. Our system processes them instantly for analysis.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced AI algorithms understand your documents and extract key insights automatically.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Q&A</h3>
              <p className="text-gray-600">
                Ask questions about your documents and get instant, accurate answers powered by AI.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Text Editor</h3>
              <p className="text-gray-600">
                Take notes with our powerful editor featuring formatting, headings, lists, and more.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your documents and notes are encrypted and stored securely in the cloud.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration Ready</h3>
              <p className="text-gray-600">
                Share notes and collaborate with team members on important documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your PDF</h3>
              <p className="text-gray-600">
                Simply upload your PDF file through our intuitive interface
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Processes Content</h3>
              <p className="text-gray-600">
                Our AI analyzes and extracts key information from your document
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Take Smart Notes</h3>
              <p className="text-gray-600">
                Use AI-powered Q&A and rich text editor to create intelligent notes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your PDF Experience?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using AI-PDF to make their document workflow more efficient
          </p>
          {user ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI-PDF</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your PDF reading and note-taking experience with AI
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
