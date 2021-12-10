import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageSuffix } from "../../services/Util";
import Http from "../../services/Http";
import { toastError, toastSuccess, toastWarning } from "../../commonComponents/Toast";
import { fetchDashboardQuotes, fetchDashboardAllTasks } from "../../redux/dashboard/action";
import { getDashboardQuotes, getDashboardAllTasks } from "../../redux/reducers";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [buyerOverview, setBuyerOverview] = useState([]);
    const [currentQuoutePage, setCurrentQuoutePage] = useState(0);
    const [currentTaskPage, setCurrentTaskPage] = useState(0);

    const [sort, setSort] = useState("id,desc");
    const dispatch = useDispatch();

    let allQuotes = useSelector(getDashboardQuotes);
    let allTasks = useSelector(getDashboardAllTasks);

    const getOrderSuppliers = async () => {
        setIsLoading(true);
        await Http.GET("getDashboarOverview")
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    setBuyerOverview(data);
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };
    useEffect(() => {
        setIsLoading(true);
        getOrderSuppliers();
        dispatch(fetchDashboardQuotes(0, 15, sort)).finally(() => {
            setIsLoading(false);
        });
        dispatch(fetchDashboardAllTasks(0, 15, sort)).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch, sort]);

    useEffect(() => {
        let hasNext = allQuotes?.hasNext;
        if (hasNext) {
            setIsLoading(true);
            dispatch(fetchDashboardQuotes(currentQuoutePage, 15, sort)).finally(() => {
                setIsLoading(false);
            });
        }
        document.addEventListener("scroll", onScrollQuotes);
        return () => {
            document.removeEventListener("scroll", onScrollQuotes);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentQuoutePage]);

    const onScrollQuotes = () => {
        let reachedBottom =
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (reachedBottom) {
            setCurrentQuoutePage((page) => page + 1);
        }
    };

    useEffect(() => {
        let hasNext = allTasks?.hasNext;
        if (hasNext) {
            setIsLoading(true);
            dispatch(fetchDashboardAllTasks(currentTaskPage, 15, sort)).finally(() => {
                setIsLoading(false);
            });
        }
        document.addEventListener("scroll", onScrollTaskList);
        return () => {
            document.removeEventListener("scroll", onScrollTaskList);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentTaskPage]);

    const onScrollTaskList = () => {
        let reachedBottom =
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (reachedBottom) {
            setCurrentQuoutePage((page) => page + 1);
        }
    };

    console.log("zzzzzzzzzz", allTasks);

    const getTotalSustainable = () => {
        return (buyerOverview.sustainableProductCount / buyerOverview.totalProductCount) * 100;
    };

    const getTotalQuoteToOrder = () => {
        return (buyerOverview.quoteToOrderCount / buyerOverview.totalQuoteCount) * 100;
    };
    const getAcceptedDesigns = () => {
        return (
            <>
                {buyerOverview.quoteToOrderCount}
                <span>/{buyerOverview.totalDesignSold}</span>
            </>
        );
    };

    const getDeliveredOrder = () => {
        return (
            <>
                {buyerOverview.deliveredOrder}
                <span>/{buyerOverview.totalOrder}</span>
            </>
        );
    };
    const getOrderValue = () => {
        return buyerOverview.orderValue;
    };
    const getTotalUnits = () => {
        return buyerOverview.noOfSupplier;
    };

    return (
        <div className="buyer-dashboard-container">
            <div className="welcome-message">
                <h3 data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
                    Hi <span>Jone</span>, good afternoon!
                </h3>
            </div>
            {/* Order journey status */}
            {buyerOverview.length !== 0 && (
                <div className="full-journey-status">
                    <div className="one-sixth sustainable-box">
                        <div className="status-details">
                            <h3>{getTotalSustainable().toFixed(2)}%</h3>
                            <span>Sustainable</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/sustainable.svg" alt="sustainable" />
                        </div>
                    </div>
                    <div className="one-sixth quote-order-box">
                        <div className="status-details">
                            <h3>{getTotalQuoteToOrder().toFixed(2)}%</h3>
                            <span>Quote to order</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/quote-order.svg" alt="quote" />
                        </div>
                    </div>
                    <div className="one-sixth design-box">
                        <div className="status-details">
                            <h3>{getAcceptedDesigns()}</h3>
                            <span>Designs accepted</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/Design.svg" alt="Design" />
                        </div>
                    </div>
                    <div className="one-sixth delivered-box">
                        <div className="status-details">
                            <h3>{getDeliveredOrder()}</h3>
                            <span>Orders deliverd</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/shipment.svg" alt="shipment" />
                        </div>
                    </div>
                    <div className="one-sixth order-value-box">
                        <div className="status-details">
                            <h3>${getOrderValue()}</h3>
                            <span>Order value</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/order-value.svg" alt="order-value" />
                        </div>
                    </div>
                    <div className="one-sixth supplier-box">
                        <div className="status-details">
                            <h3>{getTotalUnits()}</h3>
                            <span>Manufacturing units</span>
                        </div>
                        <div className="status-icon">
                            <img src="/icons/Supplier.svg" alt="Supplier" />
                        </div>
                    </div>
                </div>
            )}
            {/* Orders and quotes status */}
            <div className="orders-and-quotes-status">
                <div className="one-half my-orders">
                    <div className="state-title d-flex align-items-center">
                        <h3>
                            My orders <span className="count">(12)</span>
                        </h3>
                        <a href>View all</a>
                    </div>
                    <div className="running-orders-info-section progress-info-team-brand">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 px-0">
                                    <div className="team-performance-top">
                                        <div className="status-filter">
                                            <div className="performence-status">
                                                <ul className="order-status d-flex">
                                                    <li className="mini-fonts">
                                                        <span className="progress-identifier green" />
                                                        Completed on time
                                                    </li>
                                                    <li className="mini-fonts">
                                                        <span className="progress-identifier blue" />
                                                        Pending
                                                    </li>
                                                    <li className="mini-fonts">
                                                        <span className="progress-identifier red" />
                                                        Overdue
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-section">
                                        <div className="single-person-progress d-flex align-items-center">
                                            <div className="person-info d-flex align-items-center">
                                                <div className="four-images d-flex">
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design1.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design2.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design3.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design4.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="order-name">
                                                    <p>Activewear summer order</p>
                                                </div>
                                                <div className="assigned-person">
                                                    <img src="/images/jobaidu.png" alt="profile" />
                                                </div>
                                                <div className="date-info">
                                                    <p>
                                                        Apr 25{" "}
                                                        <span className="date-count">(18d)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="progress-info">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar ahead-schedule"
                                                        role="progressbar"
                                                        style={{ width: "20%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar completed"
                                                        role="progressbar"
                                                        style={{ width: "30%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar pending"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={30}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar overdue"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-person-progress d-flex align-items-center">
                                            <div className="person-info d-flex align-items-center">
                                                <div className="four-images d-flex">
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design3.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design2.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design1.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design4.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="order-name">
                                                    <p>Activewear summer order</p>
                                                </div>
                                                <div className="assigned-person">
                                                    <img src="/images/jobaidu.png" alt="profile" />
                                                </div>
                                                <div className="date-info">
                                                    <p>
                                                        Apr 25{" "}
                                                        <span className="date-count">(18d)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="progress-info">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar ahead-schedule"
                                                        role="progressbar"
                                                        style={{ width: "20%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar completed"
                                                        role="progressbar"
                                                        style={{ width: "30%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar pending"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={30}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar overdue"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-person-progress d-flex align-items-center">
                                            <div className="person-info d-flex align-items-center">
                                                <div className="four-images d-flex">
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design2.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design3.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design1.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design4.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="order-name">
                                                    <p>Activewear summer order</p>
                                                </div>
                                                <div className="assigned-person">
                                                    <img src="/images/jobaidu.png" alt="profile" />
                                                </div>
                                                <div className="date-info">
                                                    <p>
                                                        Apr 25{" "}
                                                        <span className="date-count">(18d)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="progress-info">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar ahead-schedule"
                                                        role="progressbar"
                                                        style={{ width: "20%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar completed"
                                                        role="progressbar"
                                                        style={{ width: "30%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar pending"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={30}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar overdue"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-person-progress d-flex align-items-center">
                                            <div className="person-info d-flex align-items-center">
                                                <div className="four-images d-flex">
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design2.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design3.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design1.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design4.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="order-name">
                                                    <p>Activewear summer order</p>
                                                </div>
                                                <div className="assigned-person">
                                                    <img src="/images/jobaidu.png" alt="profile" />
                                                </div>
                                                <div className="date-info">
                                                    <p>
                                                        Apr 25{" "}
                                                        <span className="date-count">(18d)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="progress-info">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar ahead-schedule"
                                                        role="progressbar"
                                                        style={{ width: "20%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar completed"
                                                        role="progressbar"
                                                        style={{ width: "30%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar pending"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={30}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar overdue"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-person-progress d-flex align-items-center">
                                            <div className="person-info d-flex align-items-center">
                                                <div className="four-images d-flex">
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design1.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design3.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design4.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                    <div className="single-one">
                                                        <img
                                                            src="/images/design2.png"
                                                            alt="tast image"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="order-name">
                                                    <p>Activewear summer order</p>
                                                </div>
                                                <div className="assigned-person">
                                                    <img src="/images/jobaidu.png" alt="profile" />
                                                </div>
                                                <div className="date-info">
                                                    <p>
                                                        Apr 25{" "}
                                                        <span className="date-count">(18d)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="progress-info">
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar ahead-schedule"
                                                        role="progressbar"
                                                        style={{ width: "20%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar completed"
                                                        role="progressbar"
                                                        style={{ width: "30%" }}
                                                        aria-valuenow={15}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar pending"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={30}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                    <div
                                                        className="progress-bar overdue"
                                                        role="progressbar"
                                                        style={{ width: "25%" }}
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* If no data found this will be the empty state. */}
                                        <div className="nothing-found text-center">
                                            <img
                                                src="/icons/Nothing found.svg"
                                                alt="nothing found"
                                            />
                                            <p>No order created yet</p>
                                        </div>
                                        {/* If no data found this will be the empty state. */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="one-half my-quotes">
                    <div className="state-title d-flex align-items-center">
                        <h3>My quotes</h3>
                        <a href>View all</a>
                    </div>
                    <div className="orders-table">
                        <table className="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>Design</th>
                                    <th>Quanity</th>
                                    <th>Status</th>
                                    <th>Price/ Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allQuotes?.data?.map((item) => (
                                    <tr>
                                        <td>
                                            <span className="image-with-title">
                                                <img
                                                    src={addImageSuffix(item.docUrl, "_xthumbnail")}
                                                    alt={addImageSuffix(item.docUrl, "_xthumbnail")}
                                                    className="cell-img pr-2"
                                                />
                                                <span className="d-inline-block align-middle">
                                                    {item.productName}
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <span>{item.total} pcs</span>{" "}
                                        </td>
                                        <td>
                                            {item.status === "PRICE_GIVEN" ? (
                                                <div className="task-status yellow">
                                                    <span className="status-btn">Quoted</span>
                                                </div>
                                            ) : (
                                                <div className="task-status yellow">
                                                    <span className="status-btn">
                                                        Offer pending
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {item.status === "PRICE_GIVEN"
                                                ? item.unitPrice && <span>${item.unitPrice}</span>
                                                : "Depandacy Backend"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* If no data found this will be the empty state. */}
                        <div className="nothing-found text-center">
                            <img src="/icons/Nothing found.svg" alt="nothing found" />
                            <p>No qoutes added yet</p>
                        </div>
                        {/* If no data found this will be the empty state. */}
                    </div>
                </div>
            </div>
            {/* Quict actions table */}
            <div className="quick-actions">
                <div className="state-title d-flex align-items-center">
                    <h3>Quick actions</h3>
                    <a href>View all</a>
                </div>
                <div className="quick-actions-table">
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>
                                    <span>
                                        Style <img src="/icons/down-arrow.svg" alt="arrow" />
                                    </span>
                                </th>
                                <th>
                                    <span>
                                        Order title <img src="/icons/down-arrow.svg" alt="arrow" />
                                    </span>
                                </th>
                                <th>
                                    <span>
                                        Order number <img src="/icons/down-arrow.svg" alt="arrow" />
                                    </span>
                                </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTasks && allTasks?.data?.length > 0
                                ? allTasks?.data.map((item) => (
                                      <tr>
                                          <td>
                                              <span className="image-with-title">
                                                  <img
                                                      src={item?.stepProduct?.image}
                                                      alt="image"
                                                      className="cell-img pr-2"
                                                  />
                                                  <span className="d-inline-block align-middle">
                                                      {item.stepName}
                                                  </span>
                                              </span>
                                          </td>
                                          <td>
                                              <span>{item?.stepProduct?.name}</span>{" "}
                                          </td>
                                          <td>
                                              <span>{item.orderName}</span>{" "}
                                          </td>
                                          <td>
                                              <span>{item.orderRefNumber}</span>{" "}
                                          </td>
                                          <td>
                                              <div className="task-status red">
                                                  <span className="status-btn">{item.status}</span>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : "no data"}
                        </tbody>
                    </table>
                    {/* If no data found this will be the empty state. */}
                    <div className="nothing-found text-center">
                        <img src="/icons/Nothing found.svg" alt="nothing found" />
                        <p>You have completed all tasks. Great job!</p>
                    </div>
                    {/* If no data found this will be the empty state. */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
