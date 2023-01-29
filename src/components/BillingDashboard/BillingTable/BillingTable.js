import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Loading/Loading';


const BillingTable = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [bill, setBill] = useState([]);
    const [loading, setLoading] = useState(false);



    const { data: allBillList = [], isLoading } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/billing-list`)
                const data = await res.json();
                return data;
            }
            catch (err) {
                console.log(err);
            }
        }
    })



    const handleAddProduct = data => {
        setLoading(true);

        if (data.filter === "name") {
            const filterName = allBillList?.filter(bill => bill.name === data.inputValue);
            setBill(filterName);
            setLoading(false);
        }
        if (data.filter === "email") {
            const filterEmail = allBillList?.filter(bill => bill.email === data.inputValue);
            setBill(filterEmail);
            setLoading(false);
        }
        if (data.filter === "phone") {
            const filterPhone = allBillList?.filter(bill => bill.phone === data.inputValue);
            setBill(filterPhone);
            setLoading(false);
        }

    };

    // console.log(bill);
    // console.log(allBillList);

    if (isLoading || loading) {
        return <Loading></Loading>
    };


    return (
        <div className='mx-5 md:mx-14 my-14'>
            <div className='flex justify-between bg-gray-300 p-2 rounded mb-8 flex-wrap'>
                <div className='flex justify-center items-center'>

                    <form onSubmit={handleSubmit(handleAddProduct)}>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                            <div className="form-control max-w-xs md:mr-5 mb-1 lg:mb-0">
                                <select {...register('filter')}
                                    className="select select-md border border-gray-300 max-w-xs">
                                    <option disabled defaultValue >Filter Billing</option>
                                    <option value='name'>Name</option>
                                    <option value='email'>Email</option>
                                    <option value='phone'>Phone</option>
                                </select>
                            </div>

                            <div className="form-control max-w-x md:mr-1 col-span-2 mb-1 lg:mb-0">
                                <input type="text" {...register('inputValue', {
                                    required: "Please enter your search keyword"
                                })} className="input input-group-md input-bordered  w-full " placeholder="Search" />
                                {errors.inputValue && <p className='text-red-600'>{errors.inputValue.message}</p>}
                            </div>

                            <input className='btn mb-1 lg:mb-0 md:w-20  bg-yellow-400 hover:bg-yellow-500 text-black border-none' type="submit" value='Search' />
                        </div>
                    </form>
                </div>
                <button className='btn btn-success'>add new bill</button>
            </div>

            {allBillList?.length && !bill.length ?

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Billing ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allBillList?.map((billInfo) => <tr key={billInfo._id} className='hover'>
                                    <td>{billInfo._id}</td>
                                    <td>{billInfo.name}</td>
                                    <td>{billInfo.email}</td>
                                    <td>{billInfo.phone}</td>
                                    <td>{billInfo.amount}</td>
                                    <td>
                                        <button className='btn btn-info btn-sm mr-2'>edit</button>
                                        <button className='btn btn-error btn-sm'>delete</button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                :
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Billing ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                bill?.map((billInfo) => <tr key={billInfo._id} className='hover'>
                                    <td>{billInfo._id}</td>
                                    <td>{billInfo.name}</td>
                                    <td>{billInfo.email}</td>
                                    <td>{billInfo.phone}</td>
                                    <td>{billInfo.amount}</td>
                                    <td>
                                        <button className='btn btn-info btn-sm mr-2'>edit</button>
                                        <button className='btn btn-error btn-sm'>delete</button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            }


        </div>
    );
};

export default BillingTable;