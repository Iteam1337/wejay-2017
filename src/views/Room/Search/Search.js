// @flow

import * as React from 'react'
import * as WejayApi from './__generated__/Search'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Field, Form, Formik } from 'formik'
import yup from 'yup'
import styled, { keyframes } from 'styled-components'
import SearchResult from './SearchResult'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/ikons/close'
import { magnifying_glass } from 'react-icons-kit/ikons/magnifying_glass'
import { forceCheck } from 'react-lazyload'

type RoomSearchProps = {
  addToQueue: (spotifyId: string) => Promise<void>,
  currentQueue: WejayApi.Search_search[],
  currentTrack: WejayApi.Search_search,
  search: Function,
}

type SearchFormValues = WejayApi.SearchVariables

type RoomSearchState = {
  isSearching: boolean,
  searchResult: WejayApi.Search_search[],
}

const SearchOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
`

const bounceIn = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`

const SearchClose = styled.div`
  animation: ${bounceIn} 500ms linear 1;
  color: rgb(237, 167, 76);
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 100px;
  z-index: 2;

  @media (min-width: 1025px) {
    right: 40px;
  }
`

const SearchFormWrap = styled.div`
  position: relative;
  z-index: 2;
`

const SearchInputWrap = styled.div`
  align-items: center;
  border-bottom: 2px solid;
  border-color: ${({ isFocused }) =>
    isFocused ? 'rgb(237, 167, 76)' : '#eaecef'};
  color: #c2c7ce;
  display: flex;
  transition: border-color 150ms ease-in-out;
`

const SearchInput = styled(Field)`
  background: none;
  border: 0;
  color: rgb(237, 167, 76);
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100%;

  &:focus {
    outline: none;
  }

  ::-moz-input-placeholder {
    color: #c2c7ce;
  }

  ::-webkit-input-placeholder {
    color: #c2c7ce;
  }
`

const SearchResultsList = styled.div`
  background-color: #fff;
`

class RoomSearch extends React.Component<RoomSearchProps, RoomSearchState> {
  searchForm: ?Formik

  state = {
    isSearching: false,
    searchResult: [],
  }

  handleSearch = async (values: SearchFormValues) => {
    const searchResult = await this.props.search({
      variables: values,
    })

    this.setState(() => ({
      searchResult: searchResult.data.search,
    }))
  }

  displayOverlay = () => {
    this.setState({
      isSearching: true,
    })
  }

  hideOverlay = () => {
    this.setState(
      {
        isSearching: false,
        searchResult: [],
      },
      () => {
        forceCheck()

        if (this.searchForm) {
          this.searchForm.resetForm()
        }
      }
    )
  }

  render () {
    const { isSearching, searchResult } = this.state

    return (
      <div>
        {isSearching && (
          <SearchOverlay>
            <SearchClose onClick={this.hideOverlay} opened={isSearching}>
              <Icon icon={close} size={40} />
            </SearchClose>
          </SearchOverlay>
        )}

        <SearchFormWrap>
          <Formik
            enableReinitialize
            initialValues={{ query: '' }}
            onSubmit={this.handleSearch}
            ref={ref => (this.searchForm = ref)}
            render={() => (
              <Form>
                <SearchInputWrap isFocused={isSearching}>
                  <Icon icon={magnifying_glass} size={20} />

                  <SearchInput
                    name="query"
                    onFocus={this.displayOverlay}
                    placeholder="Search For Music To Add"
                  />
                </SearchInputWrap>
              </Form>
            )}
            validationSchema={yup.object().shape({
              query: yup.string().required(),
            })}
          />

          {searchResult.length > 0 && (
            <SearchResultsList>
              {searchResult.map(track => (
                <SearchResult
                  addToQueue={this.props.addToQueue}
                  currentQueue={this.props.currentQueue}
                  currentTrack={this.props.currentTrack}
                  key={track.spotifyUri}
                  track={track}
                />
              ))}
            </SearchResultsList>
          )}
        </SearchFormWrap>
      </div>
    )
  }
}

const SearchMutation = gql`
  mutation Search($query: String!) {
    search(query: $query) {
      ...SearchTrackInfo
    }
  }

  fragment SearchTrackInfo on Track {
    album {
      images {
        height
        url
        width
      }
      name
    }
    artists {
      name
    }
    duration
    name
    spotifyUri
  }
`

export default graphql(SearchMutation, { name: 'search' })(RoomSearch)
