import { atom } from 'recoil'

export type communitySub = {
  communityId: string
  communityName: string
  isModerator: boolean
  imageUrl?: string
}
export type communityData = {
  id: string
  communityName: string
  imageUrl: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  creatorId: string
  numberOfmember: number
  intractedUserId: string[]
  privacyType: string
}

export interface communitySubsCollection {
  totalSubs: number
  subs: communitySub[]
  currentCommunity: communityData
}

export const currentCommunity = {
  id: '',
  communityName: '',
  imageUrl: '',
  createdAt: {
    seconds: 0,
    nanoseconds: 0
  },
  creatorId: '',
  numberOfmember: 0,
  intractedUserId: [],
  privacyType: ''
}

const defaultCommunitySubs: communitySubsCollection = {
  totalSubs: -1,
  subs: [],
  currentCommunity
}

export const communitySubsState = atom<communitySubsCollection>({
  key: 'communitySubsState',
  default: defaultCommunitySubs
})
