import '../styles/SidebarBtn.css';
import { useEffect, useRef } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useRecoilValue, useRecoilState } from 'recoil';
import { SIDEBAROPEN } from '../store.ts';

function SidebarBtn(props) {
    const [sidebaropen, setSidebaropen] = useRecoilState(SIDEBAROPEN);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if(!sidebaropen) {
            sidebarRef.current.style.transform = 'translateX(0)';
        } else {
            sidebarRef.current.style.transform = 'translateX(23rem)';
        }
    }, [sidebaropen])

    return (
        <div class="sidebar-btn-wrapper" ref={sidebarRef}>
            <div class="sidebar-btn" onClick={() => {setSidebaropen(!sidebaropen)}}>
                {sidebaropen ? 
                    <ArrowLeftIcon style={{color: "grey"}}/> :
                    <ArrowRightIcon style={{color: "grey"}}/>
                }
                
            </div>
        </div>
    )
}

export default SidebarBtn;