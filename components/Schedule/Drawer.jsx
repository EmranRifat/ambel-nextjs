import React, { useEffect, useRef } from "react";
import styles from "../setup.module.css";
const Drawer = (props) => {

  return (
    <React.Fragment>
      <main
        className={
          " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
          (props.isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            `w-[350px] ${styles.scrollbar} overflow-y-scroll max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ` +
            (props.isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          {props.children}
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            props.setIsOpen(false);
          }}
        ></section>
      </main>
    </React.Fragment>
  );
};

export default Drawer;
