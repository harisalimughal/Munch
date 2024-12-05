import React, { useState } from 'react';
import styles from './ImageUploader.module.css';

const ImageUploader = ({ onUploaad }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
    onUpload(newImages);
  };

  return (
    <div className={styles.imageUploader}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <div className={styles.previewContainer}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index + 1}`} className={styles.previewImage} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

