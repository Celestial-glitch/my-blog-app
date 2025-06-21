// components/Modal.js
const Modal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{message}</p>
        <div className="flex justify-end gap-3 pt-4">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
