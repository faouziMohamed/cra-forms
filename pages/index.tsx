import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className='text-2xl font-bold'>
        Formulaire de recencement des membres du{' '}
        <a className='text-[#148a0a]' href='https://cra-acem.tech'>
          CRA
        </a>{' '}
        cellule{' '}
        <a className='text-[#148a0a]' href='https://nextjs.org'>
          Informatique
        </a>
      </h1>

      <p className='mt-3 text-xl'>
        Vous pouvez choisir de voir la liste des membres ou ajouter votre nom
        sur la liste des membres
      </p>

      <PageBody />
    </Layout>
  );
};

export default Home;
export function PageBody() {
  const actions = [
    {
      label: 'Ajouter un membre',
      href: '/add',
      description: 'Ajouter vos détails sur la liste des membres',
    },
    {
      label: 'Liste des membres',
      href: '/list',
      description: 'Voir la liste des membres qui sont déjà inscrits',
    },
  ];
  return (
    <Box className='flex flex-wrap gap-6 items-center justify-around max-w-4xl mt-6 sm:w-full'>
      {actions.map((action) => (
        <Link href={action.href} key={action.label}>
          <a className='grow sm:grow-0 flex flex-col gap-2 p-6 text-left border sm:w-96 rounded-xl hover:text-[#25751d] focus:text-[#25751d]'>
            <h3 className='text-2xl font-bold'>{action.label} &rarr;</h3>
            <small className='text-[.75rem] font-bold text-[#49494d]'>
              {action.description}
            </small>
          </a>
        </Link>
      ))}
    </Box>
  );
}
