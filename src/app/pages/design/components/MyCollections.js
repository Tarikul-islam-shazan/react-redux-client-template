import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MyCollections = ({ myCollectionLists }) => {
    const [isLoading, setIsloading] = useState(false);
    const [myCollections, setmyCollections] = useState([]);
    let history = useHistory();

    useEffect(() => {
        setmyCollections(myCollectionLists);
    }, [myCollectionLists]);
    return (
        <div className="collection-type-container">
            {myCollections.slice(0, 4).map((collection, i) => {
                let docs =
                    collection.documentResponseList && collection.documentResponseList.length
                        ? collection.documentResponseList
                        : [];
                let img1 = docs.length > 0 ? docs[0].docUrl : "";
                let img2 = docs.length > 1 ? docs[1].docUrl : "";
                let img3 = docs.length > 2 ? docs[2].docUrl : "";
                return (
                    <div
                        className="collection-type-item"
                        key={i}
                        onClick={() => history.push("/collections/view/" + collection.id)}
                    >
                        <div className="product-img-container">
                            <div className="prev-img">
                                <img
                                    src={
                                        img1
                                            ? img1
                                            : require("../../../assets/images/default_product.svg")
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="prev-img-thumb">
                                <img
                                    src={
                                        img2
                                            ? img2
                                            : require("../../../assets/images/default_product.svg")
                                    }
                                    alt=""
                                />
                                <img
                                    src={
                                        img3
                                            ? img3
                                            : require("../../../assets/images/default_product.svg")
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                        <h4 className="font-16 font-weight-normal mt-3 d-flex flex-column">
                            <span>{collection.name}</span>
                            {/* <span className="text-muted font-14 mt-2">
                              {collection.numOfDesign ? collection.numOfDesign : 0} Items
                           </span> */}
                        </h4>
                    </div>
                );
            })}
        </div>
    );
};

export default MyCollections;
