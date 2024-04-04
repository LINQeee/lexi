import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dictionaryReducer from './reducers/DictionarySlice'
import wordPackReducer from './reducers/WordPackSlice'

const rootReducer = combineReducers({
  wordPackReducer,
  dictionaryReducer
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
