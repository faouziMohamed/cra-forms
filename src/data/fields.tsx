export const statusValues = ['Etudiant(e)', 'Stagiaire', 'Employé(e)', 'Autre'];

export const fields = [
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
    helperTxt: '',
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
    name: 'status',
    label: 'Status actuel',
    helperTxt: '',
    required: true,
    type: 'select',
    options: statusValues,
  },
  {
    name: 'school',
    label: 'École/Faculté',
    helperTxt: 'Ex: Faculté des sciences,...',
    required: true,
    type: 'text',
  },
];
