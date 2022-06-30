import React from 'react';
import GenerateSolidColors from './GenerateSolidColors';
import ImageGridComponent from './ImageGridComponent';
import GenerateTags from './GenerateTags';
import {ReactComponent as IconFavourite} from '../../assets/icons/favourite.svg';

const CardForCollection = ({collections}) => {
    return collections.map(item => {
        return (
            <div className='pb-4' key={`collections_${item.id}`}>
                <div className='collection-box grid grid-cols-1 md:grid-cols-2 bg-white'>
                    <div className='p-6 xl:p-10 relative flex items-center'>
                        <div>
                            <div className='flex gap-3'>
                                <GenerateTags tags={item.tags}/>
                            </div>
                            <h1 className='text-2xl md:text-4xl text-primaryColor font-bold mt-3 md:mt-6 mb-4 md:mb-8 md:leading-[54px]'>{item?.name}</h1>
                            <div className='flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5'>
                                <span>Designed by NITEX</span>
                                <span className='leading-none inline-block mb-2'>.</span>
                                {item?.numOfDesign && <span>{item?.numOfDesign} Styles</span>}
                            </div>
                            <div className='color-list flex gap-1 mt-10 md:mt-16'>
                                <GenerateSolidColors colors={item.colorResponseList}/>
                            </div>
                        </div>
                    </div>
                    <div className='overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white'>
                        <ImageGridComponent documentList={item.documentResponseList}/>
                        {item.isFavorite && <div
                            className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer'>
                            <span className='mt-2'>
                                <IconFavourite/>
                            </span>
                        </div>}
                    </div>
                </div>
            </div>
        )
    })
}

export default CardForCollection
