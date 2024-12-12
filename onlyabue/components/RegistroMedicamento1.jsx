import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Text } from 'native-base';
import { View, Image, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { firestore } from './firebaseConfig'; 
import { editarMedicamento, eliminarMedicamento } from './firestoreService';

const RegistroMedicamento = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombreComercial: '',
    nombreGenerico: '',
    laboratorio: '',
    intervalo: '',
    dosis: '',
    imagenUrl: '',
  });

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const snapshot = await firestore.collection('medicamentos').get();
        const medicamentosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedicamentos(medicamentosData);
      } catch (error) {
        console.error('Error obteniendo medicamentos:', error);
      }
    };

    fetchMedicamentos();
  }, []);

  const crearMedicamento = async () => {
    try {
      if (nuevoMedicamento.nombreComercial) {
        await firestore.collection('medicamentos').add({
          ...nuevoMedicamento,
          creadoEn: new Date(),
        });
        alert('Medicamento creado exitosamente');
      } else {
        alert('Por favor, llena todos los campos');
      }
    } catch (error) {
      console.error('Error creando medicamento:', error);
    }
  };

  const handleEditarMedicamento = async (id, camposEditados) => {
    try {
      await editarMedicamento(id, camposEditados);
      alert('Medicamento editado exitosamente');
      setMedicamentos((prevMedicamentos) =>
        prevMedicamentos.map((med) => (med.id === id ? { ...med, ...camposEditados } : med))
      );
    } catch (error) {
      console.error('Error editando medicamento:', error);
    }
  };

  const handleEliminarMedicamento = async (id) => {
    try {
      await eliminarMedicamento(id);
      alert('Medicamento eliminado exitosamente');
      setMedicamentos((prevMedicamentos) => prevMedicamentos.filter((med) => med.id !== id));
    } catch (error) {
      console.error('Error eliminando medicamento:', error);
    }
  };

  const verificarUsuario = async (userId) => {
    try {
      const usuarioSnapshot = await firestore.collection('usuarios').doc(userId).get();
      if (usuarioSnapshot.exists) {
        const medicamentosUsuario = await firestore
          .collection('medicamentos')
          .where('userId', '==', userId)
          .get();
        return medicamentosUsuario.empty ? [] : medicamentosUsuario.docs.map(doc => doc.data());
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error verificando usuario:', error);
      return false;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='default' />
      <View style={styles.header}>
        <Text style={styles.title}>Registro de Medicamentos</Text>
      </View>

      {/* Formulario para crear nuevo medicamento */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre Comercial</Text>
        <TextInput
          style={styles.input}
          value={nuevoMedicamento.nombreComercial}
          onChangeText={(text) => setNuevoMedicamento({ ...nuevoMedicamento, nombreComercial: text })}
        />

        {/* Agregar más campos para nombreGenerico, laboratorio, etc. */}

        <TouchableOpacity style={styles.button} onPress={crearMedicamento}>
          <Text style={styles.buttonText}>Crear Medicamento</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de medicamentos */}
      <View>
        {medicamentos.map((medicamento) => (
          <View key={medicamento.id} style={styles.medicamentoItem}>
            <Text>{medicamento.nombreComercial}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditarMedicamento(medicamento.id, { nombreComercial: 'Nuevo Nombre' })}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleEliminarMedicamento(medicamento.id)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#6200ea',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  medicamentoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ffa500',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 8,
    borderRadius: 4,
  },
});

export default RegistroMedicamento;
