import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as selectorHook,
} from 'react-redux'
import { AppDispatch, AppThunk, RootState } from '../services/reducers'

export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
