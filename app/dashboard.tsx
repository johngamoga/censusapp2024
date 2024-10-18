import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database"; // Import initializeDB

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [relation, setRelation] = useState("Select Relation to Head of Household");
  const [province, setProvince] = useState("Select Province");
  const [district, setDistrict] = useState("");
  const [locallevelgovernment, setLLG] = useState("");
  const [ward, setWard] = useState(""); 
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); // Track if updating a person

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !occupation ||
      gender === "Select Gender" ||
      !relation ||
      !province ||
      !district ||
      !locallevelgovernment ||
      !ward
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingPersonId) {
        // Update existing person
        await updatePerson(
          editingPersonId,
          firstName,
          lastName,
          phone,
          email,
          occupation,
          date.toISOString(),
          gender,
          relation,
          province,
          district,
          locallevelgovernment,
          ward
        );
        console.log("Person updated successfully");
      } else {
        // Add new person
        const id = await addPerson(
          firstName,
          lastName,
          phone,
          email,
          occupation,
          date.toISOString(),
          gender,
          relation,
          province,
          district,
          locallevelgovernment,
          ward
        );
        console.log("Person created successfully with ID:", id);
      }
      resetForm();
      fetchPersons(); // Refresh the list
    } catch (error) {
      console.error("Error submitting person:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      console.log("Person deleted successfully");
      fetchPersons(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleUpdateClick = (person: Person) => {
    // Populate the form with the selected person's data
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setPhone(person.phone);
    setEmail(person.email);
    setGender(person.gender);
    setOccupation(person.occupation);
    setDate(new Date(person.date)); // Assuming dateOfBirth is a string
    setRelation(person.relation);
    setProvince(person.province);
    setDistrict(person.district);
    setLLG(person.locallevelgovernment);
    setEditingPersonId(person.id); // Set the ID for updating
  };

  const resetForm = () => {
    // Clear the form after submission or update
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setOccupation("");
    setGender("Select Gender");
    setRelation("Select Relation to Head of Household");
    setProvince("Select Province");
    setDistrict("");
    setLLG("");
    setWard("");
    setDate(new Date());
    setEditingPersonId(null); // Reset ID for creating new entries
  };

  return (
<ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}> 
          <Image source={require('@/assets/images/nationalemblem.png')} style={styles.logo} />
          <Image source={require('@/assets/images/censuslogo.png')} style={styles.logo} />
        </View>
        <Text style={styles.header}>Data Entry Form</Text>

        <TextInput
          style={styles.input}
          placeholder="First and Middle Name here"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name here"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter valid Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter valid Email address here"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="State Occupation"
          value={occupation}
          autoCapitalize="none"
          onChangeText={setOccupation}
          placeholderTextColor="#888"
        />

        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Gender"} value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <Picker
          selectedValue={relation}
          onValueChange={(itemValue) => setRelation(itemValue)}
          style={styles.picker}
          >
          <Picker.Item label={"--Select Relation to Household--"} />
          <Picker.Item label="Head of Household" value="head" />
          <Picker.Item label="Husband" value="husband" />
          <Picker.Item label="Wife" value="wife" />
          <Picker.Item label="Unmarried Child" value="uchild" />
          <Picker.Item label="Married Sons/Daughters" value="female" />
          <Picker.Item label="Other Relatives" value="other" />
          <Picker.Item label="Non-Relative/Visitor" value="visitor" />
        </Picker>
        <Picker
selectedValue={province}
onValueChange={(itemValue) => setProvince(itemValue)}
style={styles.picker}
>
<Picker.Item label={"--Select Province--"} />
<Picker.Item label="Autonomous Region of Bougainville" value="autonomousregionofbougainville" />
<Picker.Item label="Central" value="central" />
<Picker.Item label="East New Britain" value="eastnewbritain" />
<Picker.Item label="Eastern Highlands" value="easternhighlands" />
<Picker.Item label="East Sepik" value="eastsepik" />
<Picker.Item label="Enga" value="enga" />
<Picker.Item label="Gulf" value="gulf" />
<Picker.Item label="Hela" value="hela" />
<Picker.Item label="Jiwaka" value="jiwaka" />
<Picker.Item label="Madang" value="madang" />
<Picker.Item label="Manus" value="manus" />
<Picker.Item label="Milne Bay" value="milnebay" />
<Picker.Item label="Morobe" value="morobe" />
<Picker.Item label="National Capital District" value="nationalcapitaldistrict" />
<Picker.Item label="New Ireland" value="newireland" />
<Picker.Item label="Oro (Northern)" value="oro" />
<Picker.Item label="Simbu" value="simbu" />
<Picker.Item label="Southern Highlands" value="southernhighlands" />
<Picker.Item label="Western" value="western" />
<Picker.Item label="Western Highlands" value="westernhighlands" />
<Picker.Item label="West New Britain" value="westnewbritain" />
<Picker.Item label="West Sepik (Sandaun)" value="westsepik" />
</Picker>

<TextInput
style={styles.input}
placeholder="State District"
value={district}
onChangeText={setDistrict}
autoCapitalize="none"
placeholderTextColor="#888"
/>
<TextInput
style={styles.input}
placeholder="State Local Level Government (LLG)"
value={locallevelgovernment}
onChangeText={setLLG}
autoCapitalize="none"
placeholderTextColor="#888"
/>
<TextInput
style={styles.input}
placeholder="State Ward"
value={ward}
onChangeText={setWard}
autoCapitalize="none"
placeholderTextColor="#888"
/>

        <View>
          <Button
            title="Select Date of Birth"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.dateText}>
            Date of Birth: {date.toDateString()}
          </Text>
        </View>

        <Button
          title={selectedPerson ? "Update" : "Submit"}
          onPress={handleSubmit}
        />

        {/* Table to display records */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>First Name</Text>
            <Text style={styles.tableHeaderText}>Last Name</Text>
            <Text style={styles.tableHeaderText}>Phone</Text>
            <Text style={styles.tableHeaderText}>Email</Text>
            <Text style={styles.tableHeaderText}>Occupation</Text>
            <Text style={styles.tableHeaderText}>Gender</Text>
            <Text style={styles.tableHeaderText}>Date of Birth</Text>
            <Text style={styles.tableHeaderText}>Relation</Text>
            <Text style={styles.tableHeaderText}>Province</Text>
            <Text style={styles.tableHeaderText}>District</Text>
            <Text style={styles.tableHeaderText}>LLG</Text>
            <Text style={styles.tableHeaderText}>Ward</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          {persons.map((person) => (
            <View key={person.id} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{person.firstName}</Text>
              <Text style={styles.tableRowText}>{person.lastName}</Text>
              <Text style={styles.tableRowText}>{person.phone}</Text>
              <Text style={styles.tableRowText}>{person.email}</Text>
              <Text style={styles.tableRowText}>{person.occupation}</Text>
              <Text style={styles.tableRowText}>{person.gender}</Text>
              <Text style={styles.tableRowText}>
                {new Date(person.date).toDateString()}
              </Text>
              <Text style={styles.tableRowText}>{person.relation}</Text>
              <Text style={styles.tableRowText}>{person.province}</Text>
              <Text style={styles.tableRowText}>{person.district}</Text>
              <Text style={styles.tableRowText}>{person.locallevelgovernment}</Text>
              <Text style={styles.tableRowText}>{person.ward}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdateClick(person)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(person.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffde21",
    textAlign: "center",
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row", // Align logos horizontally
    justifyContent: "space-around", // Space between logos
    marginBottom: 30, // Space between logos and header
  },
  logo: {
    width: 140, // Adjust width as needed
    height: 150, // Adjust height as needed
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  personContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#F44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default Dashboard;
