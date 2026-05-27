import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useLojas } from '../../hooks/useLojas';
import LojaCard from '../../components/LojaCard';
import { styles } from './StyleHome';

export default function HomeScreen({ navigation }) {
  const { lojas, loading } = useLojas();

  if (loading) return <ActivityIndicator size="large" color="#27ae60" />;

  return (
    <View style={styles.container}>
      <FlatList 
        data={lojas}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <LojaCard loja={item} />}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastrarLoja')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}