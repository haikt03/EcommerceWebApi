import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
    productSelectors,
    fetchProductsAsync,
    fetchFiltersAsync,
} from "../../features/catalog/catalogSlice";

export const useProducts = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData,
    } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) {
            dispatch(fetchFiltersAsync());
        }
    }, [dispatch, filtersLoaded]);

    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData,
    };
};
