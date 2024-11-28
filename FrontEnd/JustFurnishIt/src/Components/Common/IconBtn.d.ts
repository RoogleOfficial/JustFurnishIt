import React from 'react';
interface IconBtnProps {
    text: string;
    onclick: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    outline?: boolean;
    customClasses?: string;
    type?: 'button' | 'submit' | 'reset';
}
declare const IconBtn: React.FC<IconBtnProps>;
export default IconBtn;
