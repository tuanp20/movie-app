import { IoMdClose } from "react-icons/io";

import { useGlobalContext } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";
import { zoomIn } from "./../utils/motion";

const Modal = () => {
  const { videoId, closeModal, isModalOpen } = useGlobalContext();
  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 flex items-center w-screen h-screen justify-center z-10 bg-blackOverlay transition-all duration-300"
          onClick={closeModal}
        >
          <motion.div
            variants={zoomIn(0.9, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className=" md:w-[570px] md:h-[370px] sm:w-[80vw] sm:h-[60vh] w-[80vw] h-[30vh] dark:bg-gray-900 bg-mainColor z-10  shadow-lg rounded-md relative"
          >
            <button
              type="button"
              className="absolute -right-8 -top-6 dark:text-gray-300 text-gray-600 text-[28px] z-20"
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://127.0.0.1:5173/`}
              title="trailer"
              width="100%"
              height="100%"
              className="rounded-md"
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;