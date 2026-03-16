import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { PaymentMethod } from './types';

export function AdminPaymentMethods() {
  const { paymentMethods, savePaymentMethod, deletePaymentMethod, togglePaymentMethodStatus } = useOutletContext<AdminContextType>();
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);

  const handleSave = (method: PaymentMethod) => {
    savePaymentMethod(method);
    setShowModal(false);
    setEditingMethod(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-900">Manage Payment Methods</h2>
        <button
          onClick={() => {
            setEditingMethod(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-gray-700">Provider</th>
              <th className="text-left py-3 px-4 text-gray-700">Type</th>
              <th className="text-left py-3 px-4 text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map(method => (
              <tr key={method.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {method.name}
                    {method.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">Default</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">{method.provider}</td>
                <td className="py-3 px-4 capitalize">{method.type.replace('_', ' ')}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => togglePaymentMethodStatus(method.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors ${
                      method.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {method.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {method.status}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingMethod(method);
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paymentMethods.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No payment methods configured. Click "Add Payment Method" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PaymentMethodModal
          method={editingMethod}
          onClose={() => {
            setShowModal(false);
            setEditingMethod(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function PaymentMethodModal({
  method,
  onClose,
  onSave,
}: {
  method: PaymentMethod | null;
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
}) {
  const [formData, setFormData] = useState<PaymentMethod>(
    method || {
      id: '',
      name: '',
      provider: '',
      type: 'credit_card',
      status: 'active',
      isDefault: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl text-gray-900 mb-6">
          {method ? 'Edit Payment Method' : 'Add Payment Method'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Method Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g., Credit/Debit Card"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Provider</label>
            <input
              type="text"
              required
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g., Stripe"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as PaymentMethod['type'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="credit_card">Credit/Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="digital_wallet">Digital Wallet</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as PaymentMethod['status'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Set as default payment method
            </label>
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
              {method ? 'Update' : 'Add'} Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
