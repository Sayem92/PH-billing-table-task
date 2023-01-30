import { Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const AddBillingModal = ({ refetch, setModal }) => {
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [value, setValue] = React.useState(dayjs('2023-01-29'));


    const handleAddBill = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const emailLowercase = email.toLowerCase();
        const amount = form.amount.value;
        const phone = form.phone.value;
        const phoneNo = /^\d{11}$/;

        if (!form.phone.value.match(phoneNo)) {
            setPhoneNumberError('Please enter 11 digits of number');
            return toast.error("Please enter a valid phone number");
        } else {
            setPhoneNumberError('');
        }

        const newBill = {
            name,
            email: emailLowercase,
            amount,
            phone,
            date: value.$d
        };

        fetch(`https://billing-page-task-server.vercel.app/add-billing`, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(newBill)
        })
            .then(res => res.json())
            .then(data => {
                // console.log("add new bill", data);
                toast.success('Add a new bill successfully!');
                refetch();
                setModal('close');
            })


    };


    return (
        <div>
            <input type="checkbox" id="add-billing-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-billing-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl text-center font-bold ">Add A New Bill</h3>

                    <form onSubmit={handleAddBill}
                        className='grid grid-cols-1 gap-3 mt-5 '>

                        <input name='name' type="text" placeholder="full name" className="input w-full  input-bordered border-gray-400  font-semibold" required />

                        <input name='email' type="email" placeholder="Email Address" className="input w-full input-bordered border-gray-400 font-semibold lowercase" required />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DatePicker
                                    disableFuture
                                    label="Create date"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                        <input name='amount' type="number" placeholder="payable amount" className="input w-full input-bordered border-gray-400 font-semibold " required />

                        <input name='phone' type="number" placeholder="enter phone number" className="input w-full input-bordered border-gray-400 font-semibold" required />
                        <p className='text-red-500 mt-0'>{phoneNumberError}</p>


                        <input type="submit" placeholder='Submit' className='btn btn-success w-full ' />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBillingModal;