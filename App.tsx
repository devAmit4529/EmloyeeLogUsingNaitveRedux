import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AddEmployeeModal from './Components/AddEmpModal';
import EmployeeList from './Components/EmpList';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <AddEmployeeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <EmployeeList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: '#006400',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 16,
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});
