import { FC } from "react";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onReject: () => void;
  message: "";
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  onReject,
  message,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-20 bg-black opacity-50"
        onClick={onReject}
      ></div>
      <div className="flex fixed top-1/2 left-1/2 z-30 flex-col gap-12 p-6 w-11/12 max-w-md text-center bg-gray-700 rounded-md -translate-x-1/2 -translate-y-1/2">
        <span className="text-xl font-medium">{message}</span>
        <div className="flex flex-col gap-6 justify-center items-center mx-auto md:flex-row w-fit">
          <button
            className="block px-10 py-2 font-bold text-white bg-blue-500 rounded text-md"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="block px-10 py-2 font-bold text-white bg-red-500 rounded text-md"
            onClick={onReject}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
