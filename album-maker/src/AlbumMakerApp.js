import React, { useContext } from 'react';
import { AppStateContext, AppDispatchContext } from './AppContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function AlbumMakerApp() {
  const state = useContext(AppStateContext);

  return (
    <div>
      {state.currentStep === 1 && <Step1 />}
      {state.currentStep === 2 && <Step2 />}
      {state.currentStep === 3 && <Step3 />}
    </div>
  );
}

export default AlbumMakerApp;