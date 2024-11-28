import React from 'react';
interface ModalData {
    text1: string;
    text2?: string;
    btn1Handler: () => void | void;
    btn1Text: string;
    btn2Handler: () => void | void;
    btn2Text: string;
}
interface ConfirmationModalProps {
    modalData: ModalData;
}
declare const ConfirmationModal: React.FC<ConfirmationModalProps>;
export default ConfirmationModal;
