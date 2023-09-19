import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, TextInput, Button, FlatList, View, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchMeals = () => {
    setIsAnimating(true);
    fetch(process.env.EXPO_PUBLIC_API_URL + keyword)
    .then(response => response.json())
    .then(data =>  {
      setRepositories(data.meals);
      setIsAnimating(false);
    })
    .catch(error => {
      alert(error)
    //console.error(err)
    setIsAnimating(false)
  })

  
  }
  const ItemSeparator = () => {
  
    return (
      <View
        style={{ width: "100%", height: 2, backgroundColor: "purple" }}
      ></View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' animating={isAnimating} 
      
      
      />
     <FlatList
  data={repositories}
  ItemSeparatorComponent={ItemSeparator}
  renderItem={({ item }) => (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.strMeal}</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: item.strMealThumb }} 
      />
    </View>
    
  )}
/>
    
      
      
      <TextInput
      value={keyword}
      onChangeText={text => setKeyword(text)}
      placeholder='Keyword'
      />
      <Button title="Enter ingredient" onPress={fetchMeals}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 20,
    marginLeft: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
