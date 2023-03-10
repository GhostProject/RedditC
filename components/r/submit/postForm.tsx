import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { BiPoll } from 'react-icons/bi'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import {
  Flex,
  Tab,
  TabList,
  Tabs,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import TabPanelList from './postform/tabPanel'
import { ChangeEvent, useEffect, useState } from 'react'
import { Post, postState } from '@/libs/atoms/postsAtom'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import uploadPost from '@/libs/firebase/uploadPost'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useSelectImage from '@/libs/hooks/useSelectImage'
import { communitySubsState } from '@/libs/atoms/communitiesAtoms'
import { infoModalState } from '@/libs/atoms/infoPropsModalAtoms'

const formTabs = [
  {
    title: 'Post',
    icon: IoDocumentText
  },
  {
    title: 'Images & Videos',
    icon: IoImageOutline
  },
  {
    title: 'Link',
    icon: BsLink45Deg
  },
  {
    title: 'Poll',
    icon: BiPoll
  },
  {
    title: 'Talk',
    icon: BsMic
  }
]

export interface TabItem {
  title: string
  icon: React.ReactNode
}

interface PostForm {
  user: User | undefined | null
}

const PostForm = ({ user }: PostForm) => {
  const router = useRouter()
  let { tabIndex } = router.query
  tabIndex = typeof tabIndex === 'string' ? tabIndex : '0'

  const [tab, setTab] = useState(0)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // This useEffect handle click image from linkPost component for tab
    if (!tabIndex) return

    const tabIndexNotYetFeatureAvailable = tabIndex !== '1' && tabIndex !== '0'
    if (tabIndexNotYetFeatureAvailable) return

    setTab(parseInt(tabIndex as string))
  }, [])
  const [inputText, setInputText] = useState({
    title: '',
    body: ''
  })
  const {
    imgUrl,
    setImgUrl,
    convertToDataUrlAndSaveToImgUrl,
    err: selectImgErr
  } = useSelectImage()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | undefined>()
  const setPostState = useSetRecoilState(postState)
  const setInfoModal = useSetRecoilState(infoModalState)
  const [isInfo, setInfo] = useState(false)
  const communityImgUrl =
    useRecoilValue(communitySubsState).currentCommunity.imageUrl

  const handleTab = (n: number) => {
    if (n !== 0 && n !== 1 && isInfo) return setInfo(false)
    if (n !== 0 && n !== 1 && !isInfo) return setInfoModal(true), setInfo(true)

    setTab(n)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (err) setErr('')
    setInputText(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleUpload = async () => {
    const { communityID } = router.query
    if (typeof communityID !== 'string') return
    const post: Post = {
      id: '',
      communityId: communityID.toLowerCase(),
      creatorId: user!.uid,
      creatorName: user!.displayName || user!.email!.split('@')[0],
      title: inputText.title,
      body: inputText.body,
      numberOfComments: 0,
      communityImgUrl,
      vote: 0,
      createdAt: serverTimestamp() as Timestamp
    }

    setLoading(true)
    try {
      const upload = await uploadPost(post, imgUrl)
      if (upload.err) return setErr(upload.err)
      setPostState(prev => ({
        ...prev,
        totalCollections: prev.totalCollections + 1,
        posts: [
          {
            ...post,
            id: upload.id!,
            imgUrl: upload?.imgUrl,
            createdAt: { seconds: Date.now() / 1000 } as Timestamp
          },
          ...prev.posts
        ]
      }))
    } catch (e: any) {
      console.error('deleted post', e.message)
    }
    setLoading(false)

    if (err) return
    // Clear the data and push back to communityID
    setInputText({
      title: '',
      body: ''
    })
    setImgUrl('')

    // Dont use back cause when user reload do same in the same page it will just back to history stack not to communityID
    router.push(`/r/${communityID}`)
  }

  useEffect(() => {
    setErr(selectImgErr)
  }, [selectImgErr])

  return (
    <Flex direction="column" bg="white" borderRadius="4">
      <Tabs
        index={tab}
        onChange={handleTab}
        overflow="hidden"
        borderRadius="4px"
      >
        <TabList justifyContent="space-between" bg="gray.200">
          {formTabs.map((i, index) => (
            <Tab
              key={i.title}
              bg="white"
              color="gray.500"
              fontSize={['8pt', '9pt', '11pt']}
              fontWeight="semibold"
              p={['0', '4px 2px', '4px 2px', '15px 17px']}
              w={['full', 'auto']}
              // minWidth={['auto', 'auto', 'auto']}
              flexGrow="1"
              ml={index == 0 ? 'unset' : '1px'}
              borderBottom="1px"
              borderColor="gray.200"
              _selected={{
                color: 'purple.400',
                borderColor: 'purple.400',
                borderBottom: '2px',
                bg: 'purple.50'
              }}
            >
              <Icon as={i.icon} fontSize={['13pt', '16pt']} mr={['0', '5px']} />{' '}
              {i.title}
            </Tab>
          ))}
        </TabList>
        <TabPanelList
          inputText={inputText}
          onChange={onChange}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          convertToDataUrlAndSaveToImgUrl={convertToDataUrlAndSaveToImgUrl}
          setTab={setTab}
          upload={handleUpload}
          loading={loading}
          setErr={setErr}
          err={err}
        />
      </Tabs>
      {err && (
        <Alert status="error" borderRadius="0 0 4px 4px">
          <AlertIcon />
          <AlertTitle mr="2">{err}</AlertTitle>
        </Alert>
      )}
    </Flex>
  )
}

export default PostForm
