import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { styles } from "./StyleCadastrarLoja";
import { LojaService } from "../../services/api";
import { nextId } from "../../data/mockData";
import { Loja } from "../../@types/loja";
import { useNavigation } from "@react-navigation/native";

type formDataLoja = {
  nome: string;
  categoria: string;
  imagem: string;
  descricao: string;
};

export default function CadastrarLoja() {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState<formDataLoja>({
    nome: "",
    categoria: "",
    imagem: "",
    descricao: "",
  });

  function handleSalvar() {
    if (!formData.nome.trim() || !formData.categoria.trim() || !formData.imagem.trim() || !formData.descricao.trim()) {
      Alert.alert("Validação", "Preencha todos os campos");
      return;
    }

    const novaLoja: Loja = {
      id: nextId(),
      nome: formData.nome.trim(),
      categoria: formData.categoria.trim() || "Geral",
      imagem: formData.imagem.trim() || "",
      distancia: "",
    };

    LojaService.createLoja(novaLoja)
      .then(() => {
        Alert.alert("Sucesso", "Loja cadastrada com sucesso");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível cadastrar a loja");
      });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Loja</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(text) => setFormData({ ...formData, nome: text })}
          placeholder="Nome da loja"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={formData.categoria}
          onChangeText={(text) => setFormData({ ...formData, categoria: text })}
          placeholder="Ex: Padaria, Restaurante"
        />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          value={formData.imagem}
          onChangeText={(text) => setFormData({ ...formData, imagem: text })}
          placeholder="https://..."
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={formData.descricao}
          onChangeText={(text) => setFormData({ ...formData, descricao: text })}
          placeholder="Breve descrição da loja"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar local</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
