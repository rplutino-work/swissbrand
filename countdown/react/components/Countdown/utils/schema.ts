import { AvailablesLangs } from './index';

/** 
 * === Props ===
 * 1. active
 * 2. finalDate
 * 3. lang
 * 4. backgroundColor
 * 5. title
 * 6. description
 * 7. blockClass = https://rcapetio--corebizio.myvtex.com/
 */

export interface Props {
   active: boolean;
   finalDate: string;
   lang: AvailablesLangs;
   title: string;
   finish: string;
}

export const defaultProps: Props = {
   active: true,
   lang: 'es-es',
   finalDate: '2023-05-30T20:00',
   title: 'Ofertas imperdibles',
   finish: 'Promoción finalizada.',
};

export const schema: Schema = {
   title: 'Contador',
   type: 'object',
   properties: {
      active: {
         type: 'boolean',
         default: defaultProps.active,
         title: 'Activar/Desactivar',
      },
      finalDate: {
         type: 'string',
         format: 'date-time',
         title: 'Elegir fecha de finalización',
         widget: {
            "ui:widget": 'datetime'
         },
         default: defaultProps.finalDate,
      },
      title: {
         type: 'string',
         title: 'Titulo',
         default: defaultProps.title,
      },
      finish: {
         type: 'string',
         title: 'Texto cuando finaliza el contador',
         default: defaultProps.finish,
      }
   }
};