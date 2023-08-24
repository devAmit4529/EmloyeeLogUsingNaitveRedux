import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
}

interface AppState {
  employees: Employee[];
}

const initialState: AppState = {
  employees: [],
};

// export const loadEmployeeRecords = (records: Employee[]) => (
//   console.log('ININNNNNNNNNNNNNNNNNN', records),
//   {
//     type: 'LOAD_EMPLOYEE_RECORDS',
//     payload: records,
//   }
// );

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
      console.log('ACTIONNNNNNNN', action.payload);
    },
    editEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        employee => employee.id === action.payload.id,
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        employee => employee.id !== action.payload,
      );
    },
    clearEmployeeRecords: state => {
      state.employees = [];
    },
    loadEmployeeRecords: (state, action: PayloadAction<any>) => {
      state.employees = action.payload;
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  clearEmployeeRecords,
  loadEmployeeRecords,
} = employeesSlice.actions;
export default employeesSlice.reducer;
