import ContentLayouts from "@/components/layouts/content"
import Post from "@/components/r/postTimeline/post"
import Info from '@/components/info'
import { auth } from "@/libs/firebase/clientApp"
import usePost from "@/libs/hooks/usePosts"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Comments from "@/components/r/comments"
import { PostSkeleton } from "@/components/skeleton/postSkeleton"



export default function PostCommentPage() {
  const router = useRouter()
  let { communityID, pid } = router.query
  communityID = typeof communityID === 'string' ? communityID : ''
  pid = typeof pid === 'string' ? pid : ''


  const [user] = useAuthState(auth)
  const usePostHook = usePost(communityID, user?.uid, pid)

  const { postStateValue, setPostState, loading, err } = usePostHook

  useEffect(() => {

    return () => setPostState(prev => ({
      ...prev,
      selectedPost: null
    }))
  }, [])

  return (
    <ContentLayouts>
      <>
        {postStateValue.selectedPost ?
          <Post
            isUserCreator={user?.uid === postStateValue.selectedPost!.creatorId}
            userVoteValue={
              postStateValue.userVotePost.filter(i => i.postId === postStateValue.selectedPost!.id)[0]
                ?.vote
            }
            {...postStateValue.selectedPost}
            {...usePostHook} />
          :
          <PostSkeleton selectedPost={true} />
        }
        <Comments
          user={user}
          selectedPost={postStateValue?.selectedPost}
          setPostState={setPostState}
        />

      </>
      <>
        <Info />
      </>
    </ContentLayouts>
  )
}