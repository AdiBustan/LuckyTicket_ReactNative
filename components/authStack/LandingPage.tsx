import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../config/firebase';

const LandingPage = ({ navigation } :any) => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the home page
        navigation.navigate('Home');
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      {/* <Text style={styles.appName}>Lucky Ticket</Text> */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background color
  },
  image: {
    height: 250,
    width: 400,
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: '#4C679E', // Blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff', // White color
    fontSize: 22,
    fontWeight: 'bold',
  },
  signUpLink: {
    color: '#4C679E', // Blue color
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default LandingPage;
