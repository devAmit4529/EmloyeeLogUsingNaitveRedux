import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {editEmployee} from './../Redux/reducers';
import {Employee} from './../Redux/reducers';

interface EmployeeEditModalProps {
  visible: boolean;
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeEditModal: React.FC<EmployeeEditModalProps> = ({
  visible,
  employee,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
  });

  useEffect(() => {
    setEditedEmployee(employee);
    setValidationErrors({
      name: '',
      email: '',
      phoneNumber: '',
      department: '',
    });
  }, [employee]);

  const handleSave = () => {
    const errors: any = {};
    let isValid = true;

    if (!editedEmployee?.name) {
      errors.name = 'Name is required';
      isValid = false;
    } else {
      errors.name = '';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!editedEmployee?.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(editedEmployee.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    } else {
      errors.email = '';
    }

    const phoneNumberPattern =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!editedEmployee?.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
      isValid = false;
    } else if (!phoneNumberPattern.test(editedEmployee.phoneNumber)) {
      errors.phoneNumber = 'Not a valid Mobile Number!';
      isValid = false;
    } else {
      errors.phoneNumber = '';
    }

    if (!editedEmployee?.department) {
      errors.department = 'Department is required';
      isValid = false;
    } else {
      errors.department = '';
    }

    setValidationErrors(errors);

    if (isValid && editedEmployee) {
      dispatch(editEmployee(editedEmployee));
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {editedEmployee && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editedEmployee.name}
                onChangeText={text =>
                  setEditedEmployee({...editedEmployee, name: text})
                }
              />
              {validationErrors.name && (
                <Text style={styles.errorText}>{validationErrors.name}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editedEmployee.email}
                onChangeText={text =>
                  setEditedEmployee({...editedEmployee, email: text})
                }
              />
              {validationErrors.email && (
                <Text style={styles.errorText}>{validationErrors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={editedEmployee.phoneNumber}
                onChangeText={text =>
                  setEditedEmployee({...editedEmployee, phoneNumber: text})
                }
              />
              {validationErrors.phoneNumber && (
                <Text style={styles.errorText}>
                  {validationErrors.phoneNumber}
                </Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Department"
                value={editedEmployee.department}
                onChangeText={text =>
                  setEditedEmployee({...editedEmployee, department: text})
                }
              />
              {validationErrors.department && (
                <Text style={styles.errorText}>
                  {validationErrors.department}
                </Text>
              )}
            </View>
          )}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default EmployeeEditModal;
