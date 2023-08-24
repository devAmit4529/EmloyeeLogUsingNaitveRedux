import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Modal, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {addEmployee} from '../Redux/reducers';

const AddEmployeeModal: React.FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [departmentError, setDepartmentError] = useState('');

  const clearInputFields = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setDepartment('');

    setNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setDepartmentError('');
  };

  const validateInputs = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (department.trim() === '') {
      setDepartmentError('Department Name is required');
      isValid = false;
    } else {
      setDepartmentError('');
    }

    const phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    } else if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError('Not a valid Mobile Number!');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    return isValid;
  };

  const handleAddEmployee = () => {
    if (!validateInputs()) {
      return;
    }
    const newEmployee = {
      id: Date.now(),
      name,
      email,
      phoneNumber,
      department,
    };

    dispatch(addEmployee(newEmployee));
    onClose();
  };
  useEffect(() => {
    if (visible) {
      clearInputFields(); // Call the clearInputFields function when modal is opened
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      //  transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.errorText}>{nameError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Department:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter department"
              value={department}
              onChangeText={setDepartment}
            />
            <Text style={styles.errorText}>{departmentError}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add Employee" onPress={handleAddEmployee} />
            <Button title="Close" onPress={onClose} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Faded white background
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)', // Faded border color
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default AddEmployeeModal;
