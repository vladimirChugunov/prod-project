import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider';

// Нужно для того что-бы когда мы передаем в диспатч данные, он знал о возвращаемых типах того что мы туда передали
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2 вариант типизации аналогичен 1
// export const useAppDispatch: () => AppDispatch = useDispatch;
