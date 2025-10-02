import { useEffect } from "react";

export const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                className="animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <polyline
                points="22,4 12,14.01 9,11.01"
                className="animate-draw"
                style={{
                  strokeDasharray: 22,
                  strokeDashoffset: 22,
                  animation: 'draw 0.5s ease-in-out 1s forwards'
                }}
              />
            </svg>
          </div>
          <p className="text-center text-lg font-semibold">{message}</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 0.5s ease-in-out 1s forwards;
        }
      `}</style>
    </div>
  );
};