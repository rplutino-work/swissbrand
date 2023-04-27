import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { Props , schema, defaultProps } from './utils/schema'
import { useCssHandles } from 'vtex.css-handles'

import { languages } from './utils';

const CSS_HANDLES = [
   'wrapper',
   'container',
   'containerfinish',
   'title',
   'titlefinish',
   'text',
   'textfinish',
   'timmer',
   'time',
   'days',
   'hours',
   'minutes',
   'seconds',
   'value',
   'label',
   'separator'
 ] as const

const Countdown: VTEXCustomComponent<Props> = ({ 
   active, title, finalDate, finish, lang
}) => {

   const handles = useCssHandles(CSS_HANDLES)

   if(!active) return null;

   const { daysSTR, hoursSTR, minutesSTR, secondsSTR, active: timerActive} = useTimer(finalDate);
   const currentlang = languages.find(item => item.lang == lang);

   if(!timerActive) {
      return(
         <div className={`${handles.container} ${handles.containerfinish}`}>
            <p 
               className={`${handles.titlefinish}`}
               dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className={`${handles.textfinish}`} dangerouslySetInnerHTML={{ __html: finish }} />
         </div>
      );
   }

   const items = [
      {
         value: daysSTR,
         label: currentlang?.days ?? 'Days'
      },
      {
         value: hoursSTR,
         label: currentlang?.hours ?? 'Hours'
      },
      {
         value: minutesSTR,
         label: currentlang?.minutes ?? 'Minutes'
      },
      {
         value: secondsSTR,
         label: currentlang?.seconds ?? 'Seconds'
      }
   ];

   return(
      <div className={`${handles.wrapper} flex flex-row items-center justify-center`}>
         <div className={`${handles.container} flex flex-row items-center justify-center`}>
            <h2 
               className={`${handles.title}`}
               dangerouslySetInnerHTML={{ __html: title }}
            />
         </div>

         <div className={`${handles.timmer} flex flex-row items-center justify-center`}>
            {
               items.map((item, index) =>(
                  <div className={`${handles.time} flex flex-column items-center`} key={String(index)}>
                        <p className={`${handles.value} mv0`}>{item.value}</p>
                        <p className={`${handles.label} mv0`}>{item.label}</p>
                  </div>
               ))
            }
         </div>
      </div>
   );
};

Countdown.defaultProps = defaultProps;
Countdown.schema = schema;

export default Countdown;