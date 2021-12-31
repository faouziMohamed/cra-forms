import AddMemberForm from '../src/components/AddMemberForm';
import Layout from '../src/components/Layout';

export default function Add() {
  return (
    <Layout>
      <h1 className='text-2xl font-bold'>Saisie des informations requises</h1>
      <AddMemberForm />
    </Layout>
  );
}
