import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { addDoc, collection, onSnapshot,  query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
export interface Todo {
    done: boolean;
    id: string;
    title: string;
    age: string;
};
interface RouterProps {
    navigation: NavigationProp<any, any>;
};
const List = ({navigation}: RouterProps) => {
        const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');
    const [age, setAge] = useState('');
    const user = FIREBASE_AUTH.currentUser;

    const addTodo = async () => {
     try {
        const docref = await addDoc(collection(FIRESTORE_DB, 'todos'), {
            title: todo,
            age: age,
            done: false,
        });
        setTodo('');
        setAge('');
        console.log('Document written with ID', docref.id);
     } catch (error) {
        console.error('Error adding document:', error);
     }
    };

   useEffect(() => {
	const todoRef = collection(FIRESTORE_DB, 'todos');

	const subscriber = onSnapshot(todoRef, {
		next: (snapshot) => {
			const todos: any[] = [];
			snapshot.docs.forEach((doc) => {
				todos.push({
					id: doc.id,
					...doc.data()
				});
			});
			setTodos(todos);
		}
	});

	// // Unsubscribe from events when no longer in use
	return () => subscriber();
}, []);
  const renderTodo = ({item}: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
        const toggleDone = async () => {
            updateDoc(ref, {done: !item.done });
        };
        const deleteItem = async () => {
            deleteDoc(ref);
        };
     
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Text>✅</Text>}
                     {!item.done && <Text>❌</Text>}
                     <Text style={styles.todoText}>{item.title}</Text>
                     <Text style={styles.todoText}>Age: {item.age}</Text>
                </TouchableOpacity>
                <Button title="🗑️" onPress={deleteItem}/>
            </View>
        );
    };
  return (
    
    <View style={{backgroundColor: "#e046159c", height: 900}} >
   
        <View style={{height: 200, padding: 9, paddingTop: 40, backgroundColor: "#009688"}}>   
         <Text style={{fontSize: 16, textAlign: 'center', color: 'white', top: -6}}>Input Group 2 members here</Text>       
           <TextInput
            style={styles.input}
            placeholder=' Groupmate Full name:'
            value={todo}
            onChangeText={(text: string) => setTodo(text)}
            />
              <TextInput
            style={styles.input}
            placeholder='Age:'
            value={age}
            onChangeText={(text: string) => setAge(text)}
            />
            
            <Button color={"#f2744c"} onPress={addTodo} title='Add ➕' disabled={todo === ''}/>
        </View>
        
        	{todos.length > 0 && (
			<View >
				<FlatList
					data={todos}
					renderItem={renderTodo}
					keyExtractor={((todo) => todo.id)}
                    
					// removeClippedSubviews={true}
				/>
                <Text style={{margin: 10, color: "white"}}><Text>User Logged in as: </Text>{user.email}</Text>
			</View>
		)}
     
        <View style={{position: "absolute", top: 0, left: 320}}>
             
         {/* <Button onPress={() => navigation.navigate('details')} title='Open Details'/> */}
      <Button color={"#f2744c"} onPress={() => FIREBASE_AUTH.signOut()} title='Log out'/>
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20
	},
	form: {
		marginVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
        
	},
	input: {
		flex: 1,
		height: 40,
	
		borderRadius: 3,
		padding: 6,
        marginBottom: 2,
		backgroundColor: '#fff',
        
	},
    todo: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	todoText: {
		flex: 1,
		paddingHorizontal: 4
	},
	todoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
        margin: 3,
        borderRadius: 5,
		marginVertical: 4
	},
    textCenter: {
        textAlign: 'center',
        margin: 4,
    },

});
export default List;