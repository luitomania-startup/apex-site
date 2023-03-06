import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/store";
import Carousal from './carousal/carousal'
import {
  fetchOffers,
  selectLoading,
  selectOffers,
} from "../../components/store/offer/offerSlice";
interface OfferGetType {
  title: string;
  date: string;
  lastDate: string;
  description: string;
  attachmentFlag: boolean;
  attachmentfileName: string;
}

const Offers = () => {
  const offersList = useAppSelector(selectOffers);
  const loading = useAppSelector(selectLoading);
  const [currentOffer, setOffer] = useState({
    title: "",
    date: "",
    lastDate: "",
    description: "",
    attachmentFlag: false,
    attachmentfileName: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  const latestEvents = [
    {
      title: "Event 1",
      date: "04/02/2022",
      summary: "First event to be going to be held on 4 feb 2022",
      description: "",
      attachmentFlag: true,
      attachmentfileName: "link1",
    },
    {
      title: "Event 2",
      date: "06/02/2022",
      summary: "First event to be going to be held on 6 feb 2022",
      description: "",
      attachmentFlag: false,
      attachmentfileName: "",
    },
    {
      title: "Event 2",
      date: "07/03/2022",
      summary: "First event to be going to be held on 7 March 2022",
      description: "",
      attachmentFlag: true,
      attachmentfileName: "link3",
    },
  ];
  return (
    <>
      <div id="offers" className="flex flex-col items-center mt-10">
        <h3 className="text-5xl md:text-6xl text-black-700 font-bold mb-6">
          Offers
        </h3>
        {
          (loading=="pending" || offersList=== undefined) ? <p>Loading...</p> : (offersList.length ==0 ? <p>Loading...</p> : <Carousal data={offersList}/>)
        }

        
      </div>
      <div
        className="modal fade fixed top-0 right-0 md:right-10  hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="offerModalCenter"
        aria-labelledby="offerModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative pointer-offers-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-screen pointer-offers-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h3 className="text-xl font-medium text-blue-600 hover:text-blue-700 focus:text-blue-800">
                {currentOffer.title}
              </h3>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body md:w-[600px] relative p-4">
              <p>
                <span className="text-blue-600 hover:text-blue-700 focus:text-blue-800">
                  Title:
                </span>
                <span>{currentOffer.title}</span>
              </p>
              <p>
                <span className="text-blue-600 hover:text-blue-700 focus:text-blue-800">
                  Offer Last Date:
                </span>
                <span>{new Date(currentOffer.date).toLocaleDateString()}</span>
              </p>
              {currentOffer.description && (
                <p>
                  <span className="text-blue-600 hover:text-blue-700 focus:text-purple-800">
                    Description:
                  </span>
                  <span>{currentOffer.description}</span>
                </p>
              )}

              {/* <img
                className="w-full h-full"
                src={`${
                  import.meta.env.VITE_SERVERURL
                }/api/images/get-image-by-name/${currentOffer}`}
              /> */}
              <div className="py-6 px-6 lg:px-8"></div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-start p-4 border-t border-gray-200 rounded-b-md">
              {currentOffer.attachmentFlag && (
                <a
                  href={currentOffer.attachmentfileName}
                  type="button"
                  className="px-6
                  py-2.5
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                  ml-1"
                  data-mdb-ripple="true"
                >
                  Attachment
                </a>
              )}
              <button
                type="button"
                className="px-6
                py-2.5
                bg-purple-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-purple-700 hover:shadow-lg
                focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-purple-800 active:shadow-lg
                transition
                duration-150
                ease-in-out ml-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
