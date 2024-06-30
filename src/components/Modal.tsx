import { useEffect, useState } from "react";

// import { createPortal } from "react-dom";

const Modal = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <div {...props}>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
        OPEN THE FAKING MODAL
      </button>
      {/* {isOpen && createPortal(props.children, document.body)} */}
      {isOpen && props.children}
    </div>
  );
};

export default Modal;
