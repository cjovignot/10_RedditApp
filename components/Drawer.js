import * as React from 'react';
import { Drawer } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MyComponent = () => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section title="Some title" style={style.section}>
        <Drawer.Item
            style={{ backgroundColor: '#64ffda' }}
            icon="inbox"
            label="email"
        />
        <Drawer.Item
            style={{ backgroundColor: '#64ffda' }}
            icon="star"
            label="email"
        />
        <Drawer.Item
            style={{ backgroundColor: '#64ffda' }}
            icon="mail"
            label="email"
        />
    </Drawer.Section>
  );
};

const style = StyleSheet.create({
    section: {
        flexDirection: 'column',
        alignItems: 'stretch',
    }
});

export default MyComponent;
