import { ButtonBackToTop } from '@/components/buttons/ButtonBacktoTop'
import Info from '@/components/info/info'
import ContentLayouts from '@/components/layouts/content'
import PageR404 from '@/components/r/404'
import Header from '@/components/r/header'
import LinkPost from '@/components/r/linkpost'
import PostTimeline from '@/components/r/postTimeline'
import {
  communityData,
  communitySubsState
} from '@/libs/atoms/communitiesAtoms'
import { postState } from '@/libs/atoms/postsAtom'
import getcommunityData from '@/libs/firebase/communityData'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

interface serverProps extends GetServerSideProps {
  params: {
    communityID: string
  }
}

export const getServerSideProps = async ({
  params: { communityID }
}: serverProps): Promise<
  Partial<{ props: { communityData: communityData | false } }>
> => {
  const communityData = await getcommunityData(communityID)

  return {
    props: {
      communityData
    }
  }
}

export default function CommunityPage({
  communityData
}: {
  communityData: communityData
}) {
  const ref = useRef<HTMLDivElement>(null)
  const setCommunitySubs = useSetRecoilState(communitySubsState)
  const [postStateValue, setPostState] = useRecoilState(postState)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // if there any post that not match with current community request new data.
    if (postStateValue.posts.find(post => post.communityId !== communityData.id)) {
      setPostState(prev => ({
        ...prev,
        totalCollections: -1,
        posts: []
      }))
    }
  }, [postStateValue.posts])

  useEffect(() => {
    setCommunitySubs(prev => ({
      ...prev,
      currentCommunity: communityData
    }))
  }, [communityData])

  if (!communityData) return <PageR404 />

  return (
    <>
      <Header />
      <ContentLayouts>
        <>
          <LinkPost />
          <PostTimeline communityId={communityData.id} />
        </>
        <>
          <Info />
          {postStateValue.totalCollections !== -1 && (
            <Flex ref={ref} direction="column" flexGrow="1">
              <Flex
                display={
                  (ref.current?.clientHeight || 0) >= 1200 ? 'initial' : 'none'
                }
                mt={(ref.current?.clientHeight || 0) >= 1200 ? '420px' : '0px'}
                direction="column"
                position="relative"
                flexGrow="1"
              >
                <ButtonBackToTop />
              </Flex>
            </Flex>
          )}
        </>
      </ContentLayouts>
    </>
  )
}
