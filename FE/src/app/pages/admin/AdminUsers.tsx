import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';

export function AdminUsers() {
  const { users, appointments } = useOutletContext<AdminContextType>();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl text-gray-900 mb-6">Registered Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-gray-700">Email</th>
              <th className="text-left py-3 px-4 text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 text-gray-700">Appointments</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone || 'N/A'}</td>
                <td className="py-3 px-4">
                  {appointments.filter(a => a.userId === user.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
