import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// Propriétés pour le menu déroulant
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Liste des noms à afficher dans le sélecteur
const names = [
  'Ethereum (ETH)',
  'NFT',
  'Binance Coin (BNB)',
];

// Fonction pour déterminer le style d'un élément de menu
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// Composant principal
const SelectBlockchain = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [open, setOpen] = React.useState(false); // État pour contrôler l'ouverture du sélecteur

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // En cas de remplissage automatique, on obtient une valeur sous forme de chaîne
      typeof value === 'string' ? value.split(',') : value,
    );

    // Ferme le menu après sélection
    setOpen(false);
  };

  return (
    <div>
      <FormControl sx={{ height: 30, width: 200 }}> {/* Réduit la largeur */}
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          onOpen={() => setOpen(true)} // Ouvre le menu
          onClose={() => setOpen(false)} // Ferme le menu
          input={
            <OutlinedInput
              sx={{
                height: '30px',
                padding: '0 8px', // Réduit la hauteur de l'input
                color: 'white', // Texte en blanc
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Bordure blanche par défaut
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Bordure blanche au survol
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Bordure blanche au focus
                },
                '&::placeholder': {
                  color: 'white', // Placeholder en blanc
                  opacity: 1, // Assurez-vous qu'il est opaque
                },
              }}
            />
          }
          renderValue={(selected) => {
            if (selected.length === 0) {
              return 'select Blockchain'; 
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {!open && ( // Affiche le placeholder seulement si le menu n'est pas ouvert
            <MenuItem disabled value="">
              <span style={{ color: 'white' }}>select Blockchain</span> {/* Placeholder non cliquable en blanc */}
            </MenuItem>
          )}
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              onClick={() => setOpen(false)} // Ferme le menu lors d'un clic sur un élément
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBlockchain;
