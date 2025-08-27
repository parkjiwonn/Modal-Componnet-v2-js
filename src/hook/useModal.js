import { createContext, useContext, useState } from "react";

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        message : '',
        onConfirm: null,
        onCancel: null,
    });

    const showConfirm = useCallback(async (message) => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                message,
                onConfirm: () => {
                    setModalState({
                        isOpen: false,
                        message: '',
                        onConfirm: null,
                        onCancel: null,
                    })
                    resolve(true);
                },
                onCancel: () => {
                    setModalState({
                        isOpen: false,
                        message: '',
                        onConfirm: null,
                        onCancel: null,
                    })
                    resolve(false);
                },
            })
        })
    }, []);

    return (
        <ModalContext.Provider value={{ confirm: showConfirm }}>
            {children}
            <Modal {...modalState} />
        </ModalContext.Provider>
    )
}