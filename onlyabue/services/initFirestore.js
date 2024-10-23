import { firestore } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const initializeCollections = async () => {
    console.log('Initializing collections...');
  try {
    await setDoc(doc(collection(firestore, 'usuarios'), 'placeholder'), {
      nombre: "",
      email: "",
      fechaNacimiento: "",
      genero: "",
      creadoEn: new Date(),
    });
    
    await setDoc(doc(collection(firestore, 'medicamentos'), 'placeholder'), {
      nombre: "",
      dosis: "",
      dias: [],  
      horas: [],
      imagen: "",
      color: "",
    });

    await setDoc(doc(collection(firestore, 'recordatorios'), 'placeholder'), {
      tipo: ["medicamento", "cita medica"],
      fecha: "",
      hora: "",
      repeticion: "",
      usuarioId: "",
      medicamentoId: "",
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'historial_medicamentos'), 'placeholder'), {
      usuarioId: "",
      medicamentoId: "",
      fecha: "",
      dosisTomada: "",
      observaciones: "",
    });

    await setDoc(doc(collection(firestore, 'citas_medicas'), 'placeholder'), {
      usuarioId: "",
      fecha: "",
      hora: "",
      doctor: "",
      especialidad: "",
      lugar: "",
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'reco_medicamentos'), 'placeholder'), {
      medicamentoId: "",
      usuarioId: "",
      nombre: "",
      descripcion: "",
      dosis: "",
      forma: "",
      cantidadTabletas: '',
      tipoVenta: "",
      etiquetas: [], // Este array se llenará con IDs de etiquetas
      creadoEn: new Date(),
    });

    await setDoc(doc(collection(firestore, 'etiquetas'), 'placeholder'), {
      nombre: "analgésico",
      descripcion: "Medicamento para aliviar el dolor",
      creadoEn: new Date(),
    });

    console.log('Colecciones inicializadas exitosamente');
  } catch (error) {
    console.error('Error al inicializar las colecciones: ', error);
  }
};

export default initializeCollections;
