import { router, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Armors, Weapons } from '../../assets/data/equipments'
import { EquipmentEntry, WeaponEntry, WeaponKind } from '../../assets/data/types'
import { useResponsiveWidth } from '../../hooks/useResponsiveWidth'
import { changeSetPiece } from '../../util/redux/CharacterSlice'
import { setRollPool } from '../../util/redux/RollSlice'
import SetItem from '../character/SetItem'

const setPieceMap: Record<string,number> = {
  weapon: 0,
  helm: 1,
  armor: 2,
  leggins: 3,
}


const EquipmentModal = () => {
  const width = useResponsiveWidth().width;
  const dispatch = useDispatch()
  const { replace } = useLocalSearchParams<{replace: string}>();
  const [type, kind] = replace.split(`-`) as [string, string];
  
  const onItemSelected = (piece: WeaponEntry|EquipmentEntry)=>{
    const { type, kind } = piece
    const pieceIndex = setPieceMap[kind] as number
    console.log("🚀 ~ onItemSelected ~ pieceIndex:", pieceIndex, type, kind);
    
    if(type === "weapon") {
      dispatch(changeSetPiece({ index: 0, piece }))
      dispatch(setRollPool(piece.dices))
    }else if (type==="armor" && setPieceMap[kind]){
      dispatch(changeSetPiece({ index: pieceIndex, piece }))
    }
    router.back()
  }
 
  const data: (WeaponEntry|EquipmentEntry)[] = useMemo(()=>{
    if(type==="weapon") return Weapons.filter(w=>w.kind===kind as WeaponKind)
    else if(type==="armor") return Armors.filter((armor) => armor.kind === kind)
    else return []
  },[])

  const isTablet = width > 425;

  const renderItem: ListRenderItem<WeaponEntry|EquipmentEntry> = useCallback(({item})=>{
    return (
      <SetItem 
        full
        key={item.id}
        item={item}
        style={[styles.itemWrapper, { width: null }]}
        onPress={()=>onItemSelected(item)}
      />
    )
  },[onItemSelected, isTablet])
 
  return (
    <FlatList
      data={data}
      numColumns={isTablet ? 2 : 1}
      keyExtractor={i=>i.id}
      style={styles.container}
      contentContainerStyle={[styles.scrollContainer, {width}]}  
      renderItem={renderItem}
    />
  )
}

export default EquipmentModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer:{
    flex:1,
    padding: 16,
    alignSelf: "center", 
  },
  itemWrapper:{ 
    flex: 1,
    margin: 6,
    justifyContent: "space-around", 
  }
})