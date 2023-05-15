import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Drawer } from 'react-native-paper';

const MyComponent = () => (
    <>
        <Drawer.CollapsedItem style={styles.drawerItem}
            focusedIcon="inbox"
            unfocusedIcon="inbox-outline"
            label="Inbox"
        />
        <Drawer.CollapsedItem style={styles.drawerItem}
            focusedIcon="inbox"
            unfocusedIcon="inbox-outline"
            label="Inbox"
        />
   </>
);

const styles = StyleSheet.create({
    drawerItem: {
    },
  });

export default MyComponent;