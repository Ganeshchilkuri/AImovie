import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';
import MovieItem from '../components/MovieItem';
import { fetchPoster } from '../../Embeddings/fetchPoster';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [posterPath, setPosterPath] = useState('');

 
  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        return;
      }
      const { data: movie } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single();

      if (movie) {
        setMovie(movie);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchMoviePoster = async () => {
      try {
        if (!id) {
          return;
        }
        const { data: movie } = await supabase
          .from('movies')
          .select('imdb_id')
          .eq('id', id)
          .single();

        if (!movie || !movie.imdb_id) {
            console.error('No movie data found');
            return;
          }
          const externalId = String(movie.imdb_id).trim();
        const path = await fetchPoster(externalId); // Assuming externalId is the identifier for the movie
        setPosterPath(path);
      } catch (error) {
        console.error('Error fetching poster:', error);
      }
    };

    fetchMoviePoster();
  }, [movie]);

  useEffect(() => {
    if (!movie?.embedding) {
      return;
    }
    const fetchSimilarMovies = async () => {
      const { data } = await supabase.rpc('match_movies', {
        query_embedding: movie.embedding, // Pass the embedding you want to compare
        match_threshold: 0.78, // Choose an appropriate threshold for your data
        match_count: 5, // Choose the number of matches
      });
      setSimilarMovies(data);
    };

    fetchSimilarMovies();
  }, [movie?.embedding]);

  if (!movie) {
    return <ActivityIndicator />;
  }

  console.log(similarMovies);

  return (
    <View style={styles.container}>
       {posterPath ? (
        <Image source={{ uri: posterPath }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>{movie.tagline}</Text>

      <Text style={styles.overview}>{movie.overview}</Text>

      <Text style={styles.similar}>Similar movies</Text>
      <FlatList data={similarMovies} renderItem={MovieItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gainsboro',
    marginVertical: 5,
  },
  subtitle: {
    color: 'gray',
    fontSize: 16,
  },
  overview: {
    color: 'gainsboro',
    marginTop: 20,
    lineHeight: 20,
    fontSize: 16,
  },

  similar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gainsboro',
    marginVertical: 5,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 290,
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

export default MovieDetails;
