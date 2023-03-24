import { GetServerSideProps } from "next";
import axios from "axios";
import { studentsApi } from "@/config/API";
import { DataUser } from "@/types/types";

export default function id ( { student }: { student?: {
    data: DataUser;
} } ) {  

  console.log(student?.data.usuUsername);
  
    

  return (
    <>
      <p>nombre: {student?.data.usuUsername}</p>
      <p>Apellidos: {[student?.data.usuAppMat, " ", student?.data.usuAppPat]}</p>
      <p>correo: {student?.data.usuEmail}</p>
      <p>Rol: {student?.data.usuRole}</p>
      <p>Boleta: {student?.data.usuTicket}</p>
    </>
    
  
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const res = await axios.get(`${studentsApi}/${context.params?.id}`);

  const student = res.data;

  return {
    props: {
      student,
    },
  };
}
