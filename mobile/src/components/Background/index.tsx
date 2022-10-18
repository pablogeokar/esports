import { ImageBackground } from 'react-native';

import BackgroundImg from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface BackgroundProps {
  children: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground source={BackgroundImg} defaultSource={BackgroundImg} style={styles.container}>
      {children}
    </ImageBackground>
  );
}