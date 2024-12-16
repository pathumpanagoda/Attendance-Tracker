import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

const Settings = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            
            {/* Notifications Setting */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            {/* Developer Details Section */}
            <View style={styles.developerSection}>
                <Text style={styles.sectionTitle}>Developer Details</Text>
                <View style={styles.developerInfo}>
                    <Text style={styles.developerText}>Name: Dilshan Pathum</Text>
                    <Text style={styles.developerText}>Email: pathumpanagoda@gmail.com</Text>
                    <Text style={styles.developerText}>GitHub:  github.com/pathumpanagoda</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    settingText: {
        fontSize: 18,
        color: '#555',
    },
    developerSection: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    developerInfo: {
        marginTop: 10,
    },
    developerText: {
        fontSize: 16,
        color: '#777',
        marginBottom: 5,
    },
});

export default Settings;
