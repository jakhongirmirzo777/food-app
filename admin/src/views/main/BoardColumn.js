import { useState, useCallback } from 'react'

import { Box, Card, CardContent, Typography } from '@mui/material'
import { ReactSortable } from 'react-sortablejs'

import BoardCard from './BoardCard'
import useMediaQuery from '@mui/material/useMediaQuery'

const BoardColumn = ({ title, data, isLoading, onChange, borderColor = 'divider' }) => {
  const isDisabledDragging = useMediaQuery(theme => theme.breakpoints.down('md'))
  const [isDragging, setIsDragging] = useState(false)

  const handleStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <Card sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', overflow: 'initial' }}>
      <Box
        sx={{
          px: 4,
          py: 3,
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 999,
          backgroundColor: 'common.white',
          borderBottom: 2,
          borderColor: borderColor,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6
        }}
      >
        <Typography variant='body1' fontWeight={500}>
          {title} ({data.length})
        </Typography>
      </Box>
      <CardContent sx={{ mt: 1, p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <ReactSortable
          disabled={isDisabledDragging}
          group='shared'
          animation={300}
          filter='.ignoreDrag'
          preventOnFilter
          list={data}
          setList={onChange}
          onStart={handleStart}
          onEnd={handleEnd}
          className={isDragging ? 'is-dragging' : null}
          style={{
            flexGrow: 1
          }}
        >
          <>
            {isLoading && (
              <>
                <BoardCard.Skeleton />
                <BoardCard.Skeleton />
                <BoardCard.Skeleton />
              </>
            )}

            {!isLoading &&
              data.map(item => (
                <BoardCard
                  id={item.id}
                  key={item.id}
                  price={item.totalCost}
                  createdAt={item.createdAt}
                  tableNumber={item.tableNumber}
                  orderNumber={item.orderNumber}
                  status={item.status}
                />
              ))}

            {!isLoading && data.length === 0 && (
              <Box className='ignoreDrag' sx={{ textAlign: 'center' }}>
                <Typography sx={{ py: 2 }} variant='subtitle1' color='text.secondary'>
                  Buyurtmalar yoq
                </Typography>
              </Box>
            )}
          </>
        </ReactSortable>
      </CardContent>
    </Card>
  )
}

export default BoardColumn
