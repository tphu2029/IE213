import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, User, FileText, CreditCard, Wallet, Landmark, Banknote, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethodId?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
}

interface PaymentMethod {
  id: string;
  name: string;
  provider: string;
  type: 'credit_card' | 'bank_transfer' | 'digital_wallet' | 'cash';
  status: 'active' | 'inactive';
  isDefault: boolean;
}

export function BookAppointment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  useEffect(() => {
    // Load doctors from localStorage
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setDoctors(storedDoctors);

    // Load payment methods from localStorage
    const storedPayments = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    const activePayments = storedPayments.filter((pm: PaymentMethod) => pm.status === 'active');
    setPaymentMethods(activePayments);

    const defaultPayment = activePayments.find((pm: PaymentMethod) => pm.isDefault);
    if (defaultPayment) {
      setSelectedPaymentMethod(defaultPayment.id);
    } else if (activePayments.length > 0) {
      setSelectedPaymentMethod(activePayments[0].id);
    }
  }, []);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethods.length > 0 && !selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsLoading(true);

    // Simulate API call for payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      userId: user!.id,
      doctorId: formData.doctorId,
      doctorName: selectedDoctor!.name,
      specialty: selectedDoctor!.specialty,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethodId: selectedPaymentMethod || undefined,
      paymentStatus: 'paid', // Mark as paid once checkout is complete
    };

    // Save to localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    toast.success('Appointment booked and paid successfully!');
    setIsLoading(false);
    navigate('/dashboard');
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard className="w-6 h-6" />;
      case 'bank_transfer': return <Landmark className="w-6 h-6" />;
      case 'digital_wallet': return <Wallet className="w-6 h-6" />;
      case 'cash': return <Banknote className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-between z-10 relative">
            <div className={`flex flex-col items-center flex-1 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 bg-white ${step >= 1 ? 'border-blue-600' : 'border-gray-300'}`}>
                1
              </div>
              <span className="text-sm font-medium">Appointment Details</span>
            </div>
            <div className="flex-1 border-t-2 border-gray-300 -ml-16 -mr-16 mt-[-24px] z-[-1]" />
            <div className={`flex flex-col items-center flex-1 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 bg-white ${step >= 2 ? 'border-blue-600' : 'border-gray-300'}`}>
                2
              </div>
              <span className="text-sm font-medium">Payment & Confirmation</span>
            </div>
          </div>
          <div className="absolute top-5 left-1/4 right-1/4 h-0.5 bg-gray-200 -z-10">
            <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 2 ? 'w-full' : 'w-0'}`} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {step === 1 ? 'Book an Appointment' : 'Complete Payment'}
            </h1>
            <p className="text-gray-600">
              {step === 1 ? 'Schedule your visit with our expert doctors' : 'Securely pay for your upcoming appointment'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Doctor Selection */}
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    id="doctorId"
                    name="doctorId"
                    required
                    value={formData.doctorId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please briefly describe your symptoms or reason for visit"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 font-medium"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Summary Card */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h3 className="font-semibold text-blue-900 mb-4">Appointment Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 block mb-1">Doctor</span>
                    <span className="font-medium text-gray-900">
                      {doctors.find(d => d.id === formData.doctorId)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700 block mb-1">Specialty</span>
                    <span className="font-medium text-gray-900">
                      {doctors.find(d => d.id === formData.doctorId)?.specialty}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700 block mb-1">Date & Time</span>
                    <span className="font-medium text-gray-900">
                      {formData.date} at {formData.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700 block mb-1">Consultation Fee</span>
                    <span className="font-medium text-gray-900">$150.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
                
                {paymentMethods.length > 0 ? (
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label 
                        key={method.id} 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id 
                            ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center h-5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedPaymentMethod === method.id}
                            onChange={() => setSelectedPaymentMethod(method.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-4 flex items-center justify-between flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md ${
                                selectedPaymentMethod === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {getPaymentIcon(method.type)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 flex items-center gap-2">
                                {method.name}
                                {method.isDefault && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">Default</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{method.provider}</div>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No payment methods configured.</p>
                    <p className="text-sm text-gray-500 mt-1">Your appointment will be marked as "Pay at clinic".</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-70 font-medium"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Confirm & Pay $150.00'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
