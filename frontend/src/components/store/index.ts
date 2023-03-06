import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import careerReducer from './career/careerSlice';
import galleryReducer from './gallery/gallerySlice';
import eventReducer from './event/eventSlice';
import bookingReducer from './booking/bookingSlice';
import adminReducer from './admin/adminSlice';
import offerReducer from './offer/offerSlice';

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        booking: bookingReducer,
        career: careerReducer,
        event: eventReducer,
        gallery: galleryReducer,
        offer: offerReducer,
    }
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;