import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Example() {
  const [selected, setSelected] = React.useState (new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  
  return (
   <div className='h-3/4 w-3/4'>
     <DayPicker      
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
    
   </div>
  );
}




















// import React, { useState } from 'react';

// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';

// export default function Daypicker() {
//   const [selected, setSelected] = useState(new Date());

//   let footer = <p>Please pick a day.</p>;
//   if (selected) {
//     footer = <p>You picked {format(selected, 'PP')}.</p>;
//   }
//   return (
//     <DayPicker
//       mode="single"
//       selected={selected}
//       onSelect={setSelected}
//       footer={footer}
//     />
//   );
// }