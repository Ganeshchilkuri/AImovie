import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { fetchPoster } from '../../Embeddings/fetchPoster';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLocalSearchParams } from 'expo-router';

type MovieItemPros = {
  item: any;
  index: number;
};
const MovieItem = ({ item: movie,index }: MovieItemPros) => {
  console.log(movie.imdb_id);
  return (
    <Link href={`/${movie.id}`} asChild>
          
      <Pressable style={styles.container}>
      <Text style={styles.index}>#{index + 1}</Text>
        <View style={{ flex: 1 }}>
         <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>{movie.tagline}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    fontSize: 40,
    color: 'gray',
    fontFamily: 'Courier New',
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gainsboro',
    marginVertical: 5,
  },
  subtitle: {
    color: 'gray',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: 'gray', // Placeholder color
    borderRadius: 5,
  },
});

export default MovieItem;
