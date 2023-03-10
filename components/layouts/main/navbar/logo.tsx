import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import styles from '@/styles/Logo.module.css'
import Link from 'next/link'

const Logo = () => (
  <Flex
    align="center"
    minWidth="fit-content"
    mx={['1', '2']}
    as={Link}
    href="/"
  >
    <Image
      src="/images/redditFace.svg"
      alt="redditFace"
      height={32}
      width={32}
      priority
    />
    <Image
      src="/images/redditText.svg"
      alt="redditText"
      height={43}
      width={73}
      className={styles.logoText}
      priority
    />
  </Flex>
)

export default Logo
