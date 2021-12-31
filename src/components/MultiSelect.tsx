import { Box, FormControl, InputLabel } from '@mui/material';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import { FC, useState } from 'react';

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ISelectProps {
  label: string;
  values: string[];
  name: string;
  required?: boolean;
  reset?: boolean;
}

const MultiSelect: FC<ISelectProps> = ({
  label,
  values,
  name,
  reset = false,
  required = false,
}) => {
  const theme = useTheme();
  const [valuess, setValuess] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof valuess>) => {
    const {
      target: { value },
    } = event;
    setValuess(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const labelId = `${label}-label`;
  return (
    <FormControl required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        multiple
        labelId={labelId}
        id={`${label}-Select-Multiple`}
        value={reset ? [] : valuess}
        onChange={handleChange}
        input={
          <OutlinedInput
            id={`${label}-input`}
            name={name}
            label={label}
            value={reset && ''}
          />
        }
        renderValue={(selected) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, i) => (
                <Chip id={`${label}-chip-${i}`} key={value} label={value} />
              ))}
            </Box>
          );
        }}
        MenuProps={MenuProps}
      >
        {values.map((value) => (
          <MenuItem
            key={value}
            value={value}
            style={getStyles(value, valuess, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
