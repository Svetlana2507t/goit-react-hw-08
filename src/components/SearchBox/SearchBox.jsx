import s from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilter,
  selectNameFilter,
} from '../../redux/filters/filtersSlice';

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  //console.log('Filter name:', nameFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.filter_wrapper}>
      <p className={s.search_label}>Find contacts by name</p>
      <input
        type="text"
        className={s.search_input}
        value={nameFilter}
        onChange={handleChange}
      />
    </div>
  );
}
