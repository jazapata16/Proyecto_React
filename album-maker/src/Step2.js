import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext, AppDispatchContext } from './AppContext';
import './Step2.css'; 

function Step2() {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  const [billingData, setBillingData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleBillingInputChange = (event) => {
    const { name, value } = event.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleShippingInputChange = (event) => {
    const { name, value } = event.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleUseSameAddressChange = () => {
    setUseSameAddress(!useSameAddress);
  };

  const handleNextStep = () => {
    dispatch({ type: 'SET_BILLING_INFO', payload: billingData });
    dispatch({ type: 'SET_SHIPPING_INFO', payload: useSameAddress ? billingData : shippingData });    
    const nextStep = state.currentStep + 1;
    dispatch({ type: 'SET_CURRENT_STEP', payload: nextStep });
  };

  const handleGoBack = () => {
    const nextStep = state.currentStep - 1;
    dispatch({ type: 'SET_CURRENT_STEP', payload: nextStep });
  };

  // Verificar si los campos obligatorios están llenos
  useEffect(() => {
    const isBillingComplete = Object.values(billingData).every((value) => value !== '');
    const isShippingComplete = Object.values(shippingData).every((value) => value !== '');
    setIsFormComplete(isBillingComplete && (useSameAddress || isShippingComplete));
  }, [billingData, shippingData, useSameAddress]);

  return (
    <div>
      <h2>Datos de facturación y envío</h2>
      <h3>Datos de facturación</h3>
      <form>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={billingData.name}
            onChange={handleBillingInputChange}
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={billingData.address}
            onChange={handleBillingInputChange}
          />
        </label>
        <label>
          Ciudad:
          <input
            type="text"
            name="city"
            value={billingData.city}
            onChange={handleBillingInputChange}
          />
        </label>
        <label>
          País:
          <input
            type="text"
            name="country"
            value={billingData.country}
            onChange={handleBillingInputChange}
          />
        </label>
      </form>
      <h3>Datos de envío</h3>
      <form>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={shippingData.name}
            onChange={handleShippingInputChange}
            disabled={useSameAddress}
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={shippingData.address}
            onChange={handleShippingInputChange}
            disabled={useSameAddress}
          />
        </label>
        <label>
          Ciudad:
          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={handleShippingInputChange}
            disabled={useSameAddress}
          />
        </label>
        <label>
          País:
          <input
            type="text"
            name="country"
            value={shippingData.country}
            onChange={handleShippingInputChange}
            disabled={useSameAddress}
          />
        </label>
      </form>
      <label>
        Utilizar los mismos datos para dirección de envío
        <input
          type="checkbox"
          checked={useSameAddress}
          onChange={handleUseSameAddressChange}
        />
      </label>
      <button className='button-back' onClick={handleGoBack}>Regresar</button>
      <button className='button' onClick={handleNextStep} disabled={!isFormComplete}>Resumen del pedido</button>
    </div>
  );
}

export default Step2;
