import React, { useRef, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';


const ResetPassword = () => {
  const { showToast } = useToast();
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      showToast('warning', 'Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('success', 'Code verified successfully!');
      // Handle successful verification here
      setTimeout(() => {
        navigate('/new-password');
      }, 1500);
    } catch (error) {
      showToast('error', 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back button */}
          <div className="mb-3">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-green-600 hover:text-green-800 transition-all duration-300"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center gap-2"
              >
                <IoArrowBack className="text-xl" />
                <span className="text-sm font-medium">Back</span>
              </motion.div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-start mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Verify Code</h1>
            <p className="text-gray-500 text-sm font-semibold mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Verification Code Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Code'
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-green-600 hover:text-green-500 font-medium"
                onClick={() => showToast('success', 'New code sent!')}
              >
                Resend
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;