import React from "react";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SelectListArray from "./SelectListArray";
import SelectTablesArray from "./SelectTablesArray";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PDFDownloadLink} from '@react-pdf/renderer';
import {MyDocument} from "../CertificateDownload";
import { FC } from "react";

function SelectTables() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ptmodalOpend, setPtModalOpened] = React.useState(false);
  const handlePtOpen = () => setPtModalOpened(true);

  const handlePtClose = (e: object) => {
    setPtModalOpened(false);
  };

  const continueHandler = () => {
    if(location.pathname === '/createtitle'){
      navigate('/createtitle/otherinfo')
    }
    else {
      // alert('success!');
      handlePtOpen();
    }
  }

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 848,
    height: 572,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center'
  };

  return (
    <div className="col-span-3 p-2 w-full">
      <div className="store-card px-8 py-4">
        <Modal
          open={ptmodalOpend}
          onClose={handlePtClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEnforceFocus={false}
        >
          <Box sx={style}>
            <div className="grid grid-cols-11 w-full px-1 mt-[3px]">
              <div className="col-span-5 rounded-lg bg-[#9898cb]">
                <div className="grid grid-cols-12 px-2 pt-4 pr-[6px]">
                  <div className="col-span-7 mx-1">
                    <div className="bg-[#FF5C85] rounded-md p-2 mx-[1px] font-medium">
                      <p className="text-[#08081C] text-xl">Certificate of Title</p>
                    </div>
                    <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Vehicle Number</p>
                    <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                      <p className="text-white text-xl">K72F40K72F40K7</p>
                    </div>
                    <div className="grid grid-cols-7 gap-3">
                      <div className="col-span-3">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Year Model</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl">2015</p>
                        </div>
                      </div>
                      <div className="col-span-4 w-[85%]">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Make</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 font-medium">
                            <p className="text-white text-xl text-left">Jeep</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="relative">
                      <img src="/group8795.svg"/>
                      <img src="/check-mark.svg" className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 w-[60%]"/>
                    </div>
                    <p className="text-white text-sm  mt-0 text-left font-[300] px-1">Expiration Date</p>
                    <div className="bg-[#5C5CAD] rounded-md p-2 font-medium">
                      <p className="text-white text-xl">09/11/2025</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-8 px-2 pb-2 pr-[1px]">
                    <div className="col-span-3 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Last Owner</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl">Bob Smith</p>
                        </div>    
                    </div>
                    <div className="col-span-5 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">City/State</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl text-left">L.A / California</p>
                        </div>    
                    </div>
                </div>
                <div className="grid grid-cols-10 px-2 pb-2 pr-[1px]">
                    <div className="col-span-2 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Fees Paid</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl text-left">21</p>
                        </div>    
                    </div>
                    <div className="col-span-3 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Plate Number</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl">K72F40</p>
                        </div>    
                    </div>
                    <div className="col-span-5 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Issue Date</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl text-left">09/11/2022</p>
                        </div>    
                    </div>
                </div>
                <div className="grid grid-cols-8 px-2 pb-2 pr-[1px]">
                    <div className="col-span-3 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">DMV</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl">California</p>
                        </div>    
                    </div>
                    <div className="col-span-5 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Current Lender</p>
                        <div className="bg-[#5C5CAD] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-white text-xl text-left">Capital One </p>
                        </div>    
                    </div>
                </div>
                <div className="grid grid-cols-11 px-2 pb-4 pr-[1px]">
                    <div className="col-span-5 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Vehicle Worth</p>
                        <div className="bg-[#FF5C85] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-[#08081C] text-xl text-left">$11.400 USD</p>
                        </div>    
                    </div>
                    <div className="col-span-6 mx-1">
                        <p className="text-white text-sm  mt-1 text-left font-[300] px-1">Floor Plan</p>
                        <div className="bg-[#FFEB33] rounded-md p-2 mx-[1px] font-medium">
                            <p className="text-[#08081C] text-xl text-left">$1.400 USD</p>
                        </div>    
                    </div>
                </div>
              </div>  
              <div className="col-span-6 relative">
                <div className="absolute top-1 right-3">
                  <button onClick={handlePtClose}>
                    <img
                      src={'/close_paper.png'}
                      width={'100%'}
                    />
                    </button>
                </div>
                <p className="absolute top-[100px] left-[50px] text-[#312A64] text-4xl  mt-1 text-left font-[400] px-1">Jeep Renegade</p>
                <p className="absolute top-[170px] left-[50px] text-[#312A64] text-md  mt-1 text-left font-[500] px-1">Inventory Number: K9127A</p> 
                <p className="absolute top-[200px] left-[50px] text-[#312A64] text-md  mt-1 text-left font-[500] px-1">Vehicle Number: K72F40K7F240FK</p>
                <p className="absolute top-[230px] left-[50px] text-[#312A64] text-md  mt-1 text-left font-[500] px-1">DMV: Los Angeles, California </p>
                <div className="grid grid-cols-12 px-2 pb-4 pr-[1px] absolute top-[450px] left-[30px]">
                  <div className="col-span-6 mx-1">
                    <button>
                      <div className="bg-[#FFED49] rounded-lg p-2 font-medium flex items-center">
                        <p className="text-[#333399] text-md mr-2 ml-3 text-center">Share PaperTitle</p>
                        <img src='/share.png' style={{width:15,height:17}} className="mr-3"></img>
                      </div>
                    </button>
                  </div>
                  <div className="col-span-6 mx-1">
                    <div className="bg-[#FF3366] rounded-md p-2 px-4 mx-[1px] font-medium">
                      <PDFDownloadLink document={<MyDocument />} fileName="Certificate title.pdf">
                          Download PaperTitle
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <div className="flex items-center py-5 text-[#4848A4]">
          <p className={ location.pathname === '/createtitle' ? `text-3xl px-3` : `text-3xl px-3 text-[#FF3366]`} style={{ fontWeight: 600, fontSize: '36px' }}>Certificate of a Title</p>
          <img src={require('../../../assets/img/File/Vector.png')} alt="" />
        </div>
        <div className="">
          <form>
            <SelectTablesArray />
          </form>
        </div>
        <hr className="mt-5" />
        <div className="flex">
          {
            SelectListArray.map((item, index) => (
              <div key={index} className="bg-white mt-5 mx-3 hover:bg-grey text-grey-darkest py-3 px-4 rounded inline-flex items-center text-[#4848A4]" style={{ borderRadius: 12, border: '1px solid grey' }}>
                <img src={require('../../../assets/img/Avatar/' + item.image + '.png')} alt={item.title} />
                <div className="px-3">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-[#9B96B6]">{item.name}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex mt-24 mb-3 items-center">
          <p style={{ fontSize: '14px' }}>
            Remember, once you have selected a Seller, Lender and DMV,
            an invitation will be sent to the aforementioned, where they can accept,
            decline or suggest a change of title.
          </p>
            {
              location.pathname === '/createtitle' ? 
              (
                <div className="flex items-center flex-col">
                  <button className="bg-[#FF3366] text-white px-4 py-2 w-[148px] mt-1 font-bold rounded  items-center" style={{ borderRadius: 4 }} onClick={continueHandler}>
                    Continue
                  </button>
                </div>
              )
              : (
                  <div className="flex items-center flex-col">
                    <button className="bg-[#333399] flex text-white px-4 py-2 w-[148px] font-bold rounded  items-center" style={{ borderRadius: 4 }} onClick={continueHandler}>
                      <span className="mr-2"> Paper Title</span>
                      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.1582 9.4869L7.47797 2.87987C9.35737 0.915044 12.4045 0.915044 14.2839 2.87987C16.1633 4.84469 16.1631 8.03048 14.2837 9.99531L6.99166 17.6188C5.73873 18.9287 3.70767 18.9285 2.45473 17.6186C1.2018 16.3087 1.20149 14.1852 2.45443 12.8753L9.74646 5.25184C10.3729 4.5969 11.3892 4.5969 12.0156 5.25184C12.6421 5.90678 12.6417 6.9684 12.0152 7.62334L5.69543 14.2304" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button className="bg-[#FF3366] text-white px-4 py-2 w-[148px] mt-1 font-bold rounded  items-center" style={{ borderRadius: 4 }} onClick={() => navigate('/createtitle')}>
                        Edit
                    </button>
                  </div>
              )
            }
            
        </div>
      </div>
    </div>
  )
}

export default SelectTables;