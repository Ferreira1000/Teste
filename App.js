import React,{useState} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';

export default function App() {

   const [isLoggedin, setLoggedinStatus ] = useState(false);
   const [ userData, setUserData ] = useState(null);
   cosnt [isImageLoading, setImageLoadStatus] = useState(false);

   facebookLogIn = async ()  => {
     try {
       await Facebook.initializeAsync({
         appId: '1728174114197898',
       }); 

      const { 
         type,
         token,

       } = await Facebook.logInwithReadPermissionsAsync({
        permissions: ['public_profile'],
       });
       if (type === 'success'  )
       //We are Using facebook graph API
       fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStarus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      }  else {
        // type ==== 'cancel
      }
         catch({message})
       alert(`Facebook Login Error: ${message}`);
      }
      logout = () => {
         setLoggedinStatus(false);
         setUserData(null);
         setImagemLoadStatus(false);
      }
   

   return (
    isLoggedin ?
    userData ?
     <View style={styles.container}>
        <Image
        style={{ width:200, height:200, borderRadius:50}}
        source={{uri:userData.picture.data.url}}
        onLoadEnd={()=>setImageLoadStatus(true)}>
        
        
        </Image>
        <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{position: 'absolut'}}/>
        <Text style={{ fontSize:22,marginVertical:10}}>
           Hi {userData.name}!
        </Text>
        <TouchableOpacity styles={styles.logoutBtn} onPress={ logout}>
           <Text style={{color: '#fff'}}>
            Logout
           </Text>
        </TouchableOpacity>
     </View> 
      : 
      null
     :
      <View style={styles.container}>
      <Image
      style={{width:200, height:200, borderRadius:50, marginVertical:20}} 
      source={requerid("./assets/fb.png")}>
      </Image>
      <TouchableOpacity style={style.loginBT} onPress={facebookLogIn}>
        <Text Style={{ color: '#fff'}}>
        Login With Facebook
        </Text>
      </TouchableOpacity>


     </View>

   );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn:{
    backgroundColor: '#4267b2'
    paddongVertical:10,
    paddingHorizontal:20,
    borderRadius:20,
  },
  logoutBtn:{
    backgroundColor: '#4267b2'
    paddongVertical:10,
    paddingHorizontal:20,
    borderRadius:20,
    position: 'absolute',
    bottom:0,
    margimBotom:200

  }
});
