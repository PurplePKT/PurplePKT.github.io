import { useRef } from "react";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function ViewDetailsModal({ isOpen, onClose, children }: ViewDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
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