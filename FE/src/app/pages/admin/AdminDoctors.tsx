import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Doctor } from './types';

export function AdminDoctors() {
  const { doctors, saveDoctor, deleteDoctor } = useOutletContext<AdminContextType>();
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleSave = (doctor: Doctor) => {
    saveDoctor(doctor);
    setShowDoctorModal(false);
    setEditingDoctor(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-900">Manage Doctors</h2>
        <button
          onClick={() => {
            setEditingDoctor(null);
            setShowDoctorModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map(doctor => (
          <div key={doctor.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 mb-1">{doctor.specialty}</p>
                <p className="text-sm text-gray-600">{doctor.qualifications}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingDoctor(doctor);
                    setShowDoctorModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteDoctor(doctor.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Education:</strong> {doctor.education}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Rating:</strong> {doctor.rating}/5.0</p>
            </div>
          </div>
        ))}
      </div>

      {showDoctorModal && (
        <DoctorModal
          doctor={editingDoctor}
          onClose={() => {
            setShowDoctorModal(false);
            setEditingDoctor(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function DoctorModal({
  doctor,
  onClose,
  onSave,
}: {
  doctor: Doctor | null;
  onClose: () => void;
  onSave: (doctor: Doctor) => void;
}) {
  const [formData, setFormData] = useState<Doctor>(
    doctor || {
      id: '',
      name: '',
      specialty: '',
      qualifications: '',
      experience: '',
      education: '',
      rating: 5.0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl text-gray-900 mb-6">
          {doctor ? 'Edit Doctor' : 'Add New Doctor'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Specialty</label>
            <input
              type="text"
              required
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Cardiology"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Qualifications</label>
            <input
              type="text"
              required
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="MD, FACC"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Education</label>
            <input
              type="text"
              required
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Harvard Medical School"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="20+ years"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Rating</label>
            <input
              type="number"
              required
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {doctor ? 'Update' : 'Add'} Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
