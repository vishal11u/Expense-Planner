import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce-backend-three-eta.vercel.app/api/notes"
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) return;
    setLoading(true);
    try {
      if (currentNote.id) {
        await axios.put(
          `https://ecommerce-backend-three-eta.vercel.app/api/notes/${currentNote.id}`,
          {
            title: currentNote.title,
            message: currentNote.content,
          }
        );
      } else {
        await axios.post(
          "https://ecommerce-backend-three-eta.vercel.app/api/notes",
          {
            title: currentNote.title,
            message: currentNote.content,
          }
        );
      }
      fetchNotes();
      setModalVisible(false);
      setCurrentNote({ id: null, title: "", content: "" });
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://ecommerce-backend-three-eta.vercel.app/api/notes/${id}`
      );
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={[styles.noteCard, { backgroundColor: getRandomColor() }]}
      onPress={() => {
        setCurrentNote({
          id: item._id,
          title: item.title || "",
          content: item.message,
        });
        setModalVisible(true);
      }}
    >
      <View style={styles.noteIconContainer}>
        <Image source={{ uri: getRandomIcon() }} style={styles.noteIcon} />
      </View>
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{item.title || "Untitled"}</Text>
        <Text style={styles.notePreview} numberOfLines={2}>
          {item.message}
        </Text>
        <View style={styles.noteFooter}>
          <Text style={styles.noteDate}>4 mins</Text>
          <Text style={styles.noteDate}>14-08-2023</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getRandomColor = () => {
    const colors = ["#E6E6FA", "#FFE4E1", "#E0FFFF", "#F0FFF0", "#FFF0F5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomIcon = () => {
    const icons = [
      "https://via.placeholder.com/150/0000FF/808080?Text=Note1",
      "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Note2",
      "https://via.placeholder.com/150/FFFF00/000000?Text=Note3",
      "https://via.placeholder.com/150/00FF00/000000?Text=Note4",
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Notes</Text>
        <Text style={styles.noteCount}>{notes.length} Notes</Text>
      </View>

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.notesList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setCurrentNote({ id: null, title: "", content: "" });
          setModalVisible(true);
        }}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveNote}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.titleInput}
            value={currentNote.title}
            onChangeText={(text) =>
              setCurrentNote({ ...currentNote, title: text })
            }
            placeholder="Title"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.contentInput}
            value={currentNote.content}
            onChangeText={(text) =>
              setCurrentNote({ ...currentNote, content: text })
            }
            placeholder="Type something..."
            placeholderTextColor="#999"
            multiline
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  noteCount: {
    fontSize: 16,
    color: "#007AFF",
  },
  notesList: {
    padding: 16,
  },
  noteCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  noteIcon: {
    width: 30,
    height: 30,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notePreview: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteDate: {
    fontSize: 12,
    color: "#999",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  saveButton: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    textAlignVertical: "top",
  },
});

export default Notes;
