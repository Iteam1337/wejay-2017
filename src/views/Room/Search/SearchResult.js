// @flow

import * as React from 'react'
import * as WejayApi from '__generated__/types.flow'
import Cover from 'components/Cover/Cover'
import TrackDuration from 'components/Track/TrackDuration'
import styled from 'styled-components'
import TrackMeta from 'components/Track/TrackMeta'

type SearchResultProps = {
  addToQueue: (spotifyId: string) => Promise<void>,
  currentQueue: WejayApi.TrackInfoFragment[],
  currentTrack: WejayApi.TrackInfoFragment,
  track: WejayApi.TrackInfoFragment,
}

const TrackRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #eaecef;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: auto 1fr auto auto;
  padding: 15px 0;
`

const AddToQueue = styled.div`
  color: ${({ disabled }) => (disabled ? '#c2c7ce' : 'rgb(237, 167, 76)')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: color 150ms ease-in-out;
`

class SearchResult extends React.Component<SearchResultProps> {
  handleTrackAdd = () => {
    if (this.existsInQueue()) {
      return
    }

    this.props.addToQueue(this.props.track.spotifyUri)
  }

  existsInQueue = () => {
    const { currentQueue, currentTrack, track } = this.props

    const inQueue = !!currentQueue.find(
      queued => queued.spotifyUri === track.spotifyUri
    )

    const isCurrent =
      currentTrack && track.spotifyUri === currentTrack.spotifyUri

    return inQueue || isCurrent
  }

  render () {
    const { track } = this.props

    return (
      <TrackRow>
        <Cover small track={track} width={40} />

        <TrackMeta artists={track.artists} name={track.name} />
        <TrackDuration duration={track.duration} />

        <AddToQueue
          disabled={this.existsInQueue()}
          onClick={this.handleTrackAdd}
          role="button"
        >
          Add To Queue
        </AddToQueue>
      </TrackRow>
    )
  }
}

export default SearchResult
