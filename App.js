import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Movies from './src/services/Movies';

function TrendingItem({movie}) {
  const imgUrl = `http://image.tmdb.org/t/p/w185${movie.poster_path}`;
  return (
    <View style={styles.trendingItemStyle}>
      <Image style={styles.trendingItemImageStyle} source={{uri: imgUrl}} />
      <Text style={styles.trendingItemTextStyle}>{movie.title}</Text>
      <Text>★ {movie.vote_average}/10</Text>
    </View>
  );
}

const App = () => {
  const [trending, setTrending] = useState([]);
  const [filter, setFilter] = useState({min_average: 0});

  const loadTrending = async () => {
    const results = await Movies.getTrending({
      min_average: filter.min_average / 10,
    });
    setTrending(results);
  };

  useEffect(() => {
    loadTrending();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Filmes mais assistidos da semana</Text>
        <FlatList
          data={trending}
          renderItem={({item}) => <TrendingItem movie={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          style={styles.trendingContainer}
        />
        <Text style={{marginTop: 15}}>Nota mínima</Text>
        <Slider
          style={{height: 40}}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#EEEEEE"
          maximumTrackTintColor="#999999"
          value={filter.min_average}
          onValueChange={value => setFilter({min_average: value})}
        />
        <Text style={{marginBottom: 15, textAlign: 'center'}}>
          {filter.min_average / 10}
        </Text>
        <Button title=" Filtrar" onPress={loadTrending} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    marginHorizontal: 10,
  },
  trendingContainer: {
    marginHorizontal: -10,
    height: 200,
  },
  trendingItemStyle: {
    display: 'flex',
    width: 120,
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  trendingItemImageStyle: {
    flex: 1,
  },
  trendingItemTextStyle: {
    flex: 1,
    paddingTop: 15,
  },
});

export default App;
