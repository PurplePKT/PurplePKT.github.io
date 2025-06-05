import { ReactNode } from "react";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function ViewDetailsModal({ isOpen, onClose, children }: ViewDetailsModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
        <p className="text-gray-700">
          This feature is under development. Check back later for more details!
        </p>
      </div>
    </div>
  );
}