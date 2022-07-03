import React, { useEffect, useState } from 'react'
import SelectComponent from '../../common/SelectComponent'
import SliderWrapper from '../../common/SliderWrapper'
import { ReactComponent as IconRightArrow } from '../../../assets/icons/rightArrow.svg'
import Http from '../../services/Http'
import { toast } from 'react-toastify'
import MaterialBasedProduct from '../../common/MaterialBasedProduct'
import { useDispatch } from 'react-redux'
import MaterialThunks from '../../redux_toolkit/Home/MaterialThunks'
import { GET_MATERIAL_LIST_BY_FABRIC_TYPE } from '../../redux_toolkit/@types/thunk.types'
import { useMaterialSelector } from '../../redux_toolkit/Home'

const fabricOptions = [
  { label: 'Premium Fabric Base', value: 'PREMIUM' },
  { label: 'Seasonal Fabric Base', value: 'SEASONAL' },
  { label: 'Core Fabric Base', value: 'CORE' }
]

const FabricWiseProduct = () => {
  const [loader, setLoader] = useState(false)
  const [products, setProducts] = useState([])
  const [unUsedTags, setUnUsedTags] = useState([])
  const [selectedFabric, setSelectedFabric] = useState({ label: 'Premium Fabric Base', value: 'PREMIUM' })
  const dispatch = useDispatch()
  const materials = useMaterialSelector()

  useEffect(() => {
    if (materials?.data.length > 0) {
      let tags = []
      let uTags = []
      for (let material of materials.data) {
        let tagList = material.tagResponseList
        if (tagList.length > 0) {
          uTags.push(tagList[0].text)
          for (let i = 1; i < tagList.length; i++) {
            if (!uTags.includes(tagList[i].text)) {
              tags.push(tagList[i].text)
            }
          }
        }
      }
      setUnUsedTags(tags)
    }
  }, [materials])

  useEffect(() => {
    let postData = {
      params: '?sort=id,desc&size=100',
      fabricType: selectedFabric
    }
    dispatch(MaterialThunks[GET_MATERIAL_LIST_BY_FABRIC_TYPE](postData))
  }, [selectedFabric])


  const fetchProductByMaterialId = (materialId) => {
    setLoader(true)
    Http.GET('fetchProductByMaterials', `?materialId=${materialId}&sort=id,desc&size=10`).then(({ data }) => {
      setProducts(data.productResponseList)
      setLoader(false)
    }).catch((error) => {
      setLoader(false)
      toast.error(error.response.data.message)
    })
  }

  const handleFabricChange = (option) => {
    setSelectedFabric(option)
  }

  const getFirstTag = (tagResponseList) => {
    let value = ''
    if (tagResponseList && tagResponseList.length > 0) {
      value = tagResponseList[0].text
    }
    return value
  }

  const renderSliderContent = () => {
    if (materials?.data.length > 0) {
      return materials.data.map(item => {
        return (
          <div key={`materials_${item.materialId}`} onClick={() => fetchProductByMaterialId(item.materialId)}>
            <div className='bg-white p-3 m-3 relative'>
              <img src={item?.documentPath} alt='' />
              <div className='flex items-center py-4 pb-3 uppercase'>
                <span>{item?.fabricType}</span>
                {getFirstTag(item.tagResponseList) && <span className='dot' />}
                <span>{getFirstTag(item.tagResponseList)}</span>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const renderMaterialBasedProducts = () => {
    if (products?.length > 0) {
      return (
        <div className='grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:!grid-cols-4 gap-5'>
          {products.slice(0, 7).map(product => <MaterialBasedProduct
            key={`products_${product.id}`}
            product={product}
          />)}
          {products.length < 8 && <div
            className='see-all flex items-center justify-center bg-primaryColor hover:bg-black h-[300px] sm:h-[330px] 5xl:h-[456px] cursor-pointer'>
            <div className='text-white-shade-100 text-[40px] text-center flex flex-col items-center'>
              <div>See All</div>
              <IconRightArrow />
            </div>
          </div>}
        </div>
      )
    }
  }

  return (
    <>
      <div>
        <div className='max-w-[434px] mb-8'>
          <div className='input-group'>
            <SelectComponent
              options={fabricOptions}
              onChange={handleFabricChange}
              selectedItem={selectedFabric}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between mb-12 gap-6'>
        <p className='text-base text-primaryColor sm:max-w-[50%]'>Specially designed for you that introduces a
          unique combination of <strong>luxury</strong> and <strong>tredition</strong>. The feel and the
          experience of the collections are top-notch.</p>
        <div className='sm:max-w-[40%]'>
          <div className='flex flex-wrap justify-end gap-3'>
            {unUsedTags.map((item, index) => {
              return (
                <span
                  key={`tags_${item}_${index}`}
                  className='text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block'
                >
                                    {item}
                                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className='kint-carasoul overflow-hidden mb-6'>
        <SliderWrapper>
          {renderSliderContent()}
        </SliderWrapper>
      </div>
      {renderMaterialBasedProducts()}
    </>
  )
}

export default FabricWiseProduct
