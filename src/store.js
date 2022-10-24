import { configureStore } from '@reduxjs/toolkit'
import globalStateReducer from './features/globalState/globalStateSlice'
import mainAreaReducer from './features/mainAreaState/mainAreaSlice.js'

export default configureStore({
  reducer: {
    globalState: globalStateReducer,
    mainArea: mainAreaReducer
  },
})