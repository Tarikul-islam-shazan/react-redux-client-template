import React, { useState, useEffect } from "react";
import CustomDropdown from "../../../commonComponents/CustomDropdown";
import Http from "../../../services/Http";
import { toastSuccess, toastError } from "../../../commonComponents/Toast";

const EditColorDropdown = ({ colorData, addColor, removeColor }) => {
    const [colorName, setColorName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [allColorList, setAllColorLists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColor, setSearchColor] = useState("");
    const [errors, setErrors] = useState({});
    const [designInfo, setDesignInfo] = useState({
        pantoneColorIdList: [],
    });

    const [selectedColorList, setSelectedColorList] = useState([]);

    console.log("DDDD=============", selectedColorList);

    const getColors = async (term = "") => {
        let params = `?page=0&size=20&search=${term}`;
        await Http.GET("getAllColors", params)
            .then(({ data }) => {
                if (data) {
                    setAllColorLists(data);
                }
            })
            .catch((response) => {
                toastError(response.message);
            });
    };

    useEffect(() => {
        getColors(searchColor);
    }, [searchColor]);

    useEffect(() => {
        setSelectedColorList(
            colorData?.map((item) => {
                return {
                    id: item.id,
                    value: item.name,
                    code: item.code,
                    hexCode: item.hexCode,
                };
            })
        );
    }, [colorData]);

    let colors = allColorList;
    colors = colors.map((item) => {
        return {
            id: item.id,
            value: item.name,
            code: item.code,
            hexCode: item.hexCode,
        };
    });

    const onItemClick = (type, item) => {
        if (type === "Select color") {
            setColorName(item.value);
            setDesignInfo({
                ...designInfo,
                pantoneColorIdList: [...designInfo.pantoneColorIdList, item.id],
            });
            addColor(item.id);
            setSelectedColorList([...selectedColorList, item]); // add the selected color below
            colors = colors.filter((color) => color.id !== item.id);
            setColorName("");
        }
        if (type === "Color") {
            let newColor = [...selectedColorList];
            let colorList = newColor.filter((color) => color.id !== item.id);
            removeColor(item.id);
            setSelectedColorList(colorList);
            setDesignInfo({
                ...designInfo,
                pantoneColorIdList: designInfo.pantoneColorIdList.filter((id) => id !== item.id),
            });
            // if (selectedColorList.length === 1) {
            //     setColorName("");
            // }
            setColorName("");
        }
    };

    const onColorSearch = (value) => {
        setSearchColor(value);
    };

    return (
        <div className="col-md-12 mb-3">
            <CustomDropdown
                type="addColor"
                title="Select color"
                onItemClick={onItemClick}
                items={colors}
                onItemSearch={onColorSearch}
                selectedItem={colorName}
                isAddNew={false}
                // onAddMore={() => setShowColorModal(true)}
            />
            {/* {errors.colorError && <p className="error">{errors.colorError}</p>} */}

            {selectedColorList?.length > 0 && (
                <CustomDropdown
                    type="colorList"
                    title="Color"
                    onItemClick={onItemClick}
                    // items={colorItems}
                    selectedItem={colorName}
                    colorList={selectedColorList}
                />
            )}
        </div>
    );
};

export default EditColorDropdown;
