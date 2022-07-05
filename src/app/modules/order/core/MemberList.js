import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const MemberList = () => {
    const timelineStore = useSelector((store) => store.timeline)
    const [memberList, setMemberList] = useState([])

    useEffect(() => {
        if (timelineStore.orderInfo?.orderMemberList) {
            setMemberList(timelineStore.orderInfo.orderMemberList)
        }
    }, [timelineStore])

    const renderMemberImage = (item) => {
        if (item?.memberImage) {
            return item.memberImage
        } else {
            return '/images/pro_pic_default.svg'
        }
    }

    const renderMemberList = () => {
        if (memberList.length > 0) {
            return (
                <span className='more-member'>
                    <a href='#'>+{memberList.length}</a>

                    <div className='assign-member shadow '>
                        <div className='title'>Assigned member</div>
                        <div className='member-list-container'>
                            {memberList.map((member, index) => {
                                return (
                                    <div
                                        className='member-list'
                                        key={`member_${index}`}
                                    >
                                        <img
                                            src={renderMemberImage(member)}
                                            alt=''
                                        />
                                        <div className='name'>
                                            {member.memberName}&nbsp;
                                            <span className='tag'>
                                                {member.designation}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </span>
            )
        }
    }

    return (
        <div
            className='add-team-members'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
        >
            <div className='all-team-members'>
                <span className='added-members'>
                    {memberList[0] && (
                        <img
                            src={renderMemberImage(memberList[0])}
                            alt=''
                            data-toggle='tooltip'
                            data-placement='top'
                            title
                            data-original-title='Mamun'
                        />
                    )}
                    {memberList[1] && (
                        <img
                            src={renderMemberImage(memberList[1])}
                            alt=''
                            data-toggle='tooltip'
                            data-placement='top'
                            title
                            data-original-title='Zahinul Haque'
                        />
                    )}
                    {memberList[2] && (
                        <img
                            src={renderMemberImage(memberList[2])}
                            alt=''
                            data-toggle='tooltip'
                            data-placement='top'
                            title
                            data-original-title='pm'
                        />
                    )}
                </span>
                {renderMemberList()}
            </div>
        </div>
    )
}

export default MemberList
