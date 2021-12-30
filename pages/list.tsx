import { gridClasses, Stack } from '@mui/material';
import {
  DataGrid,
  frFR,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../components/Layout';
import type { TableData } from '../lib/lib.types';
import { startCaseAll } from '../lib/utils/utils';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.container}>
      <Stack direction='row' sx={{ '& *': { color: 'secondary.main' } }}>
        <GridToolbarExport />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </Stack>
    </GridToolbarContainer>
  );
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ListPage() {
  const { data, error } = useSWR<TableData, Error>('/api/members', fetcher);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  const { columns: cols, data: d } = data;
  // console.log(data);
  const columns: GridColDef[] = cols.map((col) => ({
    field: col.field,
    headerName: col.header,
    headerAlign: 'center',
    minWidth: 150,
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
  const rows: GridRowsProp = d.map((row) => ({
    ...row,
    status: startCaseAll(row.status.join(', ')),
  }));

  return (
    <Layout>
      <Stack
        className='flex grow w-full  '
        sx={{
          height: '3rem',
          '& .header-name': {
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
          },
        }}
      >
        <DataGrid
          localeText={{
            ...frFR.components.MuiDataGrid.defaultProps.localeText,
            toolbarDensity: 'Taille des colones',
            toolbarDensityCompact: 'Petit',
            toolbarDensityStandard: 'Moyen',
            toolbarDensityComfortable: 'Large',
          }}
          checkboxSelection
          rows={rows}
          columns={columns}
          density='compact'
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'secondary.dark',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.dark',
            },
          }}
          components={{
            // Toolbar: GridToolbar,
            Toolbar: CustomToolbar,
          }}
        />
      </Stack>
    </Layout>
  );
}
