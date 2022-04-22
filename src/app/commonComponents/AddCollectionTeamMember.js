import React from "react";

const DEFAULT_USER_PIC = "/images/pro_pic_default.svg";

const AddCollectionTeamMember = ({
    memberData,
    showViewType,
    onAddMember,
    onRemoveMember,
    onChange,
}) => {
    let fashionDesigner = memberData.usersByTypeList?.FASHION_DESIGNER;
    let accountManager = memberData.usersByTypeList?.ACCOUNT_MANAGER;
    let merchandiser = memberData.usersByTypeList?.MERCHANDISER;
    let qa = memberData.usersByTypeList?.QA;
    let searchUserText = memberData.searchUserText;
    let searchUserSuggestions = memberData.searchUserSuggestions;
    let memberList = memberData.memberList;

    const renderUserInfo = (member, type) =>
        member.map((item) => (
            <div
                className="single-person d-flex justify-content-between align-items-center"
                key={item.id}
            >
                <div className="person-info d-flex align-items-center">
                    <div className="image">
                        <img
                            src={
                                item.profilePicDocument
                                    ? item.profilePicDocument.docUrl
                                    : DEFAULT_USER_PIC
                            }
                            alt="person"
                        />
                    </div>
                    <div className="details-info">
                        <div className="name">
                            <p>
                                {item.name}
                                {item.designation ? (
                                    <span className="designation">{item.designation}</span>
                                ) : (
                                    ""
                                )}
                            </p>
                            <p className="email">{item.email}</p>
                        </div>
                    </div>
                </div>
                {type === "remove" ? (
                    <div className="action text-right">
                        <a href="#" onClick={() => onRemoveMember(item)}>
                            Remove
                        </a>
                    </div>
                ) : (
                    <div class="action text-right">
                        <a href="#" onClick={() => onAddMember(item)}>
                            Add
                        </a>
                    </div>
                )}
            </div>
        ));

    const renderUserSuggetion = () => {
        let result = [];
        if (searchUserText) {
            result.push(
                <ul class="p-0 m-0 existing-item">
                    {searchUserSuggestions.length ? (
                        searchUserSuggestions.map((item) => {
                            return (
                                <div
                                    className="single-person d-flex justify-content-between align-items-center"
                                    key={item.id}
                                >
                                    <div className="person-info d-flex align-items-center">
                                        <div className="image">
                                            <img
                                                src={
                                                    item.profilePicDocument
                                                        ? item.profilePicDocument.docUrl
                                                        : DEFAULT_USER_PIC
                                                }
                                                alt="person"
                                            />
                                        </div>
                                        <div className="details-info">
                                            <div className="name">
                                                <p>
                                                    {item.name}
                                                    {item.designation ? (
                                                        <span className="designation">
                                                            {item.designation}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </p>
                                                <p className="email">{item.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action text-right">
                                        <a href="#" onClick={() => onAddMember(item)}>
                                            Add
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <li>
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-column ml-2">
                                    <span>No suggestions found</span>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            );
        }
        return result;
    };

    return (
        <div className="team-section">
            <div className="top-section">
                <div className="container-fluid">
                    <div className="row first-row">
                        <div className="col-12 d-flex justify-content-between no-padding">
                            <div className="team-heading">
                                <h3>Team</h3>
                            </div>
                        </div>
                    </div>
                    <nav>
                        <div className="nav" id="nav-tab" role="tablist">
                            <a
                                className="nav-link active"
                                id="nav-home-tab"
                                data-toggle="tab"
                                href="#nav-home"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
                                Member list
                            </a>
                            <a
                                className="nav-link"
                                id="nav-profile-tab"
                                data-toggle="tab"
                                href="#nav-profile"
                                role="tab"
                                aria-controls="nav-profile"
                                aria-selected="false"
                            >
                                Add member
                            </a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            <div className="all-team-members-without-search">
                                <div className="manager-designation-persons">
                                    {memberList && memberList.length !== 0 ? (
                                        renderUserInfo(memberList, "remove")
                                    ) : (
                                        <span className="no-member">No member added yet</span>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                        <div
                            className="tab-pane fade"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                        >
                            <div className="member-search">
                                <div className="search flex-grow-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16.55"
                                        height="16.508"
                                        viewBox="0 0 16.55 16.508"
                                    >
                                        <path
                                            id="Path_23797"
                                            data-name="Path 23797"
                                            d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z"
                                            transform="translate(0.2 0.25)"
                                            fill="#a1a6b2"
                                            stroke="#a1a6b2"
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                    <input
                                        type="search"
                                        autoComplete="chrome-off"
                                        placeholder="Search member"
                                        className="w-100"
                                        name="searchUserText"
                                        value={searchUserText}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="all-team-members">
                            {!searchUserText ? (
                                <>
                                    {accountManager && (
                                        <div className="manager-designation-persons">
                                            <div className="designation-title">
                                                <h4>Account Manager</h4>
                                            </div>
                                            {accountManager && accountManager.length !== 0
                                                ? renderUserInfo(accountManager, "add")
                                                : "No account manager added yet"}
                                        </div>
                                    )}
                                    {fashionDesigner && (
                                        <div className="manager-designation-persons">
                                            <div className="designation-title">
                                                <h4>Fashion Designer</h4>
                                            </div>
                                            {fashionDesigner && fashionDesigner.length !== 0
                                                ? renderUserInfo(fashionDesigner, "add")
                                                : "No fashion designer added yet"}
                                        </div>
                                    )}

                                    {qa && (
                                        <div className="manager-designation-persons">
                                            <div className="designation-title">
                                                <h4>Qa</h4>
                                            </div>
                                            {qa && qa.length !== 0
                                                ? renderUserInfo(qa, "add")
                                                : "No qa added yet"}
                                        </div>
                                    )}
                                    {merchandiser && (
                                        <div className="manager-designation-persons">
                                            <div className="designation-title">
                                                <h4>Merchandiser</h4>
                                            </div>
                                            {merchandiser && merchandiser.length !== 0
                                                ? renderUserInfo(merchandiser, "add")
                                                : "No merchandiser added yet"}
                                        </div>
                                    )}
                                </>
                            ) : (
                                renderUserSuggetion()
                            )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCollectionTeamMember;
