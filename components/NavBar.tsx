import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import craIcon from '../public/cra-icon.png';

const BoldText: FC<{ className?: string; color: string }> = ({
  color,
  className = '',
  children,
}) => (
  <Typography color={color} className={`${className} font-bold `}>
    {children}
  </Typography>
);

export default function NavBar() {
  return (
    <nav className='flex w-full items-center p-1 px-10 bg-[#1f9e50b9] bg-gradient-to-tl from-[#0b8600e0] via-[##b3ff00df end-[#0eac00df]'>
      <Link href='/'>
        <a className='inline-block font-extrabold'>
          <Stack
            spacing={0.7}
            direction='row'
            className='justify-between items-center relative'
          >
            <Image
              className='rounded-[50%] block grow shrink-0'
              layout='intrinsic'
              width={100}
              height={100}
              src={craIcon}
              alt='Club de recherche académique de Kénitra'
            />
            <Stack spacing={0.7}>
              <BoldText color='#48ffb9'>CRA</BoldText>
              <BoldText color='#f6ff74'>ACEM</BoldText>
              <BoldText color='#42ff52'>KENITRA</BoldText>
            </Stack>
          </Stack>
        </a>
      </Link>
    </nav>
  );
}
