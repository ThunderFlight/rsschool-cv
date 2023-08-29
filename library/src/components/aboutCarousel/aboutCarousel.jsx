import classNames from "classnames";
import { useState } from "react";
import Library from "../../../public/images/sliderLibrary.jpg";
import OutDoor from "../../../public/images/sliderLibraryOutDoor.jpg";
import Stairs from "../../../public/images/sliderStairsLibrary.jpg";
import Statue from "../../../public/images/sliderStatue.jpg";
import Woman from "../../../public/images/sliderWomanInLibrary.jpg";
import { Title } from "../common/title/title";
import styles from "./aboutCarousel.module.scss";
import { FormInput } from "../common/formInput/formInput";


const carouselItems = [Woman, Statue, Library, Stairs, OutDoor];

export const AboutCarousel = ({ carouselWidth }) => {
  const [checked, setChecked] = useState(1);

  function changeCheckBox({target}) {
    setChecked(Number(target.value));
  }

  const radioButtonAttributes = [
    {
      type:"radio",
      id:"first",
      name:"pagination",
      checked:checked,
      onChange:changeCheckBox,
      value:1,
      label:""
    },
    {
      type:"radio",
      id:"second",
      name:"pagination",
      checked:checked,
      onChange:changeCheckBox,
      value:2,
      label:""
    },
    {
      type:"radio",
      id:"third",
      name:"pagination",
      checked:checked,
      onChange:changeCheckBox,
      value:3,
      label:""
    },
    {
      type:"radio",
      id:"four",
      name:"pagination",
      checked:checked,
      onChange:changeCheckBox,
      value:4,
      label:""
    },
    {
      type:"radio",
      id:"fives",
      name:"pagination",
      checked:checked,
      onChange:changeCheckBox,
      value:5,
      label:""
    },
  ]
  
  
  return (
    <section className={styles.aboutCarousel} id="carousel">
      <Title>About</Title>
      <p className={styles.aboutCarousel__aboutLibrary}>
        The Brooklyn Library is a free workspace, a large number of books and a
        cozy coffee shop inside
      </p>
      <div className={styles.aboutCarousel__carouselSlider}>
        <div className={styles.slide}>
          {carouselItems
            .slice(checked - 1, carouselWidth ? checked + 0 : checked + 2)
            .map((item, index) => {
              return <img src={item} key={index + 1} />;
            })}
        </div>
        <div className={styles.pagination}>
          {carouselWidth ? radioButtonAttributes.map((item, index)=>{
            return  <FormInput label={item.label} key={index + 1} type={item.type} id={item.id} name={item.name} checked={item.checked} onChange={item.onChange} value={item.value}/>
          }): radioButtonAttributes.slice(0,3).map((item, index)=>{
            return  <FormInput label={item.label} key={index + 1} type={item.type} id={item.id} name={item.name} checked={item.checked} onChange={item.onChange} value={item.value}/>
          })}
        </div>
      </div>
    </section>
  );
};
