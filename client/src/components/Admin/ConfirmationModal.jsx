import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDarkMode,
  type = 'warning' // 'warning' or 'danger'
}) => {
  if (!isOpen) return null;

  const getButtonColor = () => {
    if (type === 'danger') {
      return 'bg-red-600 hover:bg-red-700';
    }
    return 'bg-[#0270A8] hover:bg-[#025a8a]';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl ${
        isDarkMode ? 'bg-[#282E35]' : 'bg-white'
      }`}>
        <div className={`flex justify-between items-center p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <FiAlertTriangle 
              className={type === 'danger' ? 'text-red-500' : 'text-yellow-500'} 
              size={24} 
            />
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'hover:bg-[#2C3138]' : 'hover:bg-gray-100'
            }`}
          >
            <FiX className={isDarkMode ? 'text-white' : 'text-gray-900'} size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className={`text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {message}
          </p>
        </div>

        <div className={`flex justify-end gap-3 p-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105 ${
              getButtonColor()
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
