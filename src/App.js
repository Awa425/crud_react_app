
import { useState } from 'react';
import './App.css';
import {Button, Table, Modal, Input} from 'antd'; 
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function App() {
  const [isEdit, setIsEdit] = useState(false)
  const [editingContact, setEditingContact] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Awa Diop",
      email: "diop@gmail.com",
      address: "Pikine",
    },
    {
      id: 1,
      name: "Awa Diop",
      email: "diop@gmail.com",
      address: "Pikine",
    },
    {
      id: 2,
      name: "Issa Sarr",
      email: "sarr@gmail.com",
      address: "Touba Toul",
    },
     {
    id: 3,
    name: "Fama Diop",
    email: "diopfama@gmail.com",
    address: "PA",
  },
  ])
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Adresse",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record)=>{
        return(
          <>
          <EditOutlined onClick={()=>{
            onEditContact(record);
          }}/>
          <DeleteOutlined onClick={()=>{
            onDeleteContact(record)
          }} style = {{color: "red", marginLeft: 19,}}/>
          </>
        );
      },
    },

  ];
  const onAddNewContact = ()=>{
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((list) => {
      return [...list, newStudent];
    });

  }
  const onDeleteContact = (record)=>{
    Modal.confirm({
      title: "Voulez-vous vraiment supprimer le contact ?",
      okText: "Oui",
      okType: "danger",
      onOk: () => {
        setDataSource((list)=>{
          return list.filter((contact)=>contact.id !== record.id)
        })
      },
    }); 
  }

  const onEditContact = (record)=>{
    setIsEdit(true)
    setEditingContact({...record})
  }
const resetEditing = ()=>{
  setIsEdit(false)
  setEditingContact(null)
}
  return (
    <div className="App">
       <header className="App-header">
        <Button onClick={onAddNewContact}>Nouveau Contact</Button>
        <Table
         columns={columns}
         dataSource={dataSource}
          ></Table>
          <Modal
           title= "Modifier Contact"
           visible={isEdit}
           onCancel = {()=>{
            resetEditing()
          }}
          okText="save"
          onOk = {()=>{
            setDataSource((pre) => {
              return pre.map((contact) => {
                if (contact.id === editingContact.id) {
                  return editingContact;
                } else {
                  return contact;
                }
              });
            });
            resetEditing()
          }}
          >
           <Input value={editingContact?.name } onChange={(e)=>{
            setEditingContact((list) =>{ return {...list, name:e.target.value}})
           }}/>
           <Input value={editingContact?.email } onChange={(e)=>{
            setEditingContact((list) =>{ return {...list, email:e.target.value}})
           }}/>
           <Input value={editingContact?.address } onChange={(e)=>{
            setEditingContact((list) =>{ return {...list, address:e.target.value}})
           }}/>
             
          </Modal>
      </header>
    </div>
  );
}

export default App;
