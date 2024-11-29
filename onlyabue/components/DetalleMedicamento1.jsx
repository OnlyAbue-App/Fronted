import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetalleMedicamento1 = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Cambia esta URL por la imagen del medicamento
        style={styles.image}
      />
      <Text style={styles.title}>Paracetamol</Text>
      <Text style={styles.subtitle}>acetaminofén</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forma farmacéutica:</Text>
        <View style={styles.chipsContainer}>
          <Text style={styles.chip}>Tabletas</Text>
          <Text style={styles.chip}>Jarabe</Text>
          <Text style={styles.chip}>Supositorios</Text>
          <Text style={styles.chip}>Inyección</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indicaciones Terapéuticas:</Text>
        <Text style={styles.text}>
          • Alivio de dolores leves a moderados, como dolores de cabeza, musculares, dentales y articulares.{"\n"}
          • Tratamiento de la fiebre asociada a infecciones virales o bacterianas (como resfriados y gripe).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Efectos Secundarios Comunes:</Text>
        <View style={styles.chipsContainer}>
          <Text style={styles.chip}>Nauseas</Text>
          <Text style={styles.chip}>Mareos</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interacciones:</Text>
        <Text style={styles.text}>
          • El alcohol puede aumentar el riesgo de daño hepático.{"\n"}
          • Medicamentos anticoagulantes pueden tener su efecto modificado.{"\n"}
          • Algunos medicamentos como rifampicina pueden disminuir la efectividad del Paracetamol.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Precauciones:</Text>
        <Text style={styles.text}>
          • Evitar exceder la dosis recomendada.{"\n"}
          • Usar con precaución en personas con problemas hepáticos.{"\n"}
          • Consultar al médico antes de usarlo durante el embarazo o la lactancia.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  text: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#007BFF',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default DetalleMedicamento1;
