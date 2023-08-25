import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearEmployeeRecords,
  deleteEmployee,
  loadEmployeeRecords,
} from '../Redux/reducers';
import {RootState} from './../store';
import EmployeeEditModal from './EmpEditModal';
import {Employee} from '../Redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [records, setRecords] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  console.log(employees, 'IN LISTING');
  const dispatch = useDispatch();
  const handleDelete = (employeeId: number) => {
    dispatch(deleteEmployee(employeeId));
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('employeeRecords');
      if (storedRecords) {
        const loadedRecords = JSON.parse(storedRecords);
        setRecords(loadedRecords); // Update records state
        console.log('STORED RECORDSSS IN LISTING', loadedRecords);

        dispatch(loadEmployeeRecords(loadedRecords)); // Update employees state in Redux
      }
    } catch (error) {
      console.error('Error loading records from AsyncStorage:', error);
    }
  };

  const saveRecords = async () => {
    try {
      await AsyncStorage.setItem('employeeRecords', JSON.stringify(employees));
      console.log('Records saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving records to AsyncStorage:', error);
    }
  };

  const clearRecords = async () => {
    try {
      await AsyncStorage.removeItem('employeeRecords');
      setRecords([]);
      dispatch(clearEmployeeRecords()); // Dispatch the action to clear records from Redux store
      console.log('Records cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing records from AsyncStorage:', error);
    }
  };
  const renderEmployee = ({item}: {item: Employee}) => {
    if (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return (
        <TouchableOpacity style={styles.card}>
          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.label}>Mobile No.</Text>
              <Text style={styles.label}>Department</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.name}</Text>
              <Text style={styles.value}>{item.email}</Text>
              <Text style={styles.value}>{item.phoneNumber}</Text>
              <Text style={styles.value}>{item.department}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => handleEdit(item)}>
              <Text style={styles.buttonText}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
    return null; // Return null if the employee doesn't match the search query
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or email"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearRecords}>
          <Text style={styles.buttonText}>CLEAR RECORD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveRecords}>
          <Text style={styles.buttonText}>SAVE RECORD</Text>
        </TouchableOpacity>
      </View>
      <EmployeeEditModal
        visible={modalVisible}
        employee={selectedEmployee}
        onClose={() => {
          setModalVisible(false);
          setSelectedEmployee(null);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#E6EDED',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center', // Center horizontally
    width: '95%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  valueContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
    // marginBottom: 64, // Add this line to create extra space at the bottom
  },
  saveButton: {
    backgroundColor: '#004B49',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  clearButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonEdit: {
    backgroundColor: '#004B49',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  buttonDelete: {
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignSelf: 'center',
    width: '95%',
  },
});

export default EmployeeList;
