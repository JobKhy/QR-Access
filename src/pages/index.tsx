import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Formi } from "@/components/form";
import { GetServerSideProps } from "next";
import axios from "axios";
import { studentsApi } from "@/config/API";
import { DataUser } from "@/types/types";

export default function Home({ students }: { students?: DataUser[] }) {
  console.log("Home");
  // console.log(students);

  return (
    <>
      <h1 className={styles.title}>Generate</h1>
      <Formi></Formi>

      <h1 className={styles.title}>List</h1>
      {/* { students?.map(student => (
        <div key={student.usuId}>
          <h3>{student.usuUsername}</h3>
          <p>{student.usuAppPat}</p>
          <p>{student.usuAppMat}</p>
          <p>{student.usuEmail}</p>
          <p>{student.usuRole}</p>
          <p>{student.usuTicket}</p>
        </div>
      ))} */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(studentsApi);
  const students = await res.data;
  // console.log(students);
  return {
    props: {
      students,
    },
  };
};
