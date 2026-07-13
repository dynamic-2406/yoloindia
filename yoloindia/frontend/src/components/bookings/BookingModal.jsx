// import { useEffect, useMemo, useState } from 'react';
// import { CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
// import Modal from '../ui/Modal';
// import { createBookingOrder, verifyBookingPayment } from '../../services/api';
// import { formatPrice } from '../../utils/helpers';
// import { useToast } from '../ui/Toast';

// let razorpayScriptPromise = null;

// const loadRazorpayScript = () => {
//   if (typeof window === 'undefined') {
//     return Promise.resolve(false);
//   }

//   if (window.Razorpay) {
//     return Promise.resolve(true);
//   }

//   if (razorpayScriptPromise) {
//     return razorpayScriptPromise;
//   }

//   razorpayScriptPromise = new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });

//   return razorpayScriptPromise;
// };

// const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// const validatePhone = (value) => /^[0-9+\-()\s]{7,18}$/.test(value);

// const BookingModal = ({ isOpen, onClose, initialPackage, packages = [] }) => {
//   const { addToast } = useToast();
//   const fallbackPackage = useMemo(
//     () => initialPackage || packages[0] || null,
//     [initialPackage, packages],
//   );

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     packageId: fallbackPackage?.id || fallbackPackage?.slug || '',
//   });
//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState('idle');
//   const [bookingMeta, setBookingMeta] = useState(null);

//   useEffect(() => {
//     if (!isOpen) {
//       return;
//     }

//     setForm({
//       name: '',
//       email: '',
//       phone: '',
//       packageId: fallbackPackage?.id || fallbackPackage?.slug || '',
//     });
//     setErrors({});
//     setStatus('idle');
//     setBookingMeta(null);
//   }, [fallbackPackage, isOpen]);

//   const selectedPackage = packages.find(
//     (pkg) => String(pkg.id) === String(form.packageId) || String(pkg.slug) === String(form.packageId),
//   ) || fallbackPackage;

//   const validate = () => {
//     const nextErrors = {};

//     if (!form.name.trim()) nextErrors.name = 'Full name is required';
//     if (!validateEmail(form.email.trim())) nextErrors.email = 'Enter a valid email address';
//     if (!validatePhone(form.phone.trim())) nextErrors.phone = 'Enter a valid phone number';
//     if (!form.packageId) nextErrors.packageId = 'Please select a package';

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const completeVerification = async ({ orderId, paymentId, signature, mockSignature }) => {
//     const response = await verifyBookingPayment({
//       bookingReference: bookingMeta.bookingReference,
//       orderId,
//       paymentId,
//       signature,
//       mockSignature,
//       paymentMethod: 'razorpay',
//     });

//     setStatus('success');
//     addToast(response.message || 'Your booking has been confirmed.', 'success');

//     setTimeout(() => {
//       onClose?.();
//     }, 1800);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     try {
//       setStatus('loading');
//       const orderResponse = await createBookingOrder({
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         packageId: form.packageId,
//       });

//       setBookingMeta(orderResponse);

//       if (orderResponse.testMode) {
//         await completeVerification({
//           orderId: orderResponse.orderId,
//           paymentId: orderResponse.mockPaymentId,
//           signature: orderResponse.mockSignature,
//           mockSignature: orderResponse.mockSignature,
//         });
//         return;
//       }

//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded || typeof window.Razorpay === 'undefined') {
//         throw new Error('Unable to load Razorpay checkout. Please try again.');
//       }

//       const razorpay = new window.Razorpay({
//         key: orderResponse.keyId,
//         amount: orderResponse.amount,
//         currency: orderResponse.currency,
//         name: 'Yolo India Tours',
//         description: orderResponse.package?.title || 'Tour package booking',
//         order_id: orderResponse.orderId,
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.phone,
//         },
//         notes: {
//           booking_reference: orderResponse.bookingReference,
//           package_title: orderResponse.package?.title || '',
//         },
//         theme: {
//           color: '#f59e0b',
//         },
//         modal: {
//           ondismiss: () => {
//             setStatus('idle');
//           },
//         },
//         handler: async (response) => {
//           try {
//             await completeVerification({
//               orderId: orderResponse.orderId,
//               paymentId: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//             });
//           } catch (error) {
//             setStatus('error');
//             addToast(error.message || 'Payment verification failed', 'error');
//           }
//         },
//       });

//       razorpay.open();
//       setStatus('idle');
//     } catch (error) {
//       setStatus('error');
//       addToast(error.message || 'Unable to start booking', 'error');
//     }
//   };

//   if (status === 'success') {
//     return (
//       <Modal isOpen={isOpen} onClose={onClose} title="Booking Confirmed" size="md">
//         <div className="text-center py-6">
//           <CheckCircle size={56} className="text-forest-500 mx-auto mb-4" />
//           <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Payment successful</h3>
//           <p className="font-body text-gray-500 text-sm leading-relaxed">
//             Your booking request has been verified and saved securely. Our team will reach out shortly with the next steps.
//           </p>
//         </div>
//       </Modal>
//     );
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Book Your Package" size="lg">
//       <div className="space-y-5">
//         <div className="rounded-2xl bg-saffron-50 border border-saffron-100 p-4">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <p className="text-xs uppercase tracking-widest text-saffron-700 font-semibold">Selected package</p>
//               <h4 className="font-display text-lg font-bold text-gray-900 mt-1">{selectedPackage?.title || 'Choose a package'}</h4>
//               {selectedPackage?.destination && (
//                 <p className="font-body text-sm text-gray-600 mt-1">{selectedPackage.destination}</p>
//               )}
//             </div>
//             {selectedPackage?.price ? (
//               <div className="text-right">
//                 <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">From</p>
//                 <p className="font-display text-2xl font-bold text-saffron-600">{formatPrice(selectedPackage.price)}</p>
//               </div>
//             ) : null}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="sm:col-span-1">
//             <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//               Full Name
//             </label>
//             <input
//               value={form.name}
//               onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
//               className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
//               placeholder="Your full name"
//             />
//             {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
//           </div>

//           <div className="sm:col-span-1">
//             <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//               Email
//             </label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
//               className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
//               placeholder="you@email.com"
//             />
//             {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//           </div>

//           <div className="sm:col-span-1">
//             <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={form.phone}
//               onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
//               className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
//               placeholder="+91 98765 43210"
//             />
//             {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
//           </div>

//           <div className="sm:col-span-1">
//             <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//               Select Package
//             </label>
//             <select
//               value={form.packageId}
//               onChange={(event) => setForm((prev) => ({ ...prev, packageId: event.target.value }))}
//               className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.packageId ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
//             >
//               <option value="">Choose a package</option>
//               {packages.map((pkg) => (
//                 <option key={pkg.id || pkg.slug} value={pkg.id || pkg.slug}>
//                   {pkg.title} {pkg.price ? `- ${formatPrice(pkg.price)}` : ''}
//                 </option>
//               ))}
//             </select>
//             {errors.packageId && <p className="mt-1 text-xs text-red-500">{errors.packageId}</p>}
//           </div>

//           <div className="sm:col-span-2 rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3">
//             <ShieldCheck size={18} className="text-saffron-500 mt-0.5 flex-shrink-0" />
//             <p className="font-body text-sm text-gray-600 leading-relaxed">
//               After you submit this form, we will create a secure Razorpay order and continue the checkout flow. In test mode, the payment is simulated so we can verify the backend flow end to end.
//             </p>
//           </div>

//           <div className="sm:col-span-2">
//             <button
//               type="submit"
//               disabled={status === 'loading'}
//               className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-body font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
//             >
//               {status === 'loading' ? (
//                 <>
//                   <Loader2 size={18} className="animate-spin" />
//                   Starting checkout...
//                 </>
//               ) : (
//                 'Proceed to Secure Payment'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default BookingModal;

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import Modal from '../ui/Modal';
import { createBookingOrder, verifyBookingPayment } from '../../services/api';
import { formatPrice } from '../../utils/helpers';
import { useToast } from '../ui/Toast';
import PaymentSuccess from './PaymentSuccess';

let razorpayScriptPromise = null;

const loadRazorpayScript = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validatePhone = (value) => /^[0-9+\-()\s]{7,18}$/.test(value);

const BookingModal = ({ isOpen, onClose, initialPackage, packages = [] }) => {
  const { addToast } = useToast();
  const fallbackPackage = useMemo(
    () => initialPackage || packages[0] || null,
    [initialPackage, packages],
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    packageId: fallbackPackage?.id || fallbackPackage?.slug || '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [bookingMeta, setBookingMeta] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      name: '',
      email: '',
      phone: '',
      packageId: fallbackPackage?.id || fallbackPackage?.slug || '',
    });
    setErrors({});
    setStatus('idle');
    setBookingMeta(null);
  }, [fallbackPackage, isOpen]);

  const selectedPackage = packages.find(
    (pkg) => String(pkg.id) === String(form.packageId) || String(pkg.slug) === String(form.packageId),
  ) || fallbackPackage;

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Full name is required';
    if (!validateEmail(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!validatePhone(form.phone.trim())) nextErrors.phone = 'Enter a valid phone number';
    if (!form.packageId) nextErrors.packageId = 'Please select a package';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const completeVerification = async ({ orderId, paymentId, signature, mockSignature, bookingReference: br }) => {
    const bookingReference = br || bookingMeta?.bookingReference;
    if (!bookingReference) {
      throw new Error('Missing booking reference for verification');
    }

    const response = await verifyBookingPayment({
      bookingReference,
      orderId,
      paymentId,
      signature,
      mockSignature,
      paymentMethod: 'razorpay',
    });

    setBookingMeta(prev => ({ ...(prev || {}), paymentId }));
    setStatus('success');
    addToast(response?.message || 'Your booking has been confirmed.', 'success');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setStatus('loading');
      const orderResponse = await createBookingOrder({
        name: form.name,
        email: form.email,
        phone: form.phone,
        packageId: form.packageId,
      });

      setBookingMeta(orderResponse);

      if (orderResponse.testMode) {
        await completeVerification({
          orderId: orderResponse.orderId,
          paymentId: orderResponse.mockPaymentId,
          signature: orderResponse.mockSignature,
          mockSignature: orderResponse.mockSignature,
          bookingReference: orderResponse.bookingReference,
        });
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || typeof window.Razorpay === 'undefined') {
        throw new Error('Unable to load Razorpay checkout. Please try again.');
      }

      const razorpay = new window.Razorpay({
        key: orderResponse.keyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Yolo India Tours',
        description: orderResponse.package?.title || 'Tour package booking',
        order_id: orderResponse.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          booking_reference: orderResponse.bookingReference,
          package_title: orderResponse.package?.title || '',
        },
        theme: {
          color: '#f59e0b',
        },
        modal: {
          ondismiss: () => {
            setStatus('idle');
          },
        },
            handler: async (response) => {
          try {
            await completeVerification({
              orderId: orderResponse.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bookingReference: orderResponse.bookingReference,
            });
          } catch (error) {
            setStatus('error');
            addToast(error.message || 'Payment verification failed', 'error');
          }
        },
      });

      razorpay.open();
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      addToast(error.message || 'Unable to start booking', 'error');
    }
  };

  if (status === 'success') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <PaymentSuccess
          amount={bookingMeta?.amount ? bookingMeta.amount / 100 : selectedPackage?.price}
          transactionId={bookingMeta?.paymentId || bookingMeta?.mockPaymentId || 'Pending'}
          bookingId={bookingMeta?.bookingReference || bookingMeta?.orderId}
          date={new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          onClose={() => {
            onClose?.();
            window.location.href = '/';
          }}
        />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Your Package" size="lg">
      <div className="space-y-5">
        <div className="rounded-2xl bg-saffron-50 border border-saffron-100 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-saffron-700 font-semibold">Selected package</p>
              <h4 className="font-display text-lg font-bold text-gray-900 mt-1">{selectedPackage?.title || 'Choose a package'}</h4>
              {selectedPackage?.destination && (
                <p className="font-body text-sm text-gray-600 mt-1">{selectedPackage.destination}</p>
              )}
            </div>
            {selectedPackage?.price ? (
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">From</p>
                <p className="font-display text-2xl font-bold text-saffron-600">{formatPrice(selectedPackage.price)}</p>
              </div>
            ) : null}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-1">
            <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
              placeholder="you@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Select Package
            </label>
            <select
              value={form.packageId}
              onChange={(event) => setForm((prev) => ({ ...prev, packageId: event.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all ${errors.packageId ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <option value="">Choose a package</option>
              {packages.map((pkg) => (
                <option key={pkg.id || pkg.slug} value={pkg.id || pkg.slug}>
                  {pkg.title} {pkg.price ? `- ${formatPrice(pkg.price)}` : ''}
                </option>
              ))}
            </select>
            {errors.packageId && <p className="mt-1 text-xs text-red-500">{errors.packageId}</p>}
          </div>

          <div className="sm:col-span-2 rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3">
            <ShieldCheck size={18} className="text-saffron-500 mt-0.5 flex-shrink-0" />
            <p className="font-body text-sm text-gray-600 leading-relaxed">
              After you submit this form, we will create a secure Razorpay order and continue the checkout flow.
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-body font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Starting checkout...
                </>
              ) : (
                'Proceed to Secure Payment'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
