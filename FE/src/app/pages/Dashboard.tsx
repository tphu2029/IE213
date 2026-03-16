import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, AlertCircle, Plus, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Appointment } from './BookAppointment';

export function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = allAppointments.filter((apt: Appointment) => apt.userId === user?.id);
    
    // Sort by date and time
    userAppointments.sort((a: Appointment, b: Appointment) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
    
    setAppointments(userAppointments);
  }, [user]);

  const handleCancelAppointment = (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((apt: Appointment) => {
      if (apt.id === appointmentId) {
        return { ...apt, status: 'cancelled' };
      }
      return apt;
    });
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    const userAppointments = updatedAppointments.filter((apt: Appointment) => apt.userId === user?.id);
    setAppointments(userAppointments);
    
    toast.success('Appointment cancelled successfully');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (status?: string) => {
    if (!status) return null;
    const isPaid = status === 'paid';
    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
        isPaid ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
      }`}>
        <CreditCard className="w-3 h-3" />
        {isPaid ? 'Paid' : 'Payment Pending'}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status !== 'cancelled' && apt.status !== 'completed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-xl text-gray-600">Manage your appointments and health records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Upcoming</h3>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900">{upcomingAppointments.length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Total Visits</h3>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl text-gray-900">{appointments.filter(a => a.status === 'completed').length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Active Doctors</h3>
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl text-gray-900">{new Set(appointments.map(a => a.doctorId)).size}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/book-appointment"
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-600">Schedule a new visit</p>
              </div>
            </Link>
            
            <Link
              to="/doctors"
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <User className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-gray-900">Find a Doctor</h3>
                <p className="text-sm text-gray-600">Browse specialists</p>
              </div>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-gray-900">Contact Us</h3>
                <p className="text-sm text-gray-600">Get in touch</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">Upcoming Appointments</h2>
            <Link
              to="/book-appointment"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Book New
            </Link>
          </div>
          
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No upcoming appointments</p>
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Schedule your first appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {getStatusIcon(appointment.status)}
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{appointment.doctorName}</h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(appointment.status)}
                      {getPaymentBadge(appointment.paymentStatus)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Reason for visit:</p>
                    <p className="text-gray-900">{appointment.reason}</p>
                  </div>
                  
                  {appointment.status !== 'cancelled' && (
                    <div className="flex gap-3">
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex-1 border border-red-300 text-red-700 py-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-gray-900 mb-6">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-6 opacity-75"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {getStatusIcon(appointment.status)}
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{appointment.doctorName}</h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(appointment.status)}
                      {getPaymentBadge(appointment.paymentStatus)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
