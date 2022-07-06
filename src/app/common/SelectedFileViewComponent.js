import React from 'react'
import { getImageExt, IMAGE_EXTS } from '../services/Util'
import { ReactComponent as IconFileClose } from '../../assets/icons/fileClose.svg'

export const SelectedFileViewComponent = ({ file, showRemoveOption, index, remove }) => {
  let ext = getImageExt(file.name)
  if (IMAGE_EXTS.includes(ext)) {
    return (
      <div className='item'>
        {
          showRemoveOption ?
            <div className='close' onClick={() => remove(index)}>
              <IconFileClose />
            </div> : <></>
        }

        <a href={file.docUrl} target='_blank' rel='noreferrer'>
          <img src={showRemoveOption ? file.base64Str : file.docUrl} alt='' />
        </a>
      </div>
    )
  }

  return (
    <div className='item file-item'>
      {
        showRemoveOption ?
          <div className='close' onClick={() => remove(index)}>
            <IconFileClose />
          </div> : <></>
      }
      <a href={file.docUrl} target='_blank' rel='noreferrer'>
        <span>{ext}</span>
      </a>
    </div>
  )

}
