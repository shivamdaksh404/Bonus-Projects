import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomData, atomFav, atomPackageName } from "../../AtomData/atomData";
import { GrFormView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { getFavs } from "../../services/utlities";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState("");
  const [render, setRender] = useState(0);

  let check = getFavs();
  const navigate = useNavigate();
  useEffect(() => {
    setList(() => getFavs());
    if (check.length !== 0) {
      setIsVisible(false);
    } else setIsVisible(true);
  }, [render]);

  // const navigate = useNavigate();

  function handleDelete(name) {
    Swal.fire({
      title: "Do you want to delete this favourite?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "delete");
        const temp = [...check];
        const newData = temp.filter((ele) => ele.name != name);
        localStorage.setItem("favs", JSON.stringify(newData));
        setRender(render + 1);
        // favList = getFavs();
      }
    });
  }

  function handleUpdate(id) {
      let newList = [...check]
      let current = newList.findIndex((ele, index) => index == id)
      let obj = { ...newList[current] }
        console.log(obj)
      obj.isReasonVisible = true
      obj.isUpdateVisible =!obj.isUpdateVisible
      newList[current] = obj
      localStorage.setItem('favs', JSON.stringify(newList))
      setRender(render+1)
  }
  function handleView(id) {
    let newList = [...check];
    const current = newList.findIndex((ele, index) => index == id);
    console.log(newList[current]);

    const obj = { ...newList[current] };
    obj.isReasonVisible = !obj.isReasonVisible;
    newList[current] = obj;
    localStorage.setItem("favs", JSON.stringify(newList));
    setRender(render + 1);
  }
  function handleDone(id) {

      let newList = [...check]
      const current = newList.findIndex((ele,index) => index == id)
      const obj = { ...newList[current] }
      obj.reason = edit
      obj.isUpdateVisible = false
      newList[current] = obj;
      localStorage.setItem('favs', JSON.stringify(newList))
      setRender(render + 1);
  }
  return (
    <div className={styles.mainContainer}>
      <div>
        <h1 style={{color:'white'}}>Welcome to Favourites Package</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/fav")}
          style={isVisible ? { display: "none" } : {}}
        >
          Add fav
        </Button>
      </div>

      <div
        className={styles.addDiv}
        style={isVisible ? {} : { display: "none" }}
      >
        <h4>You don't have any Favourites yet. Please add</h4><br/>
        <Button onClick={() => navigate("/fav")} variant="contained">
          Add fav
        </Button>
      </div>
      <div>
        <div className={styles.headerTwo}></div>
        <div>
          {check.map((ele, index) => (
            <div className={styles.contentWrapper}>
              <div>
                <p className={styles.packageName}>{ele.name}</p>
                <p style={ele.isReasonVisible ? {} : { display: "none" }}>
                  {ele.reason}
                </p>
                <div
                  style={ele.isUpdateVisible ? {} : { display: "none" }}
                  className={styles.updateDiv}
                >
                  <textarea
                    onChange={(e) => setEdit(e.target.value)}
                    value={edit}
                    className={styles.update}
                  />
                  <Button onClick={()=>handleDone(index)} variant="outlined">Done</Button>
                </div>
              </div>

              <div className={styles.iconWrapper}>
                <GrFormView size={30}  onClick={() => handleView(index)} />
                <AiFillEdit size={25} onClick={() => handleUpdate(index)} />
                <MdDelete size={25} style={{color:'red'}} onClick={() => handleDelete(ele.name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
