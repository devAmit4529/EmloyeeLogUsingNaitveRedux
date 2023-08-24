import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Redux/reducers';
import { loadEmployeeRecords } from './Redux/reducers'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({
  reducer: rootReducer,
});

// Load initial state from AsyncStorage and dispatch the action to update the store
const loadInitialState = async () => {
  try {
    const storedRecords = await AsyncStorage.getItem('employeeRecords');
    console.log("STORED RECORDSSS",storedRecords)
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords);
      store.dispatch(loadEmployeeRecords(parsedRecords));
    }
  } catch (error) {
    console.error('Error loading initial state from AsyncStorage:', error);
  }
};

loadInitialState(); 

export type RootState = ReturnType<typeof store.getState>;
export default store;
