import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomData, atomFav, atomPackageName } from "../../AtomData/atomData";
import axios from "axios";
export default function Home() {
    const [info, setInfo] = useRecoilState(atomData);
    const [packageList, setPackageList] = useRecoilState(atomPackageName)
    const [favList, setFavList] = useRecoilState(atomFav)
  useEffect(() => {
      axios.get('https://api.npms.io/v2/search?q=reactjs')
          .then((res) => setInfo(res.data.results.map((ele)=>{return(ele.package.name)}))) 
      console.log("info",info)
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Favourite NPM Packages</h1>
          <div className={styles.addDiv}>
              <div>
          <h3>You don't have any favourites yet, Please Add</h3>
        <br />
              <button onClick={() => navigate("/fav")}>Add Fav</button>
              </div>
             
      </div>
    </div>
  );
}
