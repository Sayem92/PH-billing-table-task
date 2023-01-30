import { Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';



const UpdateBilling = () => {
    const { name, email, amount, date, phone } = useLoaderData();
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [value, setValue] = React.useState(dayjs(date));
    const navigate = useNavigate();

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

        const updateBill = {
            name,
            email: emailLowercase,
            amount,
            phone,
            date: value.$d
        };

        fetch(`https://billing-page-task-server.vercel.app/update-billing`, {
            method: "PUT",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updateBill)
        })
            .then(res => res.json())
            .then(data => {
                // console.log("update a new bill", data);
                toast.success('Update a new bill successfully!');
                navigate('/billingTable');

            });


    };


    return (
        <div>
            <div className='pr-1 py-10 md:w-96 mx-auto '>
                <div className='md:w-96 p-7 shadow-2xl mx-2 rounded-md'>
                    <h2 className="text-3xl text-center font-semibold">Update A Bill</h2>
                    <form onSubmit={handleAddBill}
                        className='grid grid-cols-1 gap-3 mt-5'>

                        <input name='name' defaultValue={name} type="text" placeholder="full name" className="input w-full  input-bordered border-gray-400  font-semibold" required />

                        <input name='email' readOnly defaultValue={email} type="email" placeholder="Email Address" className="input w-full input-bordered border-gray-400 font-semibold lowercase hover:cursor-not-allowed" required />

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

                        <input name='amount' defaultValue={amount} type="number" placeholder="payable amount" className="input w-full input-bordered border-gray-400 font-semibold " required />

                        <input name='phone' defaultValue={phone} type="number" placeholder="enter phone number" className="input w-full input-bordered border-gray-400 font-semibold" required />
                        <p className='text-red-500 mt-0'>{phoneNumberError}</p>


                        <div className='flex justify-between'>
                            <input type="submit" placeholder='Submit' className='btn btn-success' />

                            <Link to='/billingTable'>
                                <button className='btn bg-yellow-300 hover:bg-yellow-400 border-none text-black '>Back</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateBilling;