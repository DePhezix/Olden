import { createContext, useState, useEffect, useContext }  from 'react'

import { LoadingFeedbackContext } from './loadingFeedback.context';

import { getCategoriesAndDocuments } from "../utils/firebase/firestore.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export function CategoriesProvider({children}) {
    const { setIsLoading } = useContext(LoadingFeedbackContext);

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            setIsLoading(true)

            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)

            setIsLoading(false)
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
