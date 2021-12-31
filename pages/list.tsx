import { AddBox } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import Link from 'next/link';
import useSWR from 'swr';

import DataGridTable from '../src/components/DataGridTable';
import Layout from '../src/components/Layout';
import type { TableData } from '../src/lib/lib.types';
import { startCaseAll } from '../src/lib/utils/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListPage() {
  const { data, error } = useSWR<TableData, Error>('/api/members', fetcher);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  const { columns: cols, data: fetchedData } = data;
  const columns: GridColDef[] = cols.map((col) => ({
    field: col.field,
    headerName: col.header,
    headerAlign: 'center',
    minWidth: 150,
    flex: 1,
    description: col.header,
    headerClassName: 'header-name',
    renderCell: (params: GridRenderCellParams<string>) => {
      return params.field === 'email' ? (
        <Link href={`mailto:${params.value}`}>
          <a className='underline'>{params.value}</a>
        </Link>
      ) : (
        <span>{params.value}</span>
      );
    },
  }));
  const rows: GridRowsProp = fetchedData.map((row) => ({
    ...row,
    status: startCaseAll(row.status.join(', ')),
  }));

  return (
    <Layout>
      <Stack
        className='flex grow w-full  '
        sx={{
          height: '3rem',
          '& .MuiDataGrid-columnHeadersInner': {
            backgroundColor: 'secondary.main',
            color: 'white',
          },
        }}
        spacing={1}
      >
        <Box className='flex justify-center items-center'>
          <Button
            variant='contained'
            startIcon={<AddBox />}
            color='success'
            sx={{ backgroundColor: 'primary.main' }}
            // className='bg-green-500 text-[#111]'
          >
            Ajouter un membre
          </Button>
        </Box>
        <DataGridTable rows={rows} columns={columns} />
      </Stack>
    </Layout>
  );
}
