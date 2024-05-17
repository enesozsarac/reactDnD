import { Box, Button, Modal, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface ListItem {
  id: string;
  content: string;
}

function App() {
  const [listInput, setListInput] = useState<string>("");
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  const addListItem = () => {
    const listItemId = nanoid();

    const newList = {
      id: listItemId,
      content: listInput,
    };

    setListItems([...listItems, newList]);
    setListInput("");
  };

  // useEffect(() => {
  //   console.log(listItems);
  // }, [listItems]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = [...listItems];
    const [removedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removedItem);
    setListItems(items);
  };

  const handleDelete = (id: string) => {
    setListItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  };

  const handleOpen = (id: string, content: string) => {
    setOpen(true);
    setEditInput(content);
    setSelectedId(id)
  };

  const handleEdit = () => {
    // console.log(selectedId);

    const selectedItem = listItems.filter((item) => item.id == selectedId)
    selectedItem[0].content = editInput
    console.log()

    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "50px",
        }}
      >
        <TextField
          label="Todo"
          color="primary"
          type="text"
          value={listInput}
          onChange={(e) => setListInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addListItem}>
          Ekle
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "50px",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h3>List</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="myCustomList">
              {(provider) => (
                <div {...provider.droppableProps} ref={provider.innerRef}>
                  {listItems.map(({ id, content }: ListItem, index: number) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provider) => (
                          <Box
                            sx={{ width: "750px", fontSize: "1.3rem" }}
                            className="listBox"
                            ref={provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                          >
                            {content}
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <Button
                                sx={{ fontSize: "1.5rem" }}
                                variant="contained"
                                onClick={() => handleOpen(id, content)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                sx={{ fontSize: "1.5rem" }}
                                variant="contained"
                                onClick={() => handleDelete(id)}
                              >
                                <FaTrash />
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleEdit}>
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default App;
