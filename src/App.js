import logo from "./logo.svg";
import "./App.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import {
  ChakraProvider,
  CSSReset,
  Tabs,
  Select,
  useToast,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Textarea,
  Spinner,
} from "@chakra-ui/react";

const EXCHANGE_RATES = gql`
  query MyQuery {
    firstapp {
      id
      name
      father_name
      age
    }
  }
`;

export const DETELE_FIRSTAPP = gql`
  mutation ($id: Int!) {
    delete_firstapp_by_pk(id: $id) {
      id
    }
  }
`;

const ADD_FIRSTAPP = gql`
  mutation AddTodo($text: String!) {
    addFirstapp(text: $text) {
      id
      name
      father_name
      age
    }
  }
`;

export const ADD_DATA = gql`
  mutation insert_firstapp($object: firstapp_insert_input!) {
    insert_firstapp_one(object: $object) {
      id
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(EXCHANGE_RATES);
  const [
    addTodo,
    { loading: addLoading, error: mutationError, data: mutationData },
  ] = useMutation(ADD_DATA);
  const [record, setRecord] = useState({
    name: "",
    fname: "",
    age: 0,
  });

  const changeName = (event) => {
    const i = { ...record };
    i.name = event.target.value;
    setRecord({ ...i });
  };

  const changeFname = (event) => {
    const i = { ...record };
    i.fname = event.target.value;
    setRecord({ ...i });
  };

  const changeAge = (event) => {
    const i = { ...record };
    i.age = event.target.value;
    setRecord({ ...i });
  };

  const [
    deleteMuation,
    { loading: deletingFirstapp, error: deleteFirstappError },
  ] = useMutation(DETELE_FIRSTAPP);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  function deleteFirstapp(id) {
    console.log("this is a nice log:", id);
    deleteMuation({
      variables: { id: id },
    })
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveTodo() {
    console.log({ record });

    let temp = {
        name: record.name,
        father_name: record.fname,
        age: record.age
    }

    addTodo({
        variables: {
          object: temp
        }
      }).then(res => {
        console.log("added sucessfully  ", res);
        refetch()
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  }

  return (
    <Stack bg="F5F5F5" h="100%" w="100%" p="20%">
      <Table>
        <Thead>
          <Tr>
            <Th>index</Th>
            <Th>Name</Th>
            <Th>Father's Name</Th>
            <Th>Age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.firstapp.map((res) => (
            <Tr>
              <Td>{res.id}</Td>
              <Td>{res.name}</Td>
              <Td>{res.father_name}</Td>
              <Td>{res.age}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => deleteFirstapp(res.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Stack>
        <FormControl id="name">
          <Grid templateColumns="repeat(9, 1fr)">
            <GridItem colSpan={2} h="10">
              <FormLabel fontSize={11} mt={2} textAlign="right">
                Name{" "}
              </FormLabel>
            </GridItem>

            <GridItem colStart={3} colEnd={9} h="10">
              <Input
           type="text"
           borderWidth="1px"
           onChange={changeName.bind(this)}
           rounded={0}
           borderColor={"gray.400"}
           value={record.name}
         />
       </GridItem>
     </Grid>
   </FormControl>

   <FormControl id="fname">
     <Grid templateColumns="repeat(9, 1fr)">
       <GridItem colSpan={2} h="10">
         <FormLabel fontSize={11} mt={2} textAlign="right">
           Father's Name{" "}
         </FormLabel>
       </GridItem>

       <GridItem colStart={3} colEnd={9} h="10">
         <Input
           type="text"
           borderWidth="1px"
           onChange={changeFname.bind(this)}
           rounded={0}
           borderColor={"gray.400"}
           value={record.fname}
         />
       </GridItem>
     </Grid>
   </FormControl>

   <FormControl id="fname">
     <Grid templateColumns="repeat(9, 1fr)">
       <GridItem colSpan={2} h="10">
         <FormLabel fontSize={11} mt={2} textAlign="right">
           Age{" "}
         </FormLabel>
       </GridItem>

       <GridItem colStart={3} colEnd={9} h="10">
         <Input
           type="number"
           borderWidth="1px"
           onChange={changeAge.bind(this)}
           rounded={0}
           borderColor={"gray.400"}
           value={record.age}
         />
       </GridItem>
     </Grid>
   </FormControl>
   <Button colorScheme="blue" onClick={saveTodo} isLoading={addLoading}>
     {" "}
     Add{" "}
   </Button>
 </Stack>
</Stack>
);
}

export default App;