import { Pages } from '@renderer/store/reducers/WordPackSlice'
import { useEffect, useState } from 'react'
import { useAppSelector } from './redux'

export const usePage = (pageName: Pages, wordPackId?: number) => {
  const isVisible = (): boolean =>
    pageName === Pages.WORD_PACK
      ? pageName === currentPage && wordPackId === activeWordPackId
      : pageName === currentPage

  const { currentPage, activeWordPackId } = useAppSelector((state) => state.wordPackReducer)
  const [pageVisible, setPageVisible] = useState<boolean>(isVisible())

  useEffect(() => {
    setPageVisible(isVisible())
  }, [currentPage, wordPackId, activeWordPackId])

  return pageVisible
}
