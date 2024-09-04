import React from 'react';
import './Modal.css';

const Modal = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={image.urls.full} alt={image.alt_description} />
                <div className="modal-info">
                    <p>Author: <a href={image.user.links.html} target="_blank" rel="noopener noreferrer">{image.user.name}</a></p>
                    <p>Original Page: <a href={image.links.html} target="_blank" rel="noopener noreferrer">View on Unsplash</a></p>
                </div>
                <button className="modal-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Modal;
