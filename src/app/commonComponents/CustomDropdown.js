import React, { useState, useEffect } from "react";

const CustomDropdown = ({
    type,
    title,
    onItemClick,
    items,
    selectedItem,
    colorList,
    onAddMore,
    onItemSearch,
    isAddNew,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchItem = (event) => {
        if (onItemSearch) {
            onItemSearch(event.target.value);
        }
        setSearchTerm(event.target.value);
    };

    const onSelectItem = (value) => {
        onItemClick(title, value);
        setSearchTerm("");
    };

    const results = !searchTerm
        ? items
        : items.filter((item) => item.value.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

    return (
        <div className="select-component">
            {title && <label htmlFor="collection">{title === "Color" ? "" : title}</label>}

            {type === "addItem" && (
                <>
                    <div
                        className="click-box click mb-1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <p class="regular-14">{selectedItem ? selectedItem : "Select"}</p>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15.8805 9.29055L12.0005 13.1705L8.12047 9.29055C7.73047 8.90055 7.10047 8.90055 6.71047 9.29055C6.32047 9.68055 6.32047 10.3105 6.71047 10.7005L11.3005 15.2905C11.6905 15.6805 12.3205 15.6805 12.7105 15.2905L17.3005 10.7005C17.6905 10.3105 17.6905 9.68055 17.3005 9.29055C16.9105 8.91055 16.2705 8.90055 15.8805 9.29055Z"
                                fill="#9AA1AF"
                            />
                        </svg>
                    </div>
                    <div className="dropdown-menu dropdown-box">
                        <div className="m-0 search-filter">
                            <div className="with-icon right-icon">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={onSearchItem}
                                />
                                <span className="right-icon">
                                    <svg
                                        width={17}
                                        height={17}
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21015 14.4276 10.7866 13.464 12.0483L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3466 17.0676 15.7794 17.0953 15.3871 16.7903L15.2929 16.7071L12.0483 13.464C10.7866 14.4276 9.21015 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C8.85114 13 10.0885 12.5128 11.0459 11.7045C11.091 11.5536 11.1738 11.412 11.2929 11.2929C11.412 11.1738 11.5536 11.091 11.7041 11.0446C12.5128 10.0885 13 8.85114 13 7.5C13 4.46243 10.5376 2 7.5 2Z"
                                            fill="#9AA1AF"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {isAddNew && (
                            <div className="add-btn" onClick={onAddMore}>
                                <button className="button text">
                                    <svg
                                        width={14}
                                        height={14}
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <span className="ml-2">Add {title}</span>
                                </button>
                            </div>
                        )}
                        <div className="color-list-box">
                            {results.map((item) => (
                                <div
                                    className="single-color-item single-item d-flex"
                                    key={item.id}
                                    onClick={() => onSelectItem(item)}
                                >
                                    <div className="one-half color-name">
                                        <p className="regular-14">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {type === "withImage" && (
                <>
                    <div
                        className="click-box click mb-1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <p class="regular-14">{selectedItem ? selectedItem : "Select"}</p>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15.8805 9.29055L12.0005 13.1705L8.12047 9.29055C7.73047 8.90055 7.10047 8.90055 6.71047 9.29055C6.32047 9.68055 6.32047 10.3105 6.71047 10.7005L11.3005 15.2905C11.6905 15.6805 12.3205 15.6805 12.7105 15.2905L17.3005 10.7005C17.6905 10.3105 17.6905 9.68055 17.3005 9.29055C16.9105 8.91055 16.2705 8.90055 15.8805 9.29055Z"
                                fill="#9AA1AF"
                            />
                        </svg>
                    </div>
                    <div className="dropdown-menu dropdown-box">
                        <div className="m-0 search-filter">
                            <div className="with-icon right-icon">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={onSearchItem}
                                />
                                <span className="right-icon">
                                    <svg
                                        width={17}
                                        height={17}
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21015 14.4276 10.7866 13.464 12.0483L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3466 17.0676 15.7794 17.0953 15.3871 16.7903L15.2929 16.7071L12.0483 13.464C10.7866 14.4276 9.21015 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C8.85114 13 10.0885 12.5128 11.0459 11.7045C11.091 11.5536 11.1738 11.412 11.2929 11.2929C11.412 11.1738 11.5536 11.091 11.7041 11.0446C12.5128 10.0885 13 8.85114 13 7.5C13 4.46243 10.5376 2 7.5 2Z"
                                            fill="#9AA1AF"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="color-list-box">
                            {results.map((item) => (
                                <div
                                    className="single-color-item d-flex"
                                    key={item.id}
                                    onClick={() => onSelectItem(item)}
                                >
                                    <div className="one-half color-code">
                                        <img src={item.docUrl} alt="brand-logo" />
                                    </div>
                                    <div className="one-half color-name">
                                        <p className="regular-14">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {type === "addColor" && (
                <>
                    <div
                        className="click-box click mb-1 "
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <p class="regular-14">{selectedItem ? selectedItem : "Select color"}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15.8805 9.29055L12.0005 13.1705L8.12047 9.29055C7.73047 8.90055 7.10047 8.90055 6.71047 9.29055C6.32047 9.68055 6.32047 10.3105 6.71047 10.7005L11.3005 15.2905C11.6905 15.6805 12.3205 15.6805 12.7105 15.2905L17.3005 10.7005C17.6905 10.3105 17.6905 9.68055 17.3005 9.29055C16.9105 8.91055 16.2705 8.90055 15.8805 9.29055Z"
                                fill="#9AA1AF"
                            />
                        </svg>
                    </div>

                    <div className="dropdown-box dropdown-menu">
                        <div className="m-0 search-filter">
                            <div className="with-icon right-icon">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={onSearchItem}
                                />
                                <span className="right-icon">
                                    <svg
                                        width={17}
                                        height={17}
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21015 14.4276 10.7866 13.464 12.0483L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3466 17.0676 15.7794 17.0953 15.3871 16.7903L15.2929 16.7071L12.0483 13.464C10.7866 14.4276 9.21015 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C8.85114 13 10.0885 12.5128 11.0459 11.7045C11.091 11.5536 11.1738 11.412 11.2929 11.2929C11.412 11.1738 11.5536 11.091 11.7041 11.0446C12.5128 10.0885 13 8.85114 13 7.5C13 4.46243 10.5376 2 7.5 2Z"
                                            fill="#9AA1AF"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {isAddNew && (
                            <div className="add-btn" onClick={onAddMore}>
                                <button className="button text">
                                    <svg
                                        width={14}
                                        height={14}
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <span className="ml-2">Add color</span>
                                </button>
                            </div>
                        )}

                        <div className="color-list-box">
                            {items.map((item) => (
                                <div
                                    className="single-color-item d-flex"
                                    key={item.id}
                                    onClick={() => onSelectItem(item)}
                                >
                                    <div className="one-half color-code">
                                        <span
                                            className="color-icon"
                                            style={{
                                                background: item.hexCode,
                                            }}
                                        />
                                        <span className="regular-14">{item.code}</span>
                                    </div>
                                    <div className="one-half color-name">
                                        <p className="regular-14">{item.value}</p>
                                    </div>
                                </div>
                            ))}

                            {/* {renderColorList(results)} */}
                        </div>
                    </div>
                </>
            )}

            {type === "colorList" && (
                <>
                    {colorList.map((item) => (
                        <div className="input-group mb-3" key={item.id}>
                            {/* <label htmlFor="SelectFabric">Color</label> */}
                            <div className="input-group-prepend with-color-element">
                                <button
                                    className="btn btn-outline-secondary"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <span
                                        className="color"
                                        style={{
                                            background: item.hexCode,
                                        }}
                                    />{" "}
                                    {item.code}{" "}
                                </button>
                            </div>

                            <input
                                type="text"
                                className="form-control"
                                aria-label="Text input with dropdown button"
                                placeholder={item.value}
                                disabled
                            />
                            <span className="action-icon" onClick={() => onSelectItem(item)}>
                                <svg
                                    width={19}
                                    height={18}
                                    viewBox="0 0 19 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.75 4.5H4.25H16.25"
                                        stroke="#F82B60"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.5 4.5V3C6.5 2.60218 6.65804 2.22064 6.93934 1.93934C7.22064 1.65804 7.60218 1.5 8 1.5H11C11.3978 1.5 11.7794 1.65804 12.0607 1.93934C12.342 2.22064 12.5 2.60218 12.5 3V4.5M14.75 4.5V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H5.75C5.35218 16.5 4.97064 16.342 4.68934 16.0607C4.40804 15.7794 4.25 15.3978 4.25 15V4.5H14.75Z"
                                        stroke="#F82B60"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 8.25V12.75"
                                        stroke="#F82B60"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11 8.25V12.75"
                                        stroke="#F82B60"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CustomDropdown;
