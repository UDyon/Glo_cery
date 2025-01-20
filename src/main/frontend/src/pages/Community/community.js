import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import {ContentsWrapper, SearchButton, SearchInput, SearchWrapper} from "./style";
import Contents from "./components/contents";
import {useState} from "react";

export default function Community() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    }
    return (
        <>
            <Reset/>
            <TopBarComponent/>
            <ContentsWrapper>
                <SearchWrapper>
                    <SearchInput onChange={handleSearchInput} type='text' value={searchValue} placeholder='검색 내용'/>
                    <SearchButton>
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.1363 14.0717L8.47794 9.41445C8.10824 9.71015 7.68307 9.94424 7.20245 10.1167C6.72183 10.2892 6.2104 10.3755 5.66816 10.3755C4.32488 10.3755 3.18815 9.91024 2.25796 8.97978C1.32777 8.04932 0.862432 6.91286 0.861939 5.57039C0.861446 4.22793 1.32679 3.09147 2.25796 2.16101C3.18913 1.23055 4.32587 0.76532 5.66816 0.76532C7.01045 0.76532 8.14742 1.23055 9.07909 2.16101C10.0108 3.09147 10.4759 4.22793 10.4744 5.57039C10.4744 6.1125 10.3881 6.62381 10.2156 7.10432C10.043 7.58483 9.8089 8.00989 9.51313 8.37951L14.1715 13.0367L13.1363 14.0717ZM5.66816 8.89698C6.59243 8.89698 7.37818 8.57369 8.02542 7.9271C8.67266 7.28051 8.99603 6.49494 8.99554 5.57039C8.99504 4.64585 8.67167 3.86053 8.02542 3.21443C7.37917 2.56833 6.59341 2.24479 5.66816 2.2438C4.7429 2.24282 3.95739 2.56636 3.31163 3.21443C2.66587 3.8625 2.34225 4.64782 2.34077 5.57039C2.3393 6.49297 2.66291 7.27854 3.31163 7.9271C3.96035 8.57566 4.74586 8.89895 5.66816 8.89698Z"
                                fill="#110078"/>
                        </svg>
                    </SearchButton>
                </SearchWrapper>
                <Contents searchValue={searchValue} />
            </ContentsWrapper>

        </>
    );
}