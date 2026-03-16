import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Search, CheckCircle, XCircle, Trash2, CreditCard } from 'lucide-react';

export function AdminAppointments() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useOutletContext<AdminContextType>();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-900">Manage Appointments</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        {appointments
          .filter(apt =>
            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(appointment => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">{appointment.doctorName}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                  {appointment.paymentStatus && (
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${
                      appointment.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      <CreditCard className="w-3 h-3" />
                      {appointment.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                <strong>Reason:</strong> {appointment.reason}
              </p>
              
              <div className="flex gap-2">
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm
                  </button>
                )}
                {appointment.status === 'confirmed' && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Complete
                  </button>
                )}
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                    className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
