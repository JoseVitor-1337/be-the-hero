import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logo from '../../assets/logo.png'

import styles from './style'

export default function Cases() {
  const [ cases, setCases ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ page, setPage ] = useState(1)
  const [ loading, setLoading ] = useState(false)

  const navigation = useNavigation();

  function navigationToDefail(data) {
    navigation.navigate('Detail', { data })
  }

  async function loadCases() {
    if (loading) {
      return
    }

    if (total > 0 && cases.length === total) {
      return
    }

    setLoading(true)

    const response = await api.get('/cases', {
      params: { page }
    })

    setCases([...cases, ...response.data]) // Anexar 2 vetores em um unico vetor
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
      loadCases()
  }, [])

  return (
    <View style={styles.container} >
        <View style={styles.header}>
          <Image source={logo} />
          <Text style={styles.headerText} >
            Total de <Text style={styles.headerTextBold}>{total}</Text> casos
          </Text>
        </View>

        <Text style={styles.title}> Bem Vindo!</Text>
        <Text style={styles.description}>
          Escolha um dos casos abaixo e salve o dia
        </Text>

        <FlatList
          data={cases}
          style={styles.casesList}
          keyExtractor={data => String(data.id)}
          showsVerticalScrollIndicator={true}
          onEndReached={loadCases}
          onEndReachedThreshol={0.2}
          renderItem={({ item: data }) => {
            return ( 
              <View style={styles.cases}>
                <Text style={styles.casesProperty}>ONG:</Text>
                <Text style={styles.casesValue}>{data.name}</Text>

                <Text style={styles.casesProperty}>CASO:</Text>
                <Text style={styles.casesValue}>{data.title}</Text>

                <Text style={styles.casesProperty}>VALOR:</Text>
                <Text style={styles.casesValue}>
                  {Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'
                    }).format(data.value)}
                </Text>

                <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDefail(data)}>
                  <Text style={styles.detailsButtonText}>
                    Ver mais detalhes
                  </Text>
                  <Feather name="arrow-left" size={16} color="#E02041" />
                </TouchableOpacity>
              </View>
            )
          }}
        />
    </View>
  )
}