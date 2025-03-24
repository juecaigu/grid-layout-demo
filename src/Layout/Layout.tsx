import React from 'react'
import GridLayout from 'react-grid-layout'
import './Layout.less'

const Layout = () => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 3, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 4 },
    { i: 'c', x: 4, y: 0, w: 8, h: 2 }
  ]
  return (
    <GridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={100}
      width={540}>
      <div key='a' className='gld-item'>
        a
      </div>
      <div key='b' className='gld-item'>
        b
      </div>
      <div key='c' className='gld-item'>
        c
      </div>
    </GridLayout>
  )
}

export default Layout
