import React, { useContext } from 'react';
import { AppStateContext, AppDispatchContext } from './AppContext';
import './Step3.css'; 

function Step3() {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);

  const handleFinishOrder = () => {
    //"Gracias por tu compra"
    console.log("Gracias por tu compra");

  };

  const handleGoBack = () => {
    const nextStep = state.currentStep - 1;
    dispatch({ type: 'SET_CURRENT_STEP', payload: nextStep });
  };

  return (
    <div className='step3-container'>
      <h2 className='order-summary'>Resumen del pedido</h2>
      <h3 className='order-summary'>Álbum</h3>
      <div className='album-preview'>
        {state.photos.map((photo, index) => (
          <img
            className='album-preview-item'
            key={index}
            src={URL.createObjectURL(photo)}
            alt={photo.name}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ))}
      </div>

      <h3 className='order-summary-heading'>Datos de facturación</h3>
      <p className='order-summary-info '>Nombre: {state.billingInfo.name}</p>
      <p className='order-summary-info '>Dirección: {state.billingInfo.address}</p>
      <p className='order-summary-info '>Ciudad: {state.billingInfo.city}</p>
      <p className='order-summary-info '>País: {state.billingInfo.country}</p>

      <h3 className='order-summary-heading'>Datos de envío</h3>
      <p className='order-summary-info '>Nombre: {state.shippingInfo.name}</p>
      <p className='order-summary-info '>Dirección: {state.shippingInfo.address}</p>
      <p className='order-summary-info '>Ciudad: {state.shippingInfo.city}</p>
      <p className='order-summary-info '>País: {state.shippingInfo.country}</p>

      <button className="button-back" onClick={handleGoBack}> Regresar </button>
      <button className="finish-button" onClick={handleFinishOrder}>Finalizar pedido</button>
    </div>
  );
}

export default Step3;
