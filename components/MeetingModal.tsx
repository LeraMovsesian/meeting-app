import React from 'react';

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText: string;
    image?: string;
    buttonIcon?: string;

}
const MeetingModal = ({isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon}: MeetingModalProps) => {
    return (
        <div>
            <h1>Meeting Modal</h1>
        </div>
    );
};

export default MeetingModal;
