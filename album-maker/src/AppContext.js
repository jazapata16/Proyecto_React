import React, { createContext, useReducer } from 'react';

const initialState = {
  currentStep: 1,
  photos: [],
  billingInfo: {},
  shippingInfo: {},
  sameAddress: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'ADD_PHOTOS':
      return { ...state, photos: action.payload };
    case 'SET_BILLING_INFO':
      return { ...state, billingInfo: action.payload };
    case 'SET_SHIPPING_INFO':
      return { ...state, shippingInfo: action.payload };
    case 'SET_SAME_ADDRESS':
      return { ...state, sameAddress: action.payload };
    default:
      return state;
  }
}

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
