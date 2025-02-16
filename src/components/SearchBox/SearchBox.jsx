import s from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filters.name);

  const handleChange = e => {
    //const newValue = e.target.value;
    // console.log('Search value updated:', newValue);
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.filter_wrapper}>
      <p className={s.search_label}>Find contacts by name</p>
      <input
        type="text"
        className={s.search_input}
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
