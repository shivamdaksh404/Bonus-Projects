import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomData, atomFav } from "../../AtomData/atomData";
import styles from "./AddFav.module.css";
import axios from "axios";
import { getFavs, getPackages } from "../../services/utlities";
import Swal from "sweetalert2";
import { TextField, ToggleButton } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { Button } from "@mui/material";


export default function AddFav() {
  const [packages, setPackage] = useRecoilState(atomData);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  let [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get("https://api.npms.io/v2/search?q=reactjs").then((res) =>
      setPackage(
        res.data.results.map((ele) => {
          return ele.package.name;
        })
      )
    );
    localStorage.setItem("packages", JSON.stringify(packages));
  }, []);


  const pack = getPackages();
  let search = []; //use
  let favs = getFavs();
  
  function handleSearch(e) {     //use
      setInput(e.target.value);
    search = pack.filter((ele) => {
      const temp = ele;
      if (temp.includes(input)) {
        return temp;
      }
    });

    setList(search);
  }



  function handleOnChange(e) {  //use
    setSelectedValue(e.target.value);
  }



  function handleSubmit() {
    const fav = [...favs];
    console.log(fav);
    const check = fav.find((ele) => ele.name == selectedValue);
    if (check) {
      Swal.fire("Package already added as Favourite");
    } else if (reason.length == 0) {
      Swal.fire("Please mention why this is your favourite");
    } else if (selectedValue == null) {
      Swal.fire("Please select a package to add as Favourite");
    } else {
      setCount(count + 1);
      fav.push({
        id: count,
        isReasonVisible: false,
        isUpdateVisible: false,
        name: selectedValue,
        reason: reason,
      });

      console.log(fav);
      localStorage.setItem("favs", JSON.stringify(fav));

      navigate("/");
    }
  }



  return (
    <div className={styles.mainContainer}>
      <div>
        <h1>Search Packages & Add in Favorite List</h1>
        <div className={styles.searchBar}>
          <span>
            <BsSearch />
          </span>
          &nbsp;
          <input onChange={handleSearch} type="text" />
        </div>

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

        <div className={styles.lowerSection}>
          <h3>Why is this your favorites?</h3>
          <textarea
            className={styles.textArea}
            placeholder="Why is this your favorites"
            onChange={(e) => setReason(e.target.value)}
          />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            style={{ backgroundColor: "whitesmoke", color: "black" }}
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
