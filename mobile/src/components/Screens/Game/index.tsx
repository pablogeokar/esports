import { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Background } from '../../Background';
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles';
import { GameParams } from './../../../@types/navigation.d';
import { THEME } from '../../../theme';
import logoImg from '../../../assets/logo-nlw-esports.png'
import { Heading } from '../../Heading';
import { DuoCard } from '../../DuoCard';
import { DuoCardProps } from './../../DuoCard/index';
import { DuoMatch } from '../../DuoMatch';

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    await fetch(`http://192.168.0.105:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.105:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />

        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode='cover' />

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar' />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>N??o h?? an??ncios publicados ainda</Text>
          )}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => { getDiscordUser(item.id) }} />
          )} />

        <DuoMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')} />
      </SafeAreaView>
    </Background>
  );
}
