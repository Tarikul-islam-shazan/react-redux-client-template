import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchMemberList, fetchOrderInfo} from "../../store/action/Timeline";

const MemberList = () => {

    const timelineStore = useSelector(store => store.timelineStore)
    const dispatch = useDispatch();
    const params = useParams();
    const [memberList, setMemberList] = useState([])

    useEffect(() => {
        dispatch(fetchOrderInfo(params.orderId))
    }, [])

    useEffect(() => {
        if (timelineStore.orderInfo?.orderMemberList) {
            setMemberList(timelineStore.orderInfo.orderMemberList)
        }
    }, [timelineStore])

    const renderMemberImage = (item) => {
        if (item?.memberImage) {
            return item.memberImage
        } else {
            return "/images/pro_pic_default.svg"
        }
    }

    const renderMemberList = () => {
        if (memberList.length > 0) {
            return (
                <span className="more-member" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      <a href="#">{memberList.length}</a>
                      <div className="dropdown-menu shadow-2dp" aria-labelledby="dropdownMenuButton">
                        <div className="assign-member shadow open">
                          <div className="title">Assigned member</div>
                          <div className="member-list-container">
                              {memberList.map((member, index) => {
                                  return (
                                      <div className="member-list" key={`member_${index}`}>
                                          <img src={renderMemberImage(member)} alt=""/>
                                          <div className="name">
                                              {member.memberName}
                                              <span
                                                  className="tag"
                                              >
                                                  {member.designation}
                                              </span>
                                          </div>
                                      </div>
                                  )
                              })}
                          </div>
                        </div>
                      </div>
                </span>
            )
        }
    }

    return (
        <div className="add-team-members">
            <div className="all-team-members">
                <span className="added-members">
                      {memberList[0] && <img
                          src={renderMemberImage(memberList[0])}
                          alt=""
                          data-toggle="tooltip"
                          data-placement="top"
                          title
                          data-original-title="Mamun"
                      />}
                    {memberList[1] && <img
                        src={renderMemberImage(memberList[1])}
                        alt=""
                        data-toggle="tooltip"
                        data-placement="top"
                        title
                        data-original-title="Zahinul Haque"
                    />}
                    {memberList[2] && <img
                        src={renderMemberImage(memberList[2])}
                        alt=""
                        data-toggle="tooltip"
                        data-placement="top"
                        title
                        data-original-title="pm"
                    />}
                </span>
                {renderMemberList()}
            </div>
        </div>
    )
}

export default MemberList