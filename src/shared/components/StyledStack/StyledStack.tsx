import { ReactNode } from 'react';
import {Stack} from '@mui/material';

interface Props {
  direction?: 'row' | 'column'
  children: ReactNode
}

export default function StyledStack ({ direction = 'row', children}: Props) {
  const isRow = direction === 'row'

  return (
    <Stack
      direction={direction}
      spacing={0}
      alignItems="center"
      display={isRow ? 'inline-flex' : 'flex'}
    >
      {children}
    </Stack>
  )
}