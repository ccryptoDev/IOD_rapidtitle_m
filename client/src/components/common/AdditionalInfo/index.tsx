import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import InputTextField from './InputTextField';
import TitleTypeDropdown from '../TitleTypeDropdown';
import TitleStatusDropdown from '../TitleStatusDropdown';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import api from 'utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { mintTitle, getNextTokenID } from 'utils/useWeb3';


function AdditionalInfo() {
  const dispatch = useDispatch();
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [titleType, setTitleType] = React.useState('Clear');
  const [titleStatus, setTitleStatus] = React.useState('Completed');
  const [modalOpened, setModalOpened] = React.useState(false);
  const [image1, setImage1] = React.useState();
  const [image2, setImage2] = React.useState();
  const [image3, setImage3] = React.useState();
  const [mintedTitleId, setTitleId] = React.useState(0);
  const carData = useSelector((state: any) => state.carData);

  const JWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

  const handleOpen = () => setModalOpened(true);
  const handleClose = (e: object, reason: string) => {
    if (reason === 'backdropClick') {
      return;
    }
    setModalOpened(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 490,
    height: 613,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  };

  const detailHandler = () => {
    navigate(`/titleDetail/${mintedTitleId}`);
    // navigate('/home')
  };

  const uploadIPFS = async (imageFile: any, index: Number, titleID: Number) => {
    const formData = new FormData();
    //@ts-ignore
    formData.append('file', imageFile);

    const metadata = JSON.stringify({
      //@ts-ignore
      name: "Title" + titleID + "_vehicleImg" + index
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0
    });
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          //@ts-ignore
          maxBodyLength: 'Infinity',
          headers: {
            //@ts-ignore
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT
          }
        }
      );

      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };
  
  const creatingTitle = async () => {
    // get next titleID
    const nextTokenID = await getNextTokenID();

    dispatch({ type: 'SET_LOADING', payload: true });
    const vehicleCID1 = await uploadIPFS(image1, 1, nextTokenID);
    const vehicleCID2 = await uploadIPFS(image2, 2, nextTokenID);
    const vehicleCID3 = await uploadIPFS(image3, 3, nextTokenID);

    let requestBody = carData;
    requestBody.images = [
      `https://gateway.pinata.cloud/ipfs/${vehicleCID1}`,
      `https://gateway.pinata.cloud/ipfs/${vehicleCID2}`,
      `https://gateway.pinata.cloud/ipfs/${vehicleCID3}`
    ];
    var data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1
      },
      pinataMetadata: {
        name: 'Title' + nextTokenID + "_metadata",
        keyvalues: {}
      },
      pinataContent: requestBody
    });

    var config = {
      method: 'POST',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
      },
      data
    };

    //@ts-ignore
    const res = await axios(config);
    const vehicleCID = res.data.IpfsHash;

    // Mint new title (metadataURI, dealer, lender, seller, DMV, holdsNumber)
    const tx = await mintTitle(vehicleCID, 2, 3, 4, 8, 8);

    console.log('tx----------', tx);
    
    // get tokenID from Tx event
    let _tokenId = tx.events.TitleCreated.returnValues._tokenId;
    console.log('token_id ---', _tokenId);
    setTitleId(_tokenId);

    // store title metadata into db
    let title_metadata = {
      metadata: requestBody,
      titleId: nextTokenID,
      metadataURI: vehicleCID,
      numHolds: 8,
      completedHolds: 0,
      status: 0
    };
    const resDB = await api.post('/v2/titles/mint', title_metadata);

    // spinner off
    dispatch({ type: 'SET_LOADING', payload: false });

    if ( tx !== false && tx !== undefined && resDB.data == "success" ) {
      handleOpen();
    } else {
      // in case of error
      alert("An error is caused while creating a Title!");
    }
  };

  const handleSubmission = async (imageFile: any, index: number) => {
    if (index === 1) {
      setImage1(imageFile.file);
    }
    if (index === 2) {
      setImage2(imageFile.file);
    }
    if (index === 3) {
      setImage3(imageFile.file);
    }
  };

  const runAfterImageDelete = (file: any) => {
    console.log({ file });
  };

  const handleChange1 = () => {
    setIsOpen1((current) => !current);
  };

  const handleChange2 = () => {
    setIsOpen2((current) => !current);
  };

  const dropdownHandler = (index: any, data: any) => {
    //title type
    if(index === 1){
      setTitleType(data);
      setIsOpen1(false);
      setIsOpen2(false);
    }
    else if(index === 2){
      setTitleStatus(data);
      setIsOpen1(false);
      setIsOpen2(false);
    }
  }

  return (
    <div className=" store-card col-span-2 p-2 w-full">
      <Modal
        open={modalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus={false}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color={'#4848A4'}
          >
            The Title has been Successfully created
          </Typography>
          <img
            src={require('assets/img/thumb.png')}
            className="mt-[39px]"
          ></img>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color={'#4848A4'}
            className="!mt-[50px]"
          >
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <div className="flex items-end flex-col mt-[50px]">
            <button
              className="bg-[#FF3366] text-white px-4 py-3 mt-1 font-bold  items-center"
              style={{ borderRadius: 30 }}
              onClick={detailHandler}
            >
              See the Title Details
            </button>
          </div>
        </Box>
      </Modal>

      <div className=" px-8 py-4">
        <div className="flex items-center py-5 text-[#4848A4]">
          <p
            className={`text-3xl px-3`}
            style={{ fontWeight: 600, fontSize: '36px' }}
          >
            {' '}
            Other Information
          </p>
          <img src={require('../../../assets/img/File/Vector.png')} alt="" />
        </div>
        <div className="flex">
          <ImageUploader
            style={{
              height: 180,
              width: 180,
              background: '#4848A4',
              borderRadius: 5,
              marginLeft: 20,
              color: 'white'
            }}
            onFileAdded={(img) => handleSubmission(img, 1)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
          <ImageUploader
            style={{
              height: 180,
              width: 180,
              background: '#4848A4',
              borderRadius: 5,
              marginLeft: 20
            }}
            onFileAdded={(img) => handleSubmission(img, 2)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
          <ImageUploader
            style={{
              height: 180,
              width: 180,
              background: '#4848A4',
              borderRadius: 5,
              marginLeft: 20
            }}
            onFileAdded={(img) => handleSubmission(img, 3)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
        </div>
        <div className="p-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <InputTextField
                  label='Estimated Vehicle Worth'
                  defaultValue=''
                  onChange={(e) => dispatch({ type: 'SET_VEHICLE_WORTH', payload:e.target.value })}
                  value={useSelector((state:any) => state.carData.cost)}
                  // id="reddit-input"
                  variant="filled"
                  style={{ marginTop: 11, width: '100%' }}
              />
            </div>
            <div className="">
              <InputTextField
                label="Floor Plan"
                defaultValue=""
                onChange={(e) => dispatch({ type: 'SET_FLOOR_PLAN', payload:e.target.value })}
                value={useSelector((state:any) => state.carData.floor_plan)}
                // id="reddit-input"
                variant="filled"
                style={{ marginTop: 11, width: '100%' }}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <div className="px-4 py-4">
                <div className="flex items-end py-3 text-[#FF3366]">
                  <h1 className="text-2xl flex-1"> Type Of Title</h1>
                </div>
                {
                  !isOpen1 && (
                    <div
                      className="flex items-center p-[7px] cursor-pointer bg-[#FAFBFD]"
                      onClick={handleChange1}
                    >
                      <img
                        src={require('../../../assets/img/Avatar/car_ins.png')}
                        alt=""
                      />
                      <h3
                        className="px-2 flex-1 text-black"
                        style={{ fontSize: '16px', fontWeight: 600 }}
                      >
                        {titleType}
                      </h3>
                      <img
                        className="ps-3 pr-2"
                        src={require('../../../assets/img/Filter.png')}
                        alt=""
                      />
                      <img
                        className="pe-4"
                        src={require('../../../assets/img/Product/Arrow/Vector.png')}
                        alt=""
                      />
                    </div>
                  )
                }
                {
                  isOpen1 && (
                    <div
                      className="flex items-center p-[7px] cursor-pointer bg-[#FAFBFD]"
                      onClick={handleChange1}
                    >
                      <img
                        src={require('../../../assets/img/Avatar/car_ins.png')}
                        alt=""
                      />
                      <h3
                        className="px-2 flex-1 text-black"
                        style={{ fontSize: '16px', fontWeight: 600 }}
                      >
                        {titleType}
                      </h3>
                      <img
                        className="ps-3 pr-2"
                        src={require('../../../assets/img/Filter.png')}
                        alt=""
                      />
                      <img
                        className="pe-4"
                        src={require('../../../assets/img/Product/Arrow/Vector.png')}
                        alt=""
                      />
                    </div>
                  )
                }                
                {isOpen1 && <TitleTypeDropdown handler={dropdownHandler} titleType = {titleType} />}
              </div>
            </div>
            <div className="col-span-2">
              <div className="px-4 py-4">
                <div className="flex items-end py-3 text-[#FF3366]">
                  <h1 className="text-2xl flex-1"> Status</h1>
                </div>
                {
                  !isOpen2 && (
                    <div
                      className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]"
                      onClick={handleChange2}
                    >
                      <img
                        src={require('../../../assets/img/Avatar/status.png')}
                        alt=""
                      />
                      <h3
                        className="px-2 flex-1 text-black"
                        style={{ fontSize: '16px', fontWeight: 600 }}
                      >
                        {titleStatus}
                      </h3>
                      <img
                        className="pe-4"
                        src={require('../../../assets/img/Product/Arrow/Vector.png')}
                        alt=""
                      />
                    </div>
                  )
                }
                {
                  isOpen2 && (
                    <div
                      className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]"
                      onClick={handleChange2}
                    >
                      <img
                        src={require('../../../assets/img/Avatar/status.png')}
                        alt=""
                      />
                      <h3
                        className="px-2 flex-1 text-black"
                        style={{ fontSize: '16px', fontWeight: 600 }}
                      >
                        {titleStatus}
                      </h3>
                      <img
                        className="pe-4"
                        src={require('../../../assets/img/Product/Arrow/Vector.png')}
                        alt=""
                      />
                    </div>
                  )
                }
                {isOpen2 && <TitleStatusDropdown handler={dropdownHandler} titleStatus={titleStatus} />}
              </div>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="my-3 items-center">
            <div className="flex items-end flex-col">
              <button
                className="bg-[#FF3366] text-white px-4 py-2 w-[148px] mt-1 font-bold rounded  items-center"
                style={{ borderRadius: 4 }}
                onClick={creatingTitle}
              >
                Create Title
              </button>
            </div>
            <p
              className="text-[#6B6B77] mt-[16px]"
              style={{ fontSize: '14px' }}
            >
              The titles type may change unexpectedly depending on the DMVs
              needs on the specific title, see the titles comments on each title
              and reports for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
