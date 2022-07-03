import React from 'react';
import ImageGridComponent from '../../common/ImageGridComponent';
import { ReactComponent as IconFavourite } from '../../../assets/icons/favourite.svg';
import { ReactComponent as Favourite } from '../../../assets/icons/favouriteIcon.svg';
import GenerateSolidColors from '../../common/GenerateSolidColors';
import GenerateTags from '../../common/GenerateTags';

const ImageViewCollections = ({ collections }) => {

    const renderCollections = () => {
        return collections.map(item => {
            return (
                <div className='collection-box' key={`collections_${item.id}`}>
                    <div className='overflow-hidden relative h-[300px] sm:h-[400px] xl:h-[524px] p-4 bg-white'>
                        <ImageGridComponent documentList={item.documentResponseList} whiteOverLay={true}/>
                        <div className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer'>
                            <div>
                                <span>{item.isFavorite && <IconFavourite/>}</span>
                                <span className="mt-2">{!item.isFavorite && <Favourite/>}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col-reverse xl:flex-row justify-between items-start p-4 pt-0 bg-white'>
                        <div>
                            <h4 className='text-xl font-bold text-primaryColor'>{item?.name}</h4>
                            <div className='flex items-center text-base text-primaryColor gap-5 mt-2'>
                                <span>Designed by NITEX</span>
                                <span className='leading-none inline-block mb-2'>.</span>
                                {item?.numOfDesign &&
                                    <span>{item.numOfDesign} Styles</span>}
                            </div>
                            <div className='color-list flex gap-1 mt-5'>
                                <GenerateSolidColors colors={item.colorResponseList}/>
                            </div>
                        </div>
                        <div className='flex gap-3 mb-2 xl:mb-0'>
                            <GenerateTags tags={item.tags}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='grid sm:grid-cols-2 gap-4 py-4'>
            {renderCollections()}
        </div>
    )
}

export default ImageViewCollections
