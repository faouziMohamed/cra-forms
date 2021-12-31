import { frFR, GridColDef } from '@mui/x-data-grid';

import {
  CustomPagination,
  CustomToolbar,
  StyledDataGrid,
} from './StyledDataGrid';

interface IDataGridTableProps {
  rows: readonly { [key: string]: string | Date }[];
  columns: GridColDef[];
}

export default function DataGridTable({ rows, columns }: IDataGridTableProps) {
  return (
    <StyledDataGrid
      localeText={{
        ...frFR.components.MuiDataGrid.defaultProps.localeText,
        toolbarDensity: 'Taille des colones',
        toolbarDensityCompact: 'Petit',
        toolbarDensityStandard: 'Moyen',
        toolbarDensityComfortable: 'Large',
      }}
      checkboxSelection
      disableSelectionOnClick
      pageSize={5}
      rowsPerPageOptions={[5]}
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
        Toolbar: CustomToolbar,
        Pagination: CustomPagination,
      }}
    />
  );
}
