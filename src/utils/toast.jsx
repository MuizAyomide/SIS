import { toast } from 'react-toastify';

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showConfirmation = (message, onConfirm, onCancel) => {
  toast.info(
    <div>
      <p>{message}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => {
            onCancel && onCancel();
            toast.dismiss();
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: true,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    }
  );
};

