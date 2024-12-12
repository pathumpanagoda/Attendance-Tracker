import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const Report = () => {
    const [reportData, setReportData] = useState({
        title: '',
        description: '',
        date: '',
        author: ''
    });

    const handleChange = (name, value) => {
        setReportData({
            ...reportData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Handle report submission logic here
        console.log('Report Submitted:', reportData);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Generate Report</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={reportData.title}
                onChangeText={(text) => handleChange('title', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={reportData.description}
                onChangeText={(text) => handleChange('description', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                value={reportData.date}
                onChangeText={(text) => handleChange('date', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={reportData.author}
                onChangeText={(text) => handleChange('author', text)}
            />
            <Button title="Submit Report" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});

export default Report;