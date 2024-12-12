import { setDoc, doc, collection } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { firestore } from '../../services/firebaseConfig';

export async function primerRecordatorio(medicamentoData) {
  const { usuarioId, medicamentoId, intervalo, horaInicial, cantidad  } = medicamentoData;

  const primeraNotificacion = new Date(horaInicial);

  //Intervalo en minutos
  // const trigger = new Date(primeraNotificacion.getTime() + intervalo * 60 * 1000);
  //Intervalo en horas
  //const trigger = new Date(primeraNotificacion.getTime() + intervalo * 60 * 60 * 1000);

  const recordatorioId = `${medicamentoId}_${new Date().getTime()}`;
  const recordatorioRef = doc(
    collection(
      firestore,
      `usuarios/${usuarioId}/medicamentos/${medicamentoId}/recordatorios`
    ),
    recordatorioId
  );

  await setDoc(recordatorioRef, {
    proximaToma: horaInicial,
    estado: 'pendiente',
    retrasadoVeces: 0,
  });
  // await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Es hora de tomar tu medicamento!",
      body: "Es momento de tomar tu dosis. ¿Lo has tomado?",
      data: { medicamentoId, usuarioId }
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: intervalo * 60 * 60,
      repeats: true
    },
    
  });
  

}