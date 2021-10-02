import { atom } from 'recoil';

const SIDEBAROPEN = atom({
    key: "SIDEBAROPEN",
    default: false
});

const MUGGEDPERCENT = atom({
    key: "MUGGEDPERCENT",
    default: 50
});

const HOMICIDEPERCENT = atom({
    key: "HOMICIDEPERCENT",
    default: 50
});

const ASSAULTPERCENT = atom({
    key: "ASSAULTPERCENT",
    default: 50
});

const THEFTPERCENT = atom({
    key: "THEFTPERCENT",
    default: 50
});

const SHOOTINGPERCENT = atom({
    key: "SHOOTINGPERCENT",
    default: 50
});

const CITY = atom({
    key: "CITY",
    default: "pittsburgh"
})

export { SIDEBAROPEN, MUGGEDPERCENT, HOMICIDEPERCENT, THEFTPERCENT, ASSAULTPERCENT, SHOOTINGPERCENT, CITY };