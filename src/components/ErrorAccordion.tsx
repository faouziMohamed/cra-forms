import { ExpandMoreSharp, HorizontalRuleSharp } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  Alert,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

interface AccordionProps {
  errors: {
    key: string;
    message: string;
  }[];
}

const ErrorAccordion: FC<AccordionProps> = ({ errors }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  if (!errors.length) return null;
  const handleChange = (_event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded);
  };
  return (
    <Box className='relative w-full rounded-t'>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreSharp className='text-white' />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className='bg-[#ff1744] text-white m-0'
        >
          <Alert
            variant='filled'
            severity='error'
            className='rounded-none rounded-t p-0'
          >
            <Typography
              variant='subtitle1'
              className='font-bold text-[0.88rem]'
            >
              Quelques erreurs ont été commises!
            </Typography>
          </Alert>
        </AccordionSummary>
        <List disablePadding className='pl-2 font-bold font-mono bg-red-200'>
          {errors.map((error) => (
            <ListItem disablePadding key={error.key}>
              <ListItemIcon>
                <HorizontalRuleSharp />
              </ListItemIcon>
              <ListItemText>
                <Typography fontSize='0.9rem'> {error.message}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Accordion>
    </Box>
  );
};

export default ErrorAccordion;
