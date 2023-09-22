// @ts-nocheck
import React from 'react'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AppointmentAllStaff = () => {
    const appointment = {
        series: [100, 30, 2, 50, 10, 7],
        options: {
            chart: {
                type: 'pie',
                toolbar: {
                    show: false
                },
                parentHeightOffset: 0,
            },
            colors: ['#6CE879', '#FFCE62', '#F95356', '#FB5558', '#71CDFC', '#FFB1C1'],
            labels: ['Processing', 'Pending', 'Cancel', 'Pre Paid', 'Post Paid', 'Free'],
            stroke: {
                curve: 'smooth',
                width: 0,
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
        }
    };

    const allStaff = {
        series: [100, 30, 12, 2],
        options: {
            chart: {
                type: 'pie',
                toolbar: {
                    show: false
                },
                parentHeightOffset: 0,
            },
            colors: ['#FB5558', '#6CE879', '#EFDE96', '#DD0004'],
            labels: ['Total', 'Active', 'Inactive', 'Suspended'],
            legend: {
                show: false
            },
            stroke: {
                curve: 'smooth',
                width: 0,
            },
            dataLabels: {
                enabled: false
            },
        }
    };


    return <React.Fragment>
        <div className='flex lg:flex-row flex-col lg:space-x-6 mt-5'>
            <div className="bg-white w-full lg:w-2/4 shadow-md rounded-lg mb-4 ">
                <div className='p-4 border-b-gray-200 border-b'>
                    <h6 className='text-lg text-gray-700'>Total Appointment</h6>
                </div>
                <div className="flex md:content-between items-center flex-col lg:flex-row mt-4">
                    <div className='w-full lg:w-2/4 flex flex-col md:flex-row sm:flex-col lg:flex-col items-center'>
                        <div className='ml-5 sm:ml-10'>
                            <p className=' text-gray-600 py-3'>Status</p>
                            <div className='flex lg:flex-col flex-row flex-wrap mb-3'>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#6CE879]`}></div>
                                    <p className='text-gray-500 text-sm'>Processing - 100</p>
                                </div>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#FFCE62]`}></div>
                                    <p className='text-gray-500 text-sm'>Pending - 30</p>
                                </div>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#F95356]`}></div>
                                    <p className='text-gray-500 text-sm'>Cancel - 12</p>
                                </div>
                            </div>
                        </div>
                        <Chart
                            options={appointment.options}
                            series={appointment.series}
                            type={appointment.options.chart.type}
                            height={240}
                            width={'100%'}
                        />
                    </div>
                    <div className='w-full my-3 border lg:hidden bg-gray-300'></div>
                    <div className='w-full lg:w-2/4 flex flex-col md:flex-row sm:flex-col lg:flex-col items-center'>
                        <div className='ml-5 sm:ml-10'>
                            <p className=' text-gray-600 py-3'>Type</p>
                            <div className='flex lg:flex-col flex-row flex-wrap mb-3'>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#FB5558]`}></div>
                                    <p className='text-gray-500 text-sm'>Pre Paid - 100</p>
                                </div>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#71CDFC]`}></div>
                                    <p className='text-gray-500 text-sm'>Post Paid - 30</p>
                                </div>
                                <div className='flex items-center mb-1 mr-3'>
                                    <div className={`w-4 h-4 rounded mr-2 bg-[#FFB1C1]`}></div>
                                    <p className='text-gray-500 text-sm'>Free - 12</p>
                                </div>
                            </div>
                        </div>
                        <Chart
                            options={appointment.options}
                            series={appointment.series}
                            type={appointment.options.chart.type}
                            height={240}
                            width={'100%'}
                        />
                    </div>
                </div>
                <div className='my-6 text-sm flex w-full items-center justify-center'>
                    <button className='py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full'>
                        Show all
                    </button>
                </div>
            </div>
            <div className="relative w-full bg-white lg:w-2/4 shadow-md rounded-lg mb-4">
                <div className='p-4 border-b-gray-200 border-b'>
                    <h6 className='text-lg text-gray-700'>All Staff</h6>
                </div>
                <div className='flex flex-col md:flex-row sm:flex-col lg:flex-row items-center mt-5'>
                    <div className='ml-5 sm:ml-10 mb-4 sm:mb-0 lg:w-2/5'>
                        <p className=' text-gray-600 py-3'>Staff</p>
                        <div className='flex lg:flex-col flex-row flex-wrap mb-3'>
                            <div className='flex items-center mb-1 mr-3'>
                                <div className={`w-4 h-4 rounded mr-2 bg-[#FB5558]`}></div>
                                <p className='text-gray-500 text-sm'>Total - 100</p>
                            </div>
                            <div className='flex items-center mb-1 mr-3'>
                                <div className={`w-4 h-4 rounded mr-2 bg-[#6CE879]`}></div>
                                <p className='text-gray-500 text-sm'>Active - 30</p>
                            </div>
                            <div className='flex items-center mb-1 mr-3'>
                                <div className={`w-4 h-4 rounded mr-2 bg-[#EFDE96]`}></div>
                                <p className='text-gray-500 text-sm'>Inactive - 12</p>
                            </div>
                            <div className='flex items-center mb-1 mr-3'>
                                <div className={`w-4 h-4 rounded mr-2 bg-[#DD0004]`}></div>
                                <p className='text-gray-500 text-sm'>Suspended - 02</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-3/5 mb-3 sm:mb-0'>
                        <Chart
                            options={allStaff.options}
                            series={allStaff.series}
                            type={allStaff.options.chart.type}
                            height={280}
                            width={'100%'}
                        />
                    </div>
                </div>
                <div className='my-7 lg:absolute relative bottom-4 mb-2 text-sm flex w-full items-center justify-center'>
                    <button className='py-2 px-5 text-gray-500 border border-gray-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition rounded-full'>
                        Show all
                    </button>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default AppointmentAllStaff;