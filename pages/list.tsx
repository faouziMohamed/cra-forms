import { Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import useSWR from 'swr';

import Layout from '../components/Layout';
import type { TableData } from '../lib/lib.types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ListPage() {
  const { data, error } = useSWR<TableData, Error>('/api/members', fetcher);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  const { columns: cols, data: d } = data;
  // console.log(data);
  const columns: GridColDef[] = cols.map((col) => ({
    field: col,
    headerName: col,
    width: 150,
  }));
  const rows: GridRowsProp = d.map((row) => ({ ...row }));
  return (
    <Layout>
      <Stack className='flex grow w-full max-w-4xl px-4'>
        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </Layout>
  );
}
