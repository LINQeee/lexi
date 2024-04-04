import Popup, { Transitions } from '@renderer/components/UI/popup/Popup'
import { usePage } from '@renderer/hooks/usePage'
import { Pages } from '@renderer/store/reducers/WordPackSlice'
import { FC, ReactNode } from 'react'
import classes from './PageLayout.module.css'

interface PageLayoutProps {
  children?: ReactNode
  pageHeader: string
  pageName: Pages
  wordPackId?: number
  onLoad?: () => void
}

const PageLayout: FC<PageLayoutProps> = ({ children, pageHeader, pageName, wordPackId }) => {
  const pageVisible = usePage(pageName, wordPackId)

  return (
    <Popup popupVisible={pageVisible} transitionType={Transitions.SLIDE}>
      <div className={`${classes.page} styled-scrollbar`}>
        <h1>{pageHeader}</h1>
        {children}
      </div>
    </Popup>
  )
}

export default PageLayout
