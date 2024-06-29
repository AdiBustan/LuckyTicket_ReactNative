import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../config';
import { authToAutoLogin } from '../../config/firebase';

const LandingPage = ({ navigation } :any) => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authToAutoLogin, (user) => {
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
      <Text style={styles.appName}>Lucky Ticket</Text>
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
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#007bff', // Blue color
  },
  loginButton: {
    backgroundColor: '#007bff', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpLink: {
    color: '#007bff', // Blue color
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LandingPage;
