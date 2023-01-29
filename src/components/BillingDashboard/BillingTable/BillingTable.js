import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import AddBillingModal from '../AddBillingModal/AddBillingModal';
import BillingTableRow from './BillingTableRow';


const BillingTable = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [bill, setBill] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(null);



    const { data: allBillList = [], isLoading, refetch } = useQuery({
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
        // else {
        //     console.log(data.filter, data.inputValue);
        //     toast.error('Filter type are not matching with search field');
        // }

    };


    // const handleDeletingBill = _id => {
    //     const agree = window.confirm('Are you sure delete this bill !!!')
    //     if (agree) {
    //         fetch(`http://localhost:5000/delete-billing/${_id}`, {
    //             method: "DELETE"
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.deletedCount > 0) {
    //                     toast.success(`Deleted successfully`)
    //                     refetch();
    //                 }
    //             })
    //     }
    // };

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
                <label htmlFor="add-billing-modal"
                    onClick={() => setModal('open')} className='btn btn-success'>add new bill</label>
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
                                allBillList?.map((billInfo) => 
                                <BillingTableRow key={billInfo._id} billInfo={billInfo} refetch={refetch}></BillingTableRow>)
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
                                bill?.map((billInfo) => <BillingTableRow key={billInfo._id} billInfo={billInfo} refetch={refetch}></BillingTableRow>)
                            }

                        </tbody>
                    </table>
                </div>

            }

            {
                modal === 'open' && <AddBillingModal refetch={refetch} setModal={setModal}></AddBillingModal>
            }
        </div>
    );
};

export default BillingTable;