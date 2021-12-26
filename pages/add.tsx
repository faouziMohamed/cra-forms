import { SaveRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
} from '@mui/material';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';

import ErrorAccordion from '../components/ErrorAccordion';
import Layout from '../components/Layout';
import { Data } from '../lib/lib.types';
import { postData, validateEmail } from '../lib/utils/utils';

export default function Add() {
  return (
    <Layout>
      <h1 className='text-2xl font-bold'>Saisie des informations requises</h1>
      <MUICustomForm />
    </Layout>
  );
}
interface FormFieldValues {
  name: { value: string };
  email: { value: string };
  formation: { value: string };
  studyLevel: { value: string };
  school: { value: string };
}

interface LikelyErrorOrSuccess {
  error: string;
  message: string;
}

function MUICustomForm() {
  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    const formErrors: { key: string; message: string }[] = [];
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & FormFieldValues;
    const { name, email, formation, studyLevel, school } = target;
    if (
      !name.value ||
      !email.value ||
      !formation.value ||
      !studyLevel.value ||
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
      return;
    }
    setErrors([]);
    const data = {
      name: name.value,
      email: email.value,
      formation: formation.value,
      studyLevel: studyLevel.value,
      school: school.value,
    };

    const { error, message } = (await postData<Data>(
      '/api/members/add',
      data,
    )) as LikelyErrorOrSuccess;

    setLoading(false);
    if (error) {
      setErrors([{ key: 'fetch', message: error }]);
    }
    if (message) {
      formRef.current?.reset();
    }
  }, []);
  const fields = [
    {
      name: 'name',
      label: 'Nom et Prénom',
      helperTxt: '',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Adresse Email',
      helperTxt: 'Votre Email restera privée',
      required: true,
      type: 'email',
    },
    {
      name: 'formation',
      label: 'Formation',
      helperTxt: '',
      required: true,
      type: 'text',
    },
    {
      name: 'studyLevel',
      label: "Niveau d'étude",
      helperTxt: 'Licence, Master, Doctorat ou autre',
      required: true,
      type: 'text',
    },
    {
      name: 'school',
      label: 'École/Faculté',
      helperTxt: 'Ex: Faculté des sciences,...',
      required: false,
      type: 'text',
    },
  ];

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
        {fields.map((field) => (
          <FormControl
            size='small'
            key={field.name}
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
        ))}
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
