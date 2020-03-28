import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailCompose from 'expo-mail-composer'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

import logo from '../../assets/logo.png'

import styles from './style'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute();

  const data = route.params.data
  const message = `Olá ${data.name}, estou entrando em contato pois gostaria de ajudar no caso: ${data.title} com o valor de R$ ${data.value},00`

  const navigateBack = () => {
    navigation.goBack()
  }

  // Mandar email da forma mais fácil POSSÌVEL
  async function sendMail() {
    MailCompose.composeAsync({
      subject: `Herói do caso: ${data.title}`,
      recipients: [data.email],
      body: message
    })
  }
  
  /* 
    Para acessor alguns aplicativos do seu celular dentro da sua aplicação poderá
    ser feito através do "DeepLinking" que irá abrir a aplicação externa podendo passar
    sAlguns parâmetros para dentro dela 
  */

  async function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=559591461931=${message}`)
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
          <Image source={logo} />

          <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color="#E02041"/>
          </TouchableOpacity>
      </View>

      <View style={styles.cases}>
        <Text style={styles.casesProperty}>ONG:</Text>
        <Text style={styles.casesValue}>
          {data.name} de {data.city}/{data.uf}
        </Text>

        <Text style={styles.casesProperty}>CASO:</Text>
        <Text style={styles.casesValue}>{data.title}</Text>

        <Text style={styles.casesProperty}>VALOR:</Text>
        <Text style={styles.casesValue}>
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL'
            }).format(data.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>

        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription} >Entre em contato</Text>
 
        <View style={styles.actions}>

          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>Whastapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}