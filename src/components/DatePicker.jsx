
import React from 'react'

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DatePicker =  ({ value, setValue, minDate, maxDate, refDate }) => {
  return (
   <>
   <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "fit-content" }}  >
                <DemoContainer
                    components={[
                        'MobileDatePicker',
                    ]}
                >
                    {/* onChange={(e)=> handleDate(e)}    */}
                    {/* <MobileDatePicker ref={refDate} sx={{ width: "fit-content", display: "none" }} maxDate={dayjs()} onChange={(e) => setSeDate(e)} value={seDate} views={['year', 'month', 'day']} /> */}
                    <MobileDatePicker  ref={refDate}
                                sx={{ width: 'fit-content', display: 'none' }}
                                maxDate={maxDate}
                                minDate={minDate}
                                onChange={(newValue) => setValue(newValue)}
                                value={value}
                                views={['year', 'month', 'day']} />
                </DemoContainer>
    </LocalizationProvider>
   
   </>
  )
}

export default DatePicker








