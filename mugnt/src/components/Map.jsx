import '../styles/Map.css';
import Sidebar from './Sidebar.jsx';
import { useEffect, useRef } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useRecoilValue, useRecoilState } from 'recoil';
import { SIDEBAROPEN } from '../store.ts';
import Path from './Path.jsx';
import SidebarBtn from './SidebarBtn.jsx';

function Map(props) {
    const sidebaropen = useRecoilValue(SIDEBAROPEN);

    return (
        <div class="map-body">

            <Sidebar/>
            <SidebarBtn/>
            <Path/>

        </div>
    );
}

export default Map;