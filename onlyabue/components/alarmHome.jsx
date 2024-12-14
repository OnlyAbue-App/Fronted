import React, { useEffect, useState, useCallback } from "react";
import { StatusBar, View, Fab, Box, Text, Spinner, Circle, HStack, Button } from "native-base";
import { ScrollView, StyleSheet, Dimensions, ImageBackground, RefreshControl } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from "./medicamentoCard";
import CardPlaceholder from "./CardPlaceholder";
import { obtenerMedicamentosPorUsuario } from "../services/firestoreService";
import backograundo from "../assets/icons/Fondo.jpg";
import { loadMedsFromFile, saveMedsToFile } from "../services/frontServices";
import styles from "../Styles/GlobalStyles";

const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;
const topPosition = aspectRatio > 1.6 ? -200 : -150;

export function AlarmHome() {
  const [Medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [PlaceHolderF, setPlaceholderF] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresh
  
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 5;  


const obtenerItemsDePagina = () => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return Medicamentos.slice(inicio, fin);
};


const hayMasElementos = () => {
  return pagina * itemsPorPagina < Medicamentos.length;
};


 const retrocederPagina = () => {
    if (pagina > 1) {
        setPagina(pagina - 1);
    }
};


const avanzarPagina = () => {
    if (hayMasElementos()) {
        setPagina(pagina + 1);
    }
};

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedUser = await getNameFromAsyncStorage();
        
        setUser(fetchedUser);

        const dataMeds = await loadMedsFromFile();
        if (Array.isArray(dataMeds) && dataMeds.length > 0) {
          setMedicamentos(dataMeds);          
          setPlaceholderF(false);
        } else {
          const remoteData = await obtenerMedicamentosPorUsuario(fetchedUser);
          setMedicamentos(remoteData);
          await saveMedsToFile(remoteData);
        }
        if (!dataMeds || dataMeds.length === 0) {
          setPlaceholder();
        }        
      } catch (error) {
        console.error("Error durante la inicialización:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const setPlaceholder = () => {
    const placeholderMed = [
      {
        nombreComercial: "Sin Medicamento",
        dias: "-",
      },
    ];
    setPlaceholderF(true);
    setMedicamentos(placeholderMed);
  };

  const setCards = () => {
    if (PlaceHolderF) {
      return Medicamentos.map((med) => <CardPlaceholder key={med.nombreComercial} medicamento={med} />);
    } else {
      const itemsVisibles = obtenerItemsDePagina();
      return itemsVisibles.map((med) => <MedCard key={med.id} medicamento={med} />);
    }
  };

  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const remoteData = await obtenerMedicamentosPorUsuario(user);
      setMedicamentos(remoteData);
      await saveMedsToFile(remoteData);

    } catch (error) {

    } finally {
      setRefreshing(false);
    }
  }, [user]);

  return (
    <View flex={1}>
      <ImageBackground source={backograundo} style={styles.backgroundImage}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Agregar RefreshControl
        >
          <View style={styles.nextAlarmContainer}>
            <Box position={"absolute"} zIndex={-1}>
              <Circle backgroundColor="#ffffff" width={width * 1.1} height={height * 0.6} top={topPosition} />
            </Box>
            <NextAlarm ListaMed={Medicamentos} />
          </View>

          <View alignItems="center">
            <Box width={width * 0.95} shadow={"3"}>
              <Text alignSelf={"center"} color="white" fontSize={29} marginY={2} fontWeight="bold">
                Tus Recordatorios
              </Text>
              <View paddingX={3}>
                {isLoading ? <Spinner size="lg" paddingTop={5} marginBottom={10} /> : setCards()}
              </View>
            </Box>
          </View>
          <HStack justifyContent="space-between" mt={4} mb={10} px={5}>
          {pagina > 1 && (
                <Button 
                  onPress={retrocederPagina}
                  style={styles.button}
                  m={2}
                >
                  <Text style={styles.buttonText}>Anterior</Text>
                </Button>
              )}

              {hayMasElementos() && (
                <Button 
                  onPress={avanzarPagina}
                  style={styles.button}
                  m={2}
                >
                  <Text style={styles.buttonText}>Siguiente</Text>
                </Button>
              )}
            </HStack>
        </ScrollView>
        <Link asChild href="/RegisterMed">
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={<AntDesign name="plus" size={25} color="white" />}
            backgroundColor="#29B6F6"
            position="absolute"
            bottom={10}
            right={30}
          />
        </Link>
      </ImageBackground>
    </View>
  );
}
