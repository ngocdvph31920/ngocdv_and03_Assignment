import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddEntry = async () => {
    try {
      const response = await fetch('http://10.24.32.246:3000/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const newEntry = await response.json();
      setEntries([...entries, newEntry]);
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://10.24.32.246:3000/entries');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập lời biết ơn hoặc hạnh phúc trong ngày:</Text>
      <TextInput
        style={[styles.input, { height: 150 }]}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryText}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entry: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  entryText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default HomeScreen;
