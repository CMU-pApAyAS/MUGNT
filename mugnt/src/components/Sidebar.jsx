import React, { useState, useRef, createRef, useEffect } from 'react';
import '../styles/Sidebar.css';
import { SIDEBAROPEN, MUGGEDPERCENT, HOMICIDEPERCENT, ASSAULTPERCENT, THEFTPERCENT, PROPERTYPERCENT, SHOOTINGPERCENT, CITY } from '../store.ts';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Slider } from '@mui/material';

function Sidebar(props) {
    const sidebaropen = useRecoilValue(SIDEBAROPEN);
    const [moreoptionsopen, setMoreoptionsopen] = useState(false);

    const [city, setCity] = useRecoilState(CITY);

    const [muggedpercent, setMuggedpercent] = useRecoilState(MUGGEDPERCENT);
    const handleMuggedPercentChange = (event, newValue) => {
        setMuggedpercent(newValue);
    };

    const [homicidepercent, setHomicidepercent] = useRecoilState(HOMICIDEPERCENT);
    const handleHomicidepercentChange = (event, newValue) => {
        setHomicidepercent(newValue);
    };

    const [assaultpercent, setAssaultpercent] = useRecoilState(ASSAULTPERCENT);
    const handleAssaultpercentChange = (event, newValue) => {
        setAssaultpercent(newValue);
    };

    const [theftpercent, setTheftpercent] = useRecoilState(THEFTPERCENT);
    const handleTheftpercentChange = (event, newValue) => {
        setTheftpercent(newValue);
    };

    const [shootingpercent, setShootingpercent] = useRecoilState(SHOOTINGPERCENT);
    const handleShootingpercentChange = (event, newValue) => {
        setShootingpercent(newValue);
    };

    const sidebarRef = useRef(null);
    const moreoptionsRef = useRef(null);

    useEffect(() => {
        if(!sidebaropen) {
            sidebarRef.current.style.transform = 'translateX(-23rem)';
        } else {
            sidebarRef.current.style.transform = 'translateX(0rem)';
        }
    }, [sidebaropen])

    return (
        <div className={"sidebar-wrapper"} ref={sidebarRef}>
            <div class="sidebar-wrapper-wrapper">
                <div class="sidebar-title">
                    MUGN'T
                </div>
                <div class="sidebar-subtitle">
                    The premier navigation platform <br/> for balancing speed and safety
                </div>

                <div class="sidebar-divider"></div>
                <div class="sidebar-sectiontitle">OPTIONS</div>
                <div class="sidebar-options-wrapper">
                    <div class="sidebar-query sidebar-query-1">1. Select a city</div>
                    <div class="sidebar-options-offset">
                        <div class="sidebar-city-wrapper">
                            <div className={"sidebar-city " + (city === 'pittsburgh' ? "sidebar-city-selected":"")} onClick={() => {setCity('pittsburgh')}}>
                                Pittsburgh
                            </div>
                            <div className={"sidebar-city " + (city === 'baltimore' ? "sidebar-city-selected":"")} onClick={() => {setCity('baltimore')}}>
                                Baltimore
                            </div>
                            <div className={"sidebar-city " + (city === 'detroit' ? "sidebar-city-selected":"")} onClick={() => {setCity('detroit')}}>
                                Detroit
                            </div>
                        </div>
                    </div>
                    

                    <div class="sidebar-query sidebar-query-2">
                        2. I'm okay with getting mugged 
                        <div class="sidebar-query-percent">
                        {muggedpercent}
                        </div>
                        % of the time
                    </div>
                    <div class="sidebar-options-offset">
                        <Slider value={muggedpercent} sx={{color: "#e7d01f"}} onChange={handleMuggedPercentChange} aria-label="Default" valueLabelDisplay="auto" style={{width: "14rem"}}/>
                    </div>
                    
                </div>
                { moreoptionsopen &&
                    <div class="sidebar-query-extra">
                        <div class="sidebar-query sidebar-query-2">
                            3. I'm okay with getting murdered 
                            <div class="sidebar-query-percent">
                            {homicidepercent}
                            </div>
                            % of the time
                        </div>
                        <div class="sidebar-options-offset">
                            <Slider value={homicidepercent} sx={{color: "#e7d01f"}} onChange={handleHomicidepercentChange} aria-label="Default" valueLabelDisplay="auto" style={{width: "14rem"}}/>
                        </div>

                        <div class="sidebar-query sidebar-query-2">
                            4. I'm okay with getting assaulted 
                            <div class="sidebar-query-percent">
                            {assaultpercent}
                            </div>
                            % of the time
                        </div>
                        <div class="sidebar-options-offset">
                            <Slider value={assaultpercent} sx={{color: "#e7d01f"}} onChange={handleAssaultpercentChange} aria-label="Default" valueLabelDisplay="auto" style={{width: "14rem"}}/>
                        </div>

                        <div class="sidebar-query sidebar-query-2">
                            5. I'm okay with getting robbed 
                            <div class="sidebar-query-percent">
                            {theftpercent}
                            </div>
                            % of the time
                        </div>
                        <div class="sidebar-options-offset">
                            <Slider value={theftpercent} sx={{color: "#e7d01f"}} onChange={handleTheftpercentChange} aria-label="Default" valueLabelDisplay="auto" style={{width: "14rem"}}/>
                        </div>

                        <div class="sidebar-query sidebar-query-2">
                            6. I'm okay with getting shot 
                            <div class="sidebar-query-percent">
                            {shootingpercent}
                            </div>
                            % of the time
                        </div>
                        <div class="sidebar-options-offset">
                            <Slider value={shootingpercent} sx={{color: "#e7d01f"}} onChange={handleShootingpercentChange} aria-label="Default" valueLabelDisplay="auto" style={{width: "14rem"}}/>
                        </div>
                    </div>
                }
                

                <div class="sidebar-moreoptions" onClick={() => {setMoreoptionsopen(!moreoptionsopen)}}>
                    {moreoptionsopen ? "Less Options": "More Options"}
                </div>

                <div class="sidebar-divider"></div>
                <div class="sidebar-sectiontitle">
                    HOW MUCH SAFER AM I?
                </div>
                <div class="sidebar-safety-wrapper">
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Chances of getting...</div>
                        <div class="sidebar-safety-col2">Shortest path</div>
                        <div class="sidebar-safety-col3">MUGN'T path</div>
                        <div class="sidebar-safety-col4">% safer</div>
                    </div>
                    <div class="sidebar-safety-divider"></div>
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Mugged</div>
                        <div class="sidebar-safety-col2">-</div>
                        <div class="sidebar-safety-col3">-</div>
                        <div class="sidebar-safety-col4">-</div>
                    </div>
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Murdered</div>
                        <div class="sidebar-safety-col2">-</div>
                        <div class="sidebar-safety-col3">-</div>
                        <div class="sidebar-safety-col4">-</div>
                    </div>
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Assaulted</div>
                        <div class="sidebar-safety-col2">-</div>
                        <div class="sidebar-safety-col3">-</div>
                        <div class="sidebar-safety-col4">-</div>
                    </div>
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Robbed</div>
                        <div class="sidebar-safety-col2">-</div>
                        <div class="sidebar-safety-col3">-</div>
                        <div class="sidebar-safety-col4">-</div>
                    </div>
                    <div class="sidebar-safety-row">
                        <div class="sidebar-safety-col1">Shot</div>
                        <div class="sidebar-safety-col2">-</div>
                        <div class="sidebar-safety-col3">-</div>
                        <div class="sidebar-safety-col4">-</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;