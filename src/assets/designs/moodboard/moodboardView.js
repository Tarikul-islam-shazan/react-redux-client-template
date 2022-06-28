import React from 'react'
import { ReactComponent as FilterIcon } from '../../icons/Filter-24.svg'
import { ReactComponent as AddIcon } from '../../icons/add-white.svg'
import { ReactComponent as CloseIcon } from '../../icons/close.svg'
import { ReactComponent as TickIcon } from '../../icons/tick.svg'
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg'

const Boilarplate = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='common-moodboard-container'>
            {/* Moodboard Information */}
            <div className='moodboard-information'>
                <div className='left-half'>
                    <div className='title'>
                        <div className='input-group'>
                            <label htmlFor='name' className='label'>
                                Title
                            </label>
                            <input
                                type='text'
                                className='form-field'
                                id='name'
                                placeholder='Enter Name'
                                name='name'
                            />
                        </div>
                    </div>
                    <div className='description'>
                        <div className='input-group'>
                            <label htmlFor='name' className='label'>
                                Description
                            </label>
                            <textarea
                                class='form-field'
                                placeholder='Write Here ...'
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className='right-half'>
                    <button
                        type='button'
                        class='btn flex items-center float-right'
                    >
                        <span>
                            Ask <strong>Collection</strong>
                        </span>
                        <span class='ml-2'>
                            <AddIcon />
                        </span>
                    </button>
                </div>
            </div>

            {/* Moodboard and image layout */}
            <div className='moodboard-and-images-layout'>
                <div className='left-half'>
                    <div className='moodboard-tab'>
                        <ul>
                            <li className='active'>Moodboard</li>
                            <li>Images</li>
                        </ul>
                    </div>

                    {/* Full moodboard image */}
                    {/* <div className='full-moodboard-image'>
                        <img
                            src='/images/moodboard/moodboard.jpg'
                            alt='moodboard'
                        />
                    </div> */}

                    {/* Images layout */}
                    <div className='moodboard-masonry-container'>
                        <div className='masonry-item add-item'>
                            <span className=''>+</span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/1.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/2.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/3.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/4.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/3.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/2.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/3.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/2.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                        <div className='masonry-item'>
                            <img src='/images/products/1.jpg' alt='product' />
                            <span className='delete'>
                                <DeleteIcon />
                            </span>
                        </div>
                    </div>
                </div>
                <div className='right-half'>
                    {/* Moodboard colors */}
                    <div className='moodboard-color-container'>
                        <div className='color-single-item'>
                            <div className='add-color'>
                                <span>+</span>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#00f851' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#B08574' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#B08574' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#3B3738' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#16505B' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#6FA7B8' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                        <div className='color-single-item'>
                            <div
                                className='color-view'
                                style={{ background: '#B7B548' }}
                            >
                                <span className='close'>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='color-info'>
                                <div className='color-code'>TCX 16-1288</div>
                                <div className='color-name'>Dark Blue</div>
                            </div>
                        </div>
                    </div>
                    {/* Moodboard fabrics */}
                    <div className='moodboard-fabric-container'>
                        <h3>Fabrics</h3>

                        {/* Selcted Fabrics */}
                        <div className='fabric-filter'>
                            <p>
                                Suggested <span>Fabrics</span>
                            </p>
                            <span>
                                <FilterIcon />
                            </span>
                        </div>
                        <div className='fabric-all-items'>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric1.png'
                                        alt='fabric'
                                    />
                                    <span className='close'>
                                        <CloseIcon />
                                    </span>
                                </div>

                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric2.png'
                                        alt='fabric'
                                    />
                                    <span className='close'>
                                        <CloseIcon />
                                    </span>
                                </div>
                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                        </div>

                        {/* Suggested Fabrics */}
                        <div className='fabric-filter top-border'>
                            <p>
                                Suggested <span>Fabrics</span>
                            </p>
                            <span>
                                <FilterIcon />
                            </span>
                        </div>
                        <div className='fabric-all-items'>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric2.png'
                                        alt='fabric'
                                    />
                                    <span className='select'>
                                        <TickIcon />
                                    </span>
                                </div>

                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric1.png'
                                        alt='fabric'
                                    />
                                    <span className='select'>
                                        <TickIcon />
                                    </span>
                                </div>
                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric3.png'
                                        alt='fabric'
                                    />
                                    <span className='select'>
                                        <TickIcon />
                                    </span>
                                </div>
                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                            <div className='fabric-single-item'>
                                <div className='fabric-image'>
                                    <img
                                        src='/images/moodboard/fabric1.png'
                                        alt='fabric'
                                    />
                                    <span className='select'>
                                        <TickIcon />
                                    </span>
                                </div>
                                <p>Single Jersey CO(35%), PL(65%)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boilarplate //change the Boilarplate name to your specified name
