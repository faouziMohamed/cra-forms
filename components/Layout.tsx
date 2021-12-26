import Head from 'next/head';
import { FC } from 'react';

import Footer from './Footer';
import NavBar from './NavBar';

const Layout: FC = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen pb-2'>
      <Head>
        <title>
          Recencement des membres du CRA cellule Informatique | CRA ACEM
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar />
      <main className='flex flex-col items-center w-full flex-1 md:px-20 py-10 text-center'>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
