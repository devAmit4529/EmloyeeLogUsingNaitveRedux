import { TouchableOpacity, StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useState } from 'react';
import AddEmployeeModal from './Components/AddEmpModal';
import EmployeeList from './Components/EmpList';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004B49" barStyle="light-content" />

      {/* Menu bar */}
      <View style={styles.menuBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
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
  menuBar: {
    backgroundColor: '#004B49', // Green color for the menu bar
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
    borderBottomLeftRadius: 20, // Add curved border to the bottom left corner
    borderBottomRightRadius: 20, // Add curved border to the bottom right corner
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2, // Add border width
    borderColor: '#fff', // White color for the border
    alignItems: 'center',
    justifyContent: 'center',
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
