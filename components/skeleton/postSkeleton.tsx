import { Icon, Button, Flex, Skeleton, Stack } from '@chakra-ui/react'
import { BsChat } from 'react-icons/bs'
import {
  IoArrowDownCircleOutline,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoBookmarkOutline
} from 'react-icons/io5'

const ImageSkeleton = () => <Skeleton height="460px" width="full" />

const PostSkeleton = ({ selectedPost = false }) => (
  <Flex
    bg="white"
    border={selectedPost ? 'unset' : '1px solid'}
    borderColor="gray.300"
    borderRadius={selectedPost ? '4px 4px 0 0' : '4'}
    cursor="progress"
  >
    <Flex
      direction="column"
      bg={selectedPost ? 'white' : 'gray.100'}
      align="center"
      width={['30px', '40px']}
      p="2"
      borderRadius="4"
    >
      <Button
        variant="iconList"
        _hover={{ bg: 'gray.200' }}
        minW="0"
        maxH="20pt"
      >
        <Icon
          fontSize="20pt"
          _hover={{ color: 'brand.100' }}
          as={IoArrowUpCircleOutline}
          color={'gray.400'}
        />
      </Button>
      {0}
      <Button
        variant="iconList"
        _hover={{ bg: 'gray.200' }}
        minW="0"
        maxH="20pt"
      >
        <Icon
          fontSize="20pt"
          _hover={{ color: 'brand.200' }}
          as={IoArrowDownCircleOutline}
          color={'gray.400'}
        />
      </Button>
    </Flex>

    <Flex direction="column" flexGrow="1">
      <Stack spacing="1" p="10px">
        <Skeleton height="9pt" maxW="220px" />
        <Skeleton height="14pt" maxW="340px" />
        <ImageSkeleton />

        <Flex ml="1" mb="0.5" color="gray.500">
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={BsChat} mr="2" fontSize="20px" />0 Comments
          </Button>
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={IoArrowRedoOutline} mr="2" fontSize="20px" />
            Share
          </Button>
          <Button
            variant="iconList"
            alignItems="center"
            fontSize="12px"
            p="8px 10px"
            borderRadius="4px"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={IoBookmarkOutline} mr="2" fontSize="20px" />
            Save
          </Button>
        </Flex>
      </Stack>
    </Flex>
  </Flex>
)

const PostsSkeleton = () => (
  <>
    {[0, 1].map(i => (
      <PostSkeleton key={i} />
    ))}
  </>
)

export { PostsSkeleton as default, PostSkeleton, ImageSkeleton }
