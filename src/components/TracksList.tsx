import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import TracksListItem from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSepatator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{
				paddingTop: 10,
				paddingBottom: 128,
			}}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No Songs found</Text>
					<FastImage
						style={utilsStyles.emptyContentImage}
						source={{
							uri: unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
					/>
				</View>
			}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TracksList
