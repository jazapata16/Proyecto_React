import React, { useState, useContext } from 'react';
import { AppStateContext, AppDispatchContext } from './AppContext';
import './Step1.css'; 

function Step1() {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoDrop = (event) => {
    event.preventDefault();
    const droppedPhotos = [...event.dataTransfer.files];
    setSelectedPhotos([...selectedPhotos, ...droppedPhotos]);
  };

  const handlePhotoDragOver = (event) => {
    event.preventDefault();
  };

  const handlePhotoDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handlePhotoDragEnd = () => {
    // Clean up any dragged photo styling, if necessary
  };

  const handlePhotoDropOnGrid = (event) => {
    event.preventDefault();
    const droppedIndex = event.dataTransfer.getData('text/plain');
    const updatedPhotos = [...selectedPhotos];
    const targetIndex = parseInt(event.target.dataset.index);
    const [draggedPhoto] = updatedPhotos.splice(droppedIndex, 1);
    updatedPhotos.splice(targetIndex, 0, draggedPhoto);
    setSelectedPhotos(updatedPhotos);
  };

  const handleContinue = () => {
    dispatch({ type: 'ADD_PHOTOS', payload: selectedPhotos });
    const nextStep = state.currentStep + 1;
    dispatch({ type: 'SET_CURRENT_STEP', payload: nextStep });
    // Proceed to the next step
    // ...
  };

  return (
    <div>
      <h2>Organización de imágenes</h2>
      <div
        onDragOver={handlePhotoDragOver}
        onDrop={handlePhotoDrop}
        style={{ border: '1px solid black', minHeight: '200px' }}
      >
        {selectedPhotos.map((photo, index) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={photo.name}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            draggable
            onDragStart={(event) => handlePhotoDragStart(event, index)}
            onDragEnd={handlePhotoDragEnd}
          />
        ))}
      </div>
      <div
        onDragOver={handlePhotoDragOver}
        onDrop={handlePhotoDropOnGrid}
        style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}
      >
        {selectedPhotos.map((photo, index) => (
          <div
            key={index}
            data-index={index}
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid gray',
              margin: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onDragOver={handlePhotoDragOver}
            onDrop={handlePhotoDropOnGrid}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {selectedPhotos.length > 0 && (
        <button onClick={handleContinue}>Continuar</button>
      )}
    </div>
  );
}

export default Step1;

