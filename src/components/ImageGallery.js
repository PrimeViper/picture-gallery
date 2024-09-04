import React, { useState, useEffect, useCallback, useRef} from 'react';
import Modal from './Modal/Modal';

const accessKey = '9GvsSTcW2mP70g9hJaHg8seiL3_ZMePV0ztjtApbtjc';

const ImageGallery = ({ keyword }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMoreVisible, setShowMoreVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const galleryRef = useRef(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data.results]);
            setShowMoreVisible(data.results.length > 0);
            if (data.results.length === 0 && page === 1) {
                setError('Warning...You should put some value.');
                setShowMoreVisible(false);
            }
        } catch (err) {
            setError('There was a problem fetching the images.');
        } finally {
            setLoading(false);
        }
    }, [keyword, page]);
     // eslint-disable-next-line
    useEffect(() => {
        if (keyword) {
            setImages([]);
            setPage(1);
            fetchImages();
        }
    }, [keyword,fetchImages]);

    useEffect(() => {
        if (page > 1) {
            fetchImages();
        }
    }, [page,fetchImages]);

    const handleShowMore = () => {
        const scrollPosition = window.scrollY;
        setPage((prevPage) => prevPage + 1);
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 0);
    };

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div ref={galleryRef}>
            {error && <p>{error}</p>}
            <div className="gallery">
                {images.map((image) => (
                    <a href={image.id} onClick={() => openModal(image)}>
                        <img src={image.urls.small} alt={image.alt_description} />
                    </a>
                ))}
            </div>
            {showMoreVisible && !loading && <button onClick={handleShowMore}>Show More...</button>}
            {loading && <p>Loading...</p>}
            <Modal image={selectedImage} onClose={closeModal} />
        </div>
    );
};

export default ImageGallery;
