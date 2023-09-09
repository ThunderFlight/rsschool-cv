import { useEffect, useState } from "react";
import Library from "../../../public/images/sliderLibrary.jpg";
import OutDoor from "../../../public/images/sliderLibraryOutDoor.jpg";
import Stairs from "../../../public/images/sliderStairsLibrary.jpg";
import Statue from "../../../public/images/sliderStatue.jpg";
import Woman from "../../../public/images/sliderWomanInLibrary.jpg";
import { Title } from "../common/title/title";
import styles from "./aboutCarousel.module.scss";
import { FormInput } from "../common/formInput/formInput";

const carouselItems = [Woman, Statue, Library, Stairs, OutDoor];

export const AboutCarousel = ({ isCarouselWidth, width }) => {
  const [checked, setChecked] = useState(1);
  const [carouselWidth, setCarouselWidth] = useState("");

  function changeCheckBox({ target }) {
    setChecked(Number(target.value));
  }

  const radioButtonAttributes = [
    {
      type: "radio",
      id: "first",
      name: "pagination",
      checked: checked,
      onChange: changeCheckBox,
      value: 1,
      label: "",
    },
    {
      type: "radio",
      id: "second",
      name: "pagination",
      checked: checked,
      onChange: changeCheckBox,
      value: 2,
      label: "",
    },
    {
      type: "radio",
      id: "third",
      name: "pagination",
      checked: checked,
      onChange: changeCheckBox,
      value: 3,
      label: "",
    },
    {
      type: "radio",
      id: "four",
      name: "pagination",
      checked: checked,
      onChange: changeCheckBox,
      value: 4,
      label: "",
    },
    {
      type: "radio",
      id: "fives",
      name: "pagination",
      checked: checked,
      onChange: changeCheckBox,
      value: 5,
      label: "",
    },
  ];


  useEffect(() => {
    if (isCarouselWidth) {
      switch (checked) {
        case 1:
          setCarouselWidth("0px");
          break;
        case 2:
          setCarouselWidth("-475px");
          break;
        case 3:
          setCarouselWidth("-945px");
          break;
        case 4:
          setCarouselWidth("-1425px");
          break;
        case 5:
          setCarouselWidth("-1900px");
          break;
      }
    } else if (width > 1024 && width < 1440) {
      switch (checked) {
        case 1:
          setCarouselWidth("20px");
          break;
        case 2:
          setCarouselWidth("-290px");
          break;
        case 3:
          setCarouselWidth("-620px");
          break;
      }
    } else {
      switch (checked) {
        case 1:
          setCarouselWidth("30px");
          break;
        case 2:
          setCarouselWidth("-460px");
          break;
        case 3:
          setCarouselWidth("-940px");
          break;
      }
    }
  }, [checked, width, isCarouselWidth]);

  const prevImage = () => {
    if(checked >= 2){
      setChecked((prev) => (prev -= 1));
      console.log(checked);
    }
  };

  const nextImage = () => {
   if(checked <= 4){
      setChecked((prev) => (prev += 1));
    }
    
  };

  return (
    <section className={styles.aboutCarousel} id="carousel">
      <Title>About</Title>
      <p className={styles.aboutCarousel__aboutLibrary}>
        The Brooklyn Library is a free workspace, a large number of books and a
        cozy coffee shop inside
      </p>
      <div className={styles.aboutCarousel__carouselSlider}>
        <div className={styles.slideWrapper}>
          <div
            className={styles.slideWrapper__slide}
            style={{ marginLeft: carouselWidth }}
          >
            {carouselItems.map((item, index) => {
              return <img src={item} key={index + 1} />;
            })}
          </div>
        </div>
        <div
          className={styles.slideWrapper__arrowLeft}
          onClick={prevImage}
        ></div>
        <div
          className={styles.slideWrapper__arrowRight}
          onClick={nextImage}
        ></div>
        <div className={styles.pagination}>
          {isCarouselWidth
            ? radioButtonAttributes.map((item, index) => {
                return (
                  <FormInput
                    label={item.label}
                    key={index + 1}
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    checked={item.checked}
                    onChange={item.onChange}
                    value={item.value}
                  />
                );
              })
            : radioButtonAttributes.slice(0, 3).map((item, index) => {
                return (
                  <FormInput
                    label={item.label}
                    key={index + 1}
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    checked={item.checked}
                    onChange={item.onChange}
                    value={item.value}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
};

// {carouselItems
//   .slice(checked - 1, isCarouselWidth ? checked + 0 : checked + 2)
//   .map((item, index) => {
//     return <img src={item} key={index + 1} />;
//   })}
