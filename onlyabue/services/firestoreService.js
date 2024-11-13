import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

// Para medicamentos
export const agregarMedicamento = async (medicamentoData) => {
  try {
    await addDoc(collection(firestore, 'medicamentos'), medicamentoData);
    console.log('Medicamento agregado correctamente');
  } catch (error) {
    console.error('Error al agregar medicamento:', error);
  }
};

export const obtenerMedicamentos = async () => {
  try {
    const medicamentosSnapshot = await getDocs(collection(firestore, 'medicamentos'));
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
  }
};

export const obtenerMedicamentosPorUsuario = async (usuarioId) => {
  try {
    const q = query(collection(firestore, 'medicamentos'), where('usuarioId', '==', usuarioId));
    const medicamentosSnapshot = await getDocs(q);
    const listaMedicamentos = medicamentosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return listaMedicamentos;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
  }
};

export const actualizarMedicamento = async (medicamentoId, nuevosDatos) => {
  try {
    await updateDoc(doc(firestore, 'medicamentos', medicamentoId), nuevosDatos);
    console.log('Medicamento actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
  }
};

export const eliminarMedicamento = async (medicamentoId) => {
  try {
    await deleteDoc(doc(firestore, 'medicamentos', medicamentoId));
    console.log('Medicamento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar medicamento:', error);
  }
};

// Para historial_medicamento
export const agregarHistorialMedicamento = async (userId, medicamentoId, fecha, hora, cantidad) => {
    const historialRef = doc(collection(firestore, 'historial_medicamentos'), userId);
  
    try {
      const historialSnapshot = await historialRef.get();
  
      if (historialSnapshot.exists()) {
        await updateDoc(historialRef, {
          medicamentos: arrayUnion({
            medicamentoId,
            fecha,
            hora,
            cantidad
          })
        });
      } else {
        await setDoc(historialRef, {
          medicamentos: [{
            medicamentoId,
            fecha,
            hora,
            cantidad
          }]
        });
      }
      console.log("Historial de medicamentos actualizado correctamente");
    } catch (error) {
      console.error("Error al agregar el medicamento al historial: ", error);
    }
  };

export const obtenerHistorialMedicamentosPorUsuario = async (usuarioId) => {
  try {
    const q = query(collection(firestore, 'historial_medicamentos'), where('usuarioId', '==', usuarioId));
    const querySnapshot = await getDocs(q);
    const historial = [];
    querySnapshot.forEach((doc) => {
      historial.push({ id: doc.id, ...doc.data() });
    });
    return historial;
  } catch (error) {
    console.error('Error al obtener el historial de medicamentos:', error);
  }
};

//Recomendaciones
export const agregarRecomendacion = async (recomendacionData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'recomendaciones'), recomendacionData);
      console.log('Recomendación agregada con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar recomendación:', error);
    }
};
  
//Recordatorios
export const agregarRecordatorio = async (recordatorioData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'recordatorios'), recordatorioData);
      console.log('Recordatorio agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar recordatorio:', error);
    }
};
  
export const eliminarRecordatorio = async (recordatorioId) => {
    try {
      await deleteDoc(doc(firestore, 'recordatorios', recordatorioId));
      console.log('Recordatorio eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar recordatorio:', error);
    }
};

/*export async function crearUsuario(user) {
  try {
    await setDoc(doc(collection(firestore, 'usuarios')), user);
    console.log('Usuario creado con éxito');
  } catch (error) {
    console.error('Error creando el usuario: ', error);
  }
}*/


//Recomendaciones de la tabla rec_medicamentos
export const agregarRecomendacionMedicamentos = async (recomendacionesData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'reco_medicamentos'), recomendacionesData);
    console.log('Recomendación agregada con ID:', docRef.id);
  } catch (error) {
    console.error('Error al agregar recomendación:', error);
  }
};

//usuarios
export async function crearUsuario(email, fechaNacimiento, genero, nombre) {
  try {
    const nuevoUsuario = {
      email,
      fechaNacimiento,
      genero,
      nombre,
    };

    await setDoc(doc(collection(firestore, 'usuarios')), nuevoUsuario);
    console.log('Usuario creado con éxito');
  } catch (error) {
    console.error('Error creando el usuario: ', error);
  }
}

async function obtenerUsuario(id) {
  try {
    const docRef = doc(firestore, 'usuarios', id);
    const usuario = await getDoc(docRef);

    if (usuario.exists()) {
      console.log('Datos del usuario:', usuario.data());
    } else {
      console.log('No se encontró el usuario');
    }
  } catch (error) {
    console.error('Error obteniendo el usuario: ', error);
  }
}

// import { doc, updateDoc } from 'firebase/firestore';
// import { firestore } from './firebase';

async function actualizarUsuario(id, nuevosDatos) {
  try {
    const docRef = doc(firestore, 'usuarios', id);

    await updateDoc(docRef, nuevosDatos);
    console.log('Usuario actualizado con éxito');
  } catch (error) {
    console.error('Error actualizando el usuario: ', error);
  }
}

async function eliminarUsuario(id) {
  try {
    const docRef = doc(firestore, 'usuarios', id);
    await deleteDoc(docRef);
    console.log('Usuario eliminado con éxito');
  } catch (error) {
    console.error('Error eliminando el usuario: ', error);
  }
}


//recomendaciones medicamento
export const crearMedicamento = async (medicamento) => {
  await setDoc(doc(collection(db, 'reco_medicamentos')), {
    medicamentoId: medicamento.medicamentoId,
    usuarioId: medicamento.usuarioId,
    nombre: medicamento.nombre,
    descripcion: medicamento.descripcion,
    dosis: medicamento.dosis,
    forma: medicamento.forma,
    cantidadTabletas: medicamento.cantidadTabletas,
    tipoVenta: medicamento.tipoVenta,
    etiquetas: medicamento.etiquetas,  // Array de IDs de etiquetas
    creadoEn: new Date(),
  });
};

//leer la reco 
export const leerMedicamento = async (id) => {
  const docRef = doc(db, "reco_medicamentos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No existe ese medicamento.");
  }
};

//crear etiquetas
export const crearEtiqueta = async (etiqueta) => {
  await setDoc(doc(collection(db, 'etiquetas')), {
    nombre: etiqueta.nombre,
    descripcion: etiqueta.descripcion,
    creadoEn: new Date(),
  });
};

//leer etiquetas
export const leerEtiqueta = async (id) => {
  const docRef = doc(db, "etiquetas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No existe esa etiqueta.");
  }
};

//actualizar etiqueta
export const actualizarEtiqueta = async (id, data) => {
  const docRef = doc(db, "etiquetas", id);
  await updateDoc(docRef, data);
};

//eliminar etiqueta
export const eliminarEtiqueta = async (id) => {
  await deleteDoc(doc(db, "etiquetas", id));
};

//para el token 
// export const verificarToken = async (token) => {
//   try {
//     const usuariosRef = collection(firestore, 'Usuarios');
//     const q = query(usuariosRef, where('UserID', '==', token));
//     const querySnapshot = await getDocs(q);

//     return !querySnapshot.empty;
//   } catch (error) {
//     console.error("Error al verificar el token:", error);
//     return false;
//   }
// };

// para el token again
export const verificarToken = async (token) => {
  try {
    const usuariosRef = collection(firestore, 'Usuarios');
    const usuariosSnapshot = await getDocs(usuariosRef);

    let tokenEncontrado = false;

    usuariosSnapshot.forEach((doc) => {
      const data = doc.data();
      const tokenArray = data.Token || [];

      tokenArray.forEach((tokenObj) => {
        if (tokenObj.token === token) {
          tokenEncontrado = true;
        }
      });
    });

//usando el pseudo id
const firestore = getFirestore();

async function verificarTokenYObtenerID(token) {
  const usuariosRef = collection(firestore, 'usuarios');
  const q = query(usuariosRef, where("Token", "==", token));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const usuario = querySnapshot.docs[0];
    const userID = usuario.id; 
    console.log("Token encontrado. ID del usuario:", userID);
    return { existe: true, userID };
  } else {
    console.log("Token no encontrado.");
    return { existe: false };
  }
}

verificarTokenYObtenerID("")
  .then(result => {
    if (result.existe) {
      // Redirige al usuario al Home
    } else {
      // Redirige al formulario de registro
    }
  })
  .catch(error => {
    console.error("Error al verificar el token:", error);
  });

    return tokenEncontrado;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return false;
  }
};

//agregande funciones para en el token con mas datos
async function seleccionarImagen() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    registrarUsuario({
      token: 'token_example',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'López',
      edad: 65,
      sexo: 'Masculino',
      enfermedadesBase: ['Diabetes', 'Hipertensión'],
      instrumentacionMedica: ['Marcapasos'],
      tipoSangre: 'O+',
      imagenURI: result.uri, 
    });
  }
}

export const registrarUsuario = async ({
  token,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  edad,
  sexo,
  enfermedadesBase = [],
  instrumentacionMedica = [],
  tipoSangre,
  imagenURI,
}) => {
  try {
    await addDoc(collection(firestore, 'Usuarios'), {
      token,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      sexo,
      enfermedadesBase, 
      instrumentacionMedica, 
      tipoSangre,
      imagenURI, 
    });

    console.log("Usuario registrado con éxito");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};


//funciones para citas medicas crear, buscar, eliminar actualizar
export const crearCitaMedica = async (cita) => {
  try {
    const docRef = await addDoc(collection(firestore, "citas_medicas"), cita);
    console.log("Cita creada exitosamente. ID:", docRef.id);
  } catch (error) {
    console.error("Error al crear la cita:", error);
  }
};

export const leerCitaMedica = async (id) => {
  const docRef = doc(firestore, "citas_medicas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No se encontró la cita.");
    return null;
  }
};

export const actualizarCitaMedica = async (id, nuevosDatos) => {
  const docRef = doc(firestore, "citas_medicas", id);
  await updateDoc(docRef, nuevosDatos);
  console.log("Cita actualizada con éxito");
};

export const eliminarCitaMedica = async (id) => {
  await deleteDoc(doc(firestore, "citas_medicas", id));
  console.log("Cita eliminada con éxito");
};


//funcion recordatorio cita medica
const calcularRecordatorioCita = (fechaCita) => {
  const unDiaAntes = new Date(fechaCita.getTime() - 24 * 60 * 1000);
  const dosHorasAntes = new Date(fechaCita.getTime() - 2 * 60 * 1000);
  
  return { unDiaAntes, dosHorasAntes };
};

const fechaCita = new Date('2024-11-04 T15:00');
const recordatorios = calcularRecordatorioCita(fechaCita);
console.log("Recordatorio 1 día antes:", recordatorios.unDiaAntes);
console.log("Recordatorio 2 horas antes:", recordatorios.dosHorasAntes);

//intervalos recordatorios
const calcularSiguienteRecordatorio = (horaInicio, intervalo, posponer = 0) => {
  let siguienteHora = new Date(horaInicio.getTime() + intervalo * 60 * 60 * 1000);
  siguienteHora = new Date(siguienteHora.getTime() + posponer * 60 * 1000);
  
  return siguienteHora;
};

// Usandolo
const horaInicio = new Date('2023-10-31T16:00:00');
const intervalo = 6; 
console.log(calcularSiguienteRecordatorio(horaInicio, intervalo)); 
console.log(calcularSiguienteRecordatorio(horaInicio, intervalo, 5));





