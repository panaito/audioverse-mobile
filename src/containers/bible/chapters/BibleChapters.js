import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'

import MiniPlayer from 'src/components/miniplayer'
import defaultImage from 'assets/av-logo.png'
import { Endpoints, MediaTypes } from 'src/constants'

class BibleChapters extends PureComponent {

  handlePressItem = item => {
    this.props.actions.bibleChapter(item.chapter_id)
    this.props.navigation.pop()

    const { items, bible, actions } = this.props

    const tracks = items.map(item => ({
      id: `${bible.version.id}_${item.book_id}_${item.chapter_id}`,
      title: `${item.book_id} ${item.chapter_id}`,
      artist: bible.version.name,
      artwork: defaultImage,
      fileName: `${bible.version.id}_${item.book_id}_chapter_${item.chapter_id}.mp3`,
      downloadURL: `${Endpoints.bibleCDN}${bible.version.id}_${item.book_id}_chapter_${item.chapter_id}.mp3/${encodeURIComponent(item.path)}`,
      mediaType: MediaTypes.bible
    }))

    const track = tracks.find(el => el.id === `${bible.version.id}_${item.book_id}_${item.chapter_id}`)

    actions.resetAndPlayTrack(tracks, track.id)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.handlePressItem.bind(this, item)} style={styles.item}>
        <Text style={styles.chapter}>{item.chapter_id}</Text>
      </TouchableOpacity>
    )
  }
  
  render() {
    
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.chapter_id}
          refreshing={pagination.isFetching}
          numColumns={4}
        />
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  item: {
    width: '25%',
    padding: 15,
    alignItems: 'center'
  },
  chapter: {
    fontSize: 18
  }
})

BibleChapters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  bible: PropTypes.object,
  actions: PropTypes.shape({
    bibleChapter: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default BibleChapters
