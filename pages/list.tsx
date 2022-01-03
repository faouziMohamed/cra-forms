import { AddBox } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import Link from 'next/link';
import useSWR from 'swr';

import DataGridTable from '@/components/DataGridTable';
import Layout from '@/components/Layout';
import type { TableData } from '@/lib/lib.types';
import { startCaseAll } from '@/utils/utils';

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
      if (params.field === 'email') {
        return (
          <Link href={`mailto:${params.value}`}>
            <a className='underline'>{params.value}</a>
          </Link>
        );
      }
      if (params.field === 'adhesionDate') {
        return (
          <span>
            {params.value
              ? new Date(params.value).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Non disponible'}
          </span>
        );
      }
      if (params.field === 'joined') {
        return <span>{params.value ? 'Oui' : 'Non'}</span>;
      }
      return <span>{params.value}</span>;
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
            sx={{
              '&.MuiButton-contained': {
                backgroundColor: 'secondary.dark',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                },
              },
            }}
          >
            Ajouter un membre
          </Button>
        </Box>
        <DataGridTable rows={rows} columns={columns} />
      </Stack>
    </Layout>
  );
}
