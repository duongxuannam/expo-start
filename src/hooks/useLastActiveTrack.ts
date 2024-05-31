import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

export const useLastActiveTruck = () => {
	const activeTruck = useActiveTrack()
	const [lastActiveTrack, setLastActiveTrack] = useState<Track>()

	useEffect(() => {
		if (!activeTruck) return

		setLastActiveTrack(activeTruck)
	}, [activeTruck])
	return lastActiveTrack
}
