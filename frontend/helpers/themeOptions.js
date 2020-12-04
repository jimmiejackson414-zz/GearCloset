import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { Blue6, BlueGreen6, Breeze6, Celestial6, Circuit6, Damask6, Depth6, Flow6, Forte6, Genesis6, IonBoardroom6, Kilter6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
import { Tableau10, ColorBlind10, JewelBright9, HueCircle19 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau';

const findName = index => {
  switch (index) {
    case 0:
      return 'Blue6';
    case 1:
      return 'BlueGreen6';
    case 2:
      return 'Breeze6';
    case 3:
      return 'Celestial6';
    case 4:
      return 'Circuit6';
    case 5:
      return 'Damask6';
    case 6:
      return 'Depth6';
    case 7:
      return 'Flow6';
    case 8:
      return 'Forte6';
    case 9:
      return 'Genesis6';
    case 10:
      return 'IonBoardroom6';
    case 11:
      return 'Kilter6';
    case 12:
      return 'Tableau10';
    case 13:
      return 'ColorBlind10';
    case 14:
      return 'JewelBright9';
    case 15:
      return 'HueCircle19';
    default:
      return 'Blue6';
  }
};

export const generateThemeOptions = () => {
  const office = [Blue6, BlueGreen6, Breeze6, Celestial6, Circuit6, Damask6, Depth6, Flow6, Forte6, Genesis6, IonBoardroom6, Kilter6];
  const tableau = [Tableau10, ColorBlind10, JewelBright9, HueCircle19];
  const officeOptions = office.map((option, index) => {
    return {
      text: `Theme ${index + 1}`,
      value: `office.${findName(index)}`,
      colors: [...option]
    };
  });

  const tableauOptions = tableau.map((option, index) => {
    return {
      text: `Theme ${office.length + index + 1}`,
      value: `tableau.${findName(office.length + index)}`,
      colors: option
    };
  });

  return [officeOptions, tableauOptions].flat();
};
