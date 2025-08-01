import React, { useState, useEffect } from 'react';
import CustomPagination from '../CustomPagination/CustomPagination'
import Loading from '../../components/Loading/Loading';
import axiosInstance from '../../axiosInstance/axiosInstance';


const StutentsTable = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsList = await axiosInstance.get('/api/v1')
            } catch (error) {
                console.error("error fetching", error)
            }
        }

        fetchData()
    }, [])
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="text-error p-6 bg-error/10 rounded-lg border border-error/20 m-6">{error}</div>;

    return (
        <div className='rounded-2xl p-1'>
            <div className='bg-base-100 rounded-2xl shadow-xl border border-primary/20'>
                <div className="overflow-x-auto rounded-2xl">
                    <table className="table table-zebra">
                        <thead className='bg-gradient-to-r from-primary to-secondary'>
                            <tr>
                                <th className='text-primary-content font-bold text-lg'>No</th>
                                <th className='text-primary-content font-bold text-lg'>Name</th>
                                <th className='text-primary-content font-bold text-lg'>Job</th>
                                <th className='text-primary-content font-bold text-lg'>Favorite Color</th>
                                <th className='text-primary-content font-bold text-lg'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-primary/5 transition-colors duration-200">
                                <td>
                                    <p className='border-primary border-2 p-2 w-8  h-8 rounded-full items-center roudned-full'><span className='relative left-1 bottom-1'>1</span></p>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-base-content">Hart Hagerty</div>
                                            <div className="text-sm text-base-content/60">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-base-content mb-1">Zemlak, Daniel and Leannon</div>
                                    <span className="badge badge-primary badge-sm text-primary-content p-2">Desktop Support Technician</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-accent "></div>
                                        <span className="font-medium ">Purple</span>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn btn-accent btn-sm hover:btn-accent-focus">details</button>
                                </th>
                            </tr>
                            <tr className="hover:bg-secondary/5 transition-colors duration-200">
                                <td>
                                    <p className='border-primary border-2 p-2 w-8  h-8 rounded-full items-center roudned-full'><span className='relative left-1 bottom-1'>1</span></p>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-secondary ring-offset-2 ring-offset-base-100">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-base-content">Brice Swyre</div>
                                            <div className="text-sm text-base-content/60">China</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-base-content mb-1">Carroll Group</div>
                                    <span className="badge badge-secondary badge-sm text-secondary-content">Tax Accountant</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-error"></div>
                                        <span className="font-medium">Red</span>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn btn-info btn-sm hover:btn-info-focus">details</button>
                                </th>
                            </tr>
                            <tr className="hover:bg-accent/5 transition-colors duration-200">
                                <td>
                                    <p className='border-primary border-2 p-2 w-8  h-8 rounded-full items-center roudned-full'><span className='relative left-1 bottom-1'>1</span></p>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-accent ring-offset-2 ring-offset-base-100">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-base-content">Marjy Ferencz</div>
                                            <div className="text-sm text-base-content/60">Russia</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-base-content mb-1">Rowe-Schoen</div>
                                    <span className="badge badge-accent badge-sm text-accent-content">Office Assistant I</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-error-content"></div>
                                        <span className="font-medium">Crimson</span>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn btn-success btn-sm hover:btn-success-focus">details</button>
                                </th>
                            </tr>

                            <tr className="hover:bg-info/5 transition-colors duration-200">
                                <td>
                                    <p className='border-primary border-2 p-2 w-8  h-8 rounded-full items-center roudned-full'><span className='relative left-1 bottom-1'>1</span></p>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-info ring-offset-2 ring-offset-base-100">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-base-content">Yancy Tear</div>
                                            <div className="text-sm text-base-content/60">Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-base-content mb-1">Wyman-Ledner</div>
                                    <span className="badge badge-info badge-sm text-info-content">Community Outreach Specialist</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                        <span className="font-medium">Indigo</span>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn btn-warning btn-sm hover:btn-warning-focus">details</button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex items-center justify-center my-4'>
                <CustomPagination />
            </div>
        </div>
    )
};

export default StutentsTable;