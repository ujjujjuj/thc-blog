import { FC } from "react";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onReject: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  onReject,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-20 bg-black opacity-50"
        onClick={onReject}
      ></div>
      <div className="fixed w-11/12 max-w-md bg-white rounded-md z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 text-center flex flex-col gap-12">
        <span className="font-medium text-lg ">
          Are you sure you want to continue?
        </span>
        <div className="flex justify-center gap-6 flex-col md:flex-row w-fit items-center mx-auto">
          <button
            className="block px-10 py-2 bg-blue-500 text-white rounded font-bold text-md"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="block px-10 py-2 bg-red-500 text-white rounded font-bold text-md"
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
