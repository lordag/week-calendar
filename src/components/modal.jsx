import { useRef, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef( ({children, error}, ref) => {
    const dialog = useRef();
    
    useImperativeHandle(ref, () => ({
        open: () => {
            dialog.current.showModal();
        },
        close: () => {
            dialog.current.close();
        }
    }))

    return (
        <dialog ref={dialog} className="modal">
            <div className="top">
                <p>{error}</p>
                <button title="Close modal" className="close" onClick={() => dialog.current.close()}>X</button>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="bottom"></div>            
        </dialog>
    )
})

export default Modal;