import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveChild = async (child) => {
  const data = await AsyncStorage.getItem("children");
  const children = data ? JSON.parse(data) : [];
  children.push(child);
  await AsyncStorage.setItem("children", JSON.stringify(children));
};

export const getChildren = async () => {
  const data = await AsyncStorage.getItem("children");
  return data ? JSON.parse(data) : [];
};

export const saveVaccination = async (record) => {
  const data = await AsyncStorage.getItem("vaccinations");
  const records = data ? JSON.parse(data) : [];
  records.push(record);
  await AsyncStorage.setItem("vaccinations", JSON.stringify(records));
};

export const getVaccinations = async () => {
  const data = await AsyncStorage.getItem("vaccinations");
  return data ? JSON.parse(data) : [];
};