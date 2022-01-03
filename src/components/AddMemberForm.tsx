import { SaveRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';

import { useLovelySwitchStyles } from '@/themes/LovelySwitch';
import { postData, validateEmail } from '@/utils/utils';

import { fields } from '../data/fields';
import ErrorAccordion from './ErrorAccordion';
import InputCustom from './InputCustom';
import MultiSelect from './MultiSelect';

interface FormFieldValues {
  name: { value: string };
  email: { value: string };
  formation: { value: string };
  studyLevel: { value: string };
  status: { value: string };
  school: { value: string };
  joined: { checked: boolean };
}
interface IFormData {
  name: string;
  email: string;
  formation: string;
  studyLevel: string;
  status: string[];
  school?: string;
  joined: boolean;
}
interface LikelyErrorOrSuccess {
  error: string;
  message: string;
}
export default function AddMemberForm() {
  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const lovelyStyles = useLovelySwitchStyles();
  const [toggle, setToggle] = useState(false);
  const onSubmit = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    const formErrors: { key: string; message: string }[] = [];
    e.preventDefault();
    setLoading(true);
    setReset(false);

    const target = e.target as typeof e.target & FormFieldValues;
    const {
      name,
      email,
      formation,
      studyLevel,
      status,
      school,
      joined = { checked: false },
    } = target;
    if (
      !name.value ||
      !email.value ||
      !formation.value ||
      !studyLevel.value ||
      !status.value ||
      !school.value
    ) {
      formErrors.push({
        key: 'fields',
        message: 'Veuillez remplir tous les champs',
      });
    }
    if (email.value && !validateEmail(email.value)) {
      formErrors.push({
        key: 'email',
        message: "Votre email n'est pas valide",
      });
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }
    setErrors([]);
    const data = {
      name: name.value,
      email: email.value,
      formation: formation.value,
      studyLevel: studyLevel.value,
      status: status.value.toLowerCase().split(','),
      school: school.value,
      joined: joined.checked,
    };

    const { error, message } = (await postData<IFormData>(
      '/api/members/add',
      data,
    )) as LikelyErrorOrSuccess;

    setLoading(false);
    if (error) {
      setErrors([{ key: 'fetch', message: error }]);
    }
    if (message) {
      formRef.current?.reset();
      setReset(true);
      setReset(false);
    }
  }, []);

  return (
    <Box
      component='form'
      className='flex flex-col gap-5 w-11/12 xs:w-[26rem] border border-gray-400 border-solid rounded-lg p-3'
      autoComplete='on'
      onSubmit={onSubmit}
      ref={formRef}
    >
      <ErrorAccordion errors={errors} />
      <Stack spacing={0.5} direction='column'>
        {fields.map((field) => {
          return field.type === 'select' ? (
            <MultiSelect
              values={field.options!}
              label={field.label}
              key={field.name}
              name={field.name}
              required={field.required}
              reset={reset}
            />
          ) : (
            <InputCustom field={field} errors={errors} key={field.name} />
          );
        })}
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                classes={lovelyStyles}
                name='joined'
                checked={toggle}
                id='joined'
                onChange={(e) => setToggle(e.target.checked)}
              />
            }
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            label='A compléter son adhésion'
          />
        </FormControl>
      </Stack>
      <Box className='relative flex justify-center items-center'>
        <Button
          variant='contained'
          color='secondary'
          className='grow text-white bg-[#015255] hover:bg-[#007d82] hover:text-white hover:scale-[1.01]'
          startIcon={<SaveRounded />}
          type='submit'
          disabled={loading}
        >
          Enregistrer les données
        </Button>
        {loading && (
          <CircularProgress size={26} className='absolute text-[#4caf50]' />
        )}
      </Box>
    </Box>
  );
}
