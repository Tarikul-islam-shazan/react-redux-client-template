import React from 'react'

import SelectComponent from '../../../app/common/SelectComponent'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as SearchIconWhite } from '../../../assets/images/search-white.svg'
import { ReactComponent as OkWhite } from '../../../assets/images/ok-white.svg'
import { ReactComponent as Refresh } from '../../../assets/images/refresh.svg'

const FabricFilter = (props) => {
    const toClose = props.toClose
    return (
        <div className='common-filter-popup absolute left-0 top-80 w-[435px] bg-white shadow-lg'>
            <div className='color-popup-header flex justify-between p-5 bg-[#F5F5F5]'>
                <h5 className='font-bold uppercase'>Filter Fabric</h5>
                <span>
                    <CloseIcon
                        onClick={(e) => {
                            toClose(e)
                        }}
                    />
                </span>
            </div>
            <div className='common-color-popup-body p-5'>
                <div className='flex'>
                    <input
                        type='text'
                        className='form-field w-full border border-primaryColor  p-2 px-4'
                        id='name'
                        placeholder='Search ...'
                        name='name'
                    />
                    <button
                        type='button'
                        className='btn w-[60px] min-w-[60px] flex items-center justify-center p-2'
                    >
                        <SearchIconWhite />
                    </button>
                </div>

                <div className='mt-5'>
                    <div className='input-group select-bg-gray-style w-full'>
                        <SelectComponent
                            options={[
                                {
                                    label: 'See Samples',
                                    value: 'NITEX/BO/1212'
                                },
                                {
                                    label: 'Country 1',
                                    value: 'NITEX/BO/1212'
                                },
                                {
                                    label: 'Country 2',
                                    value: 'NITEX/BO/1212'
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='input-group select-bg-gray-style w-full'>
                        <SelectComponent
                            options={[
                                {
                                    label: 'See Samples',
                                    value: 'NITEX/BO/1212'
                                },
                                {
                                    label: 'Country 1',
                                    value: 'NITEX/BO/1212'
                                },
                                {
                                    label: 'Country 2',
                                    value: 'NITEX/BO/1212'
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='input-group w-full'>
                        <div>
                            <label
                                htmlFor='points'
                                className='w-full block mb-3'
                            >
                                GSM
                            </label>
                            <input
                                type='range'
                                id='points'
                                name='points'
                                min={0}
                                max={100}
                                className='w-full block'
                            />
                        </div>
                    </div>
                </div>
                <div className='modal-footer mt-5 flex justify-end gap-4'>
                    <button
                        type='button'
                        className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                    >
                        <Refresh />
                    </button>
                    <button
                        type='button ='
                        className='btn w-full flex justify-between items-center'
                    >
                        <span>Apply</span>
                        <span className='ml-2'>
                            <OkWhite />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FabricFilter
