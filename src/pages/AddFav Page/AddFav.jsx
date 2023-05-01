import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { atomData, atomFav } from "../../AtomData/atomData";
import styles from "./AddFav.module.css";
export default function AddFav() {
  const [data, setData] = useRecoilState(atomData);
  const [input, setInput] = useState("");
  let [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [favs, setFavs] = useRecoilState(atomFav);
  const [reason, setReason] = useState("");
  let search = [];
  function handleSearch(e) {
    setInput(e.target.value);
    search = data.filter((ele) => {
      const temp = ele;
      if (temp.includes(input)) {
        return temp;
      }
    });

    setList(search);
  }
  function handleOnChange(e) {
    setSelectedValue(e.target.value);
  }
  function handleSubmit() {
    const fav = [...favs];
    fav.push({ name: selectedValue, reason: reason });
    setFavs(fav);
    console.log(favs);
  }
  return (
    <div>
      <div>
        <input onChange={handleSearch} type="text" />
        <br />
        <h5>Results</h5>
        <div className={styles.searchResults}>
          {list.map((ele) => (
            <form>
              <input
                type="radio"
                value={ele}
                checked={selectedValue === ele}
                onChange={handleOnChange}
              />
              <label>{ele}</label>
              <br />
            </form>
          ))}
        </div>
        <p>selected value:-{selectedValue}</p>
        <p>Why is this your fav?</p>
        <textarea onChange={(e) => setReason(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
