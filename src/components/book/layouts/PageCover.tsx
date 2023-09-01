import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const PageCover: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="page-content">
      <h2>{children}</h2>
    </div>
  )
}

export default PageCover
