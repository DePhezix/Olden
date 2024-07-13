import { useContext, useState, useEffect } from "react";
import Slider from 'react-slick';

import { CategoriesContext } from '../../contexts/categories.contexts.jsx'
import { AdminContext} from "../../contexts/admin.context.jsx";
import { LoadingFeedbackContext } from "../../contexts/loadingFeedback.context.jsx";

import {editCategories, getCategoriesAndDocuments} from "../../utils/firebase/firestore.utils.js";

import './admin-card-category.styles.scss'

const sliderSettings = {
    autoplay: true,
    dots: false,
    infinite: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};

const categoriesArrToObj = (arr) => {
    const newObj = {
        id: arr ? arr[0] : 0,
        imageUrl: arr ? [
            arr[1],
            arr[4] ? arr[4] : arr[1]
        ] : [],
        route: arr ? arr[2] : '',
        items: arr ? arr[3] : [],
        showInHome: arr ? arr[5] : false
    }

    return newObj
}

function AdminCardCategory({ title, categoryCreatingCard, providedClassName }) {
    const [ visibleFunctions, setVisibleFunctions ] = useState(false)
    const [{x, y}, setCoordinates] = useState({x: 0, y: 0})
    const [editHover, setEditHover] = useState(false)
    const [edit, setEdit] = useState({editingImage: false, editingRoute: false, editingName: false, editingLocation: false})

    const { categoriesMap, setCategoriesMap } = useContext(CategoriesContext)
    const { rightClickedTitle, setRightClickedTitle } = useContext(AdminContext)
    const { setIsLoading, setIsSuccessful} = useContext(LoadingFeedbackContext)

    const { id, imageUrl, route, items, showInHome } = categoriesArrToObj(categoriesMap[title])

    useEffect(() => {
        const cancelFunctions = () => {
            setVisibleFunctions(false);
            setEditHover(false)
        }
        window.addEventListener("click", cancelFunctions);
        return () => {
            window.removeEventListener("click", cancelFunctions);
        };
    }, [])

    useEffect(() => {
        if (rightClickedTitle !== title) {
            setVisibleFunctions(false);
        }
    }, [rightClickedTitle, title])

    const handleCategoryClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        e.preventDefault()
        setVisibleFunctions(true)
        setCoordinates({x: e.pageX, y: e.pageY})
        setRightClickedTitle(title);
    }

    const reloadInfo = async () => {
        setIsLoading(true)

        try {
            const newCategoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(newCategoryMap)
            setIsSuccessful('')
        } catch (err) {
            setIsSuccessful(err.code)
        }
    }

    const handleEditingClick = (editingItem) => {
        setEdit({...edit, [editingItem]: !edit[editingItem]})
    }

    return (
        <div className='admin-card-category-container'>
            <div className={`admin-card-info-container ${providedClassName}`} onContextMenu={handleCategoryClick}>
                <Slider {...sliderSettings} className='admin-card-category-slider'>
                    {imageUrl.map(url => (
                        <div key={id} className='slide'>
                            <div style={{
                                backgroundImage: `url(${url})`
                            }} className='image'/>
                        </div>
                    ))}
                </Slider>
                <div className='categories-container'>
                    <h1>{title.toUpperCase()}</h1>
                    <span>{route}</span>
                </div>
            </div>
            {
                visibleFunctions &&
                <div className='visibleFunctions-category-admin-container' style={{left: x, top: y}}>
                        <span className='category-editing-container'
                              onMouseEnter={() => setTimeout(setEditHover(true), 1000)}
                              onMouseLeave={() => setEditHover(false)}><span>Edit Category</span>
                            <div className={editHover && 'editing'}>
                                <span onClick={() => handleEditingClick('editingImage')}>Edit Images</span>
                                <span onClick={() => handleEditingClick('editingRoute')}>Edit Route</span>
                                <span onClick={() => handleEditingClick('editingName')}>Edit Name</span>
                                <span onClick={() => handleEditingClick('editingLocation')}
                                      className={`${showInHome ? '' : 'disabledShowInHome'}`}>Edit Location</span>
                            </div>
                        </span>
                    <span className='showInHome' onClick={() => {
                        editCategories(title, {showInHome: !showInHome});
                        reloadInfo()
                    }}>{!showInHome ? 'Show in Home Page' : "Don't show in Home Page"}</span>
                </div>
            }
            <div className={`editingImage ${edit["editingImage"] && 'visible'}`}
                 onClick={() => handleEditingClick("editingImage")}>
                
            </div>
        </div>
    );

}

export default AdminCardCategory;
