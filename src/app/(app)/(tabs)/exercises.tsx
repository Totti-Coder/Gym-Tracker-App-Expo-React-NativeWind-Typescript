import {View, Text, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className='text-2xl font-bold text-gray-900'>
        Libreria de Ejercicios
        </Text>
        <Text className='text-gray-600 mt-1'>
          Descubre y masteriza nuevos ejercicios!
        </Text>


        {/* Barra de busqueda */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
          <Ionicons name="search" size={20} color="#6B7280"/>
          <TextInput
          className='flex-1 ml-3 text-gray-800'
          placeholder='Busca el ejercicio adecuado...'
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ borderWidth: 0, outlineWidth: 0 }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280"/>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
    </SafeAreaView>
  )
}




