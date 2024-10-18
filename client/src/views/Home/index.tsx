import React, { useEffect, useState } from 'react';
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { loadTitles, loadTitles_search } from 'store/actions/title';
import { getAllTitles } from 'utils/useWeb3';

import SideBar from 'components/common/SideBar';
import HeaderBar from 'components/common/HeaderBar';
import TitleList from 'components/common/TitleList';
import TitleTables from 'components/common/TitleTables';
import FilterCards from 'components/common/FilterCards';
import Footer from 'components/common/Footer';

function Home() {
  const [titleData, setTitleData] = React.useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [filterMode, setFilterMode] = useState('pending');

  useEffect(() => {
    const fetchTitles = async () => {
      // fetch titles from db
      const data = await loadTitles(filterMode);

      // fetch titles from smart contract
      // const data : any = await getAllTitles();
      console.log(data);
      setTitleData(data);
    };
    fetchTitles();   
  }, [viewMode, filterMode]);

  const changeViewMode = () => {
    viewMode === 'table' ? setViewMode('list') : setViewMode('table');
  }

  const changeFilterMode = () => {
    filterMode === 'pending' ? setFilterMode('complete') : setFilterMode('pending');
  }

  const search_title = (searchTitle: any) => {
    const fetchTitles = async () => {
      const data = await loadTitles_search(searchTitle);
      if(!data){
        setTitleData([]);
        return;
      }
      setTitleData(data);
    };
    fetchTitles();
  }

  return (
    <>
      <div className="px-[24px]">
        <div className='flex'>
          <SideBar/>
          <div className='w-full py-5'>
            <HeaderBar search_title = {search_title} titledata = {titleData}/>
            <div className='flex w-full'>
              {
                viewMode === 'list' ? (
                  <>
                    <TitleList titleVault={titleData} viewMode={viewMode} filterMode={filterMode} changeView={changeViewMode} changeFilterMode={changeFilterMode} />
                    <FilterCards />
                  </>
                ) : 
                (
                  <TitleTables titleVault={titleData} viewMode={viewMode} filterMode={filterMode} changeView={changeViewMode} changeFilterMode={changeFilterMode} />
                )
              }
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default Home;
