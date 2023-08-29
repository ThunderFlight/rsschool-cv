import styles from "./title.module.scss";

export const Title = ({children, color="rgba(12, 12, 14, 1)", width="50px", height="2px", backgroundColor="rgba(12, 12, 14, 1)", font="Forum", fontSize="40px", fontWeight="400", marginBottom="20px", letterSpacing="2px", lineHeight="40px"}) => {
  return (
    <div className={styles.title}>
      <h2 style={{color:color, fontFamily:font, fontSize:fontSize, fontWeight:fontWeight, marginBottom:marginBottom, letterSpacing:letterSpacing, lineHeight:lineHeight }}>{children}</h2>
      <div style={{backgroundColor:backgroundColor, width:width, height:height}}></div>
    </div>
  );
};
