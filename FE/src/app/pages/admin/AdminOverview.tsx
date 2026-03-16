import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Calendar, Stethoscope, Users, CreditCard } from 'lucide-react';

export function AdminOverview() {
  const { appointments, doctors, users } = useOutletContext<AdminContextType>();

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    totalUsers: users.length,
    totalDoctors: doctors.length,
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{stats.totalAppointments}</p>
          <p className="text-gray-600">Appointments</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-yellow-600" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{stats.pendingAppointments}</p>
          <p className="text-gray-600">Awaiting Confirmation</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Stethoscope className="w-8 h-8 text-green-600" />
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{stats.totalDoctors}</p>
          <p className="text-gray-600">Doctors</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-gray-600">Registered</span>
          </div>
          <p className="text-3xl text-gray-900 mb-1">{stats.totalUsers}</p>
          <p className="text-gray-600">Patients</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl text-gray-900 mb-4">Recent Appointments</h2>
        <div className="space-y-4">
          {appointments.slice(0, 5).map(apt => (
            <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-gray-900">{apt.doctorName}</p>
                <p className="text-sm text-gray-600">{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {apt.status}
                </span>
                {apt.paymentStatus && (
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${
                    apt.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                  }`}>
                    <CreditCard className="w-3 h-3" />
                    {apt.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
