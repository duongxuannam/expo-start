import { unknownTrackImageUri } from '@/constants/images'
import { useLastActiveTruck } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from './PlayerControl'

const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()
	const lastAcitveTrack = useLastActiveTruck()
	const displayedTrack = activeTrack ?? lastAcitveTrack

	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<FastImage
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>
				<View style={styles.trackContainer}>
					<Text style={styles.trackTitle}>{displayedTrack.title}</Text>
				</View>
				<View style={styles.trackControlContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

export default FloatingPlayer

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		aspectRatio: 1,
		borderRadius: 8,
	},
	trackContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
