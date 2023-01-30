import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BillingTableRow = ({ billInfo, refetch, index }) => {

    const handleDeletingBill = _id => {
        const agree = window.confirm('Are you sure delete this bill !!!')
        if (agree) {
            fetch(`http://localhost:5000/delete-billing/${_id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`Deleted successfully`)
                        refetch();
                    }
                })
        }
    };


    return (
        <tr key={billInfo._id} className='hover'>
            <td>{index + 1}</td>
            <td>{billInfo._id}</td>
            <td>{billInfo.name}</td>
            <td>{billInfo.email}</td>
            <td>{billInfo.phone}</td>
            <td>{billInfo.amount}</td>
            <td>
                <Link to={`/update-billing/${billInfo._id}`}>
                    <button className='btn btn-info btn-sm mr-2'>edit</button>
                </Link>

                <button onClick={() => handleDeletingBill(billInfo._id)}
                    className='btn btn-error btn-sm'>delete</button>
            </td>
        </tr>

    );
};

export default BillingTableRow;