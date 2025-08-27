import { createContext, useContext, useState, useCallback } from "react";
import Modal from "../components/common/Modal";

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: '',
        onConfirm: null,
        onCancel: null,
        options: {}
    });

    const showModal = useCallback(async (message, options = {}) => {
        const {
            enableOutsideClick = true,
            enableKeyboardShortcuts = true,
            showCancelButton = true,
            ...otherOptions
        } = options;

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
                        options: {}
                    });
                    resolve(true);
                },
                onCancel: () => {
                    setModalState({
                        isOpen: false,
                        message: '',
                        onConfirm: null,
                        onCancel: null,
                        options: {}
                    });
                    resolve(false);
                },
                options: {
                    enableOutsideClick,
                    enableKeyboardShortcuts,
                    showCancelButton,
                    ...otherOptions
                }
            });
        });
    }, []);

    return (
        <ModalContext.Provider value={{ 
            confirm: showModal,
            alert: (message) => showModal(message, { showCancelButton: false })
        }}>
            {children}
            <Modal {...modalState} {...modalState.options} />
        </ModalContext.Provider>
    );
};