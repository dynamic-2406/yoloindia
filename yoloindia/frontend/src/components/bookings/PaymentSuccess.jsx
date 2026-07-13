import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const PaymentSuccess = ({ amount, transactionId, bookingId, date, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white">
      {/* Animated Success Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
        >
          <Check size={32} strokeWidth={3} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Payment Successful Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful</h2>
        <p className="text-gray-500 text-sm mb-6">Your booking has been confirmed securely.</p>
      </motion.div>

      {/* Amount Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="text-center mb-8"
      >
        <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
          ₹{amount?.toLocaleString('en-IN') || '0'}
        </span>
      </motion.div>

      {/* Transaction Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 shadow-sm"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium text-gray-900">{transactionId || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-medium text-gray-900">{bookingId || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Date & Time</span>
            <span className="font-medium text-gray-900">{date || 'N/A'}</span>
          </div>
        </div>
      </motion.div>

      {/* Reassuring Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-sm text-gray-600 mb-8 max-w-sm"
      >
        A confirmation email has been sent to your registered email address with the booking details.
      </motion.p>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full"
      >
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5"
        >
          Continue to Homepage
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;