import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material';

export default function InputCustom(props: {
  field: {
    name: string;
    label: string;
    helperTxt: string;
    type: string;
    required: boolean;
  };
  errors: { key: string; message: string }[];
}) {
  const { field, errors } = props;
  return (
    <FormControl
      size='small'
      required={field.required}
      variant='filled'
      color='secondary'
    >
      <InputLabel htmlFor={field.name} variant='filled'>
        {field.label}
      </InputLabel>
      <FilledInput
        id={field.name}
        aria-describedby={`${field.name}-helper-text`}
        size='small'
        type={field.type}
        color='primary'
        error={errors.some((err) => err.key === field.name)}
      />
      <FormHelperText id={`${field.name}-helper-text`}>
        {field.helperTxt}
      </FormHelperText>
    </FormControl>
  );
}
