import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';
import api from '../../services/api';

export interface Teacher {  
    avatar: string;
    bio: string
    cost: number;
    id: number;
    name: string;
    subject: string;
    user_id: number;
    whatsapp: string;
}

 interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorite, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections',{
            user_id: teacher.id,
        })
        Linking.openURL(`whatsapp://send?phone${teacher.whatsapp}`)
    }


  async function handleToggleFavotite(){
    const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if(favorites) {
            favoritesArray = JSON.parse(favorites);
        }

            if(isFavorite){
                 const favoriteIndex = favoritesArray.findIndex((teacherItem : Teacher) => {
                     return teacherItem.id === teacher.id
                 });
                 favoritesArray.splice(favoriteIndex, 1)

                 setIsFavorited(false);
            } else{
                favoritesArray.push(teacher);

                setIsFavorited(true);
                
            }
            await AsyncStorage.setItem( 'favorites' , JSON.stringify(favoritesArray));
        }
    

    return (
       <View style={styles.container} >
           <View style={styles.profile}>
               <Image style={styles.avatar} source={{ uri:'https://avatars0.githubusercontent.com/u/53496471?s=460&u=e19977bf828848f09c0fc588406670ef40f30125&v=4' }}/>
               
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
           </View>

           <Text style={styles.bio}>
             {teacher.bio}
           </Text>

           <View style={styles.footer}>
                <Text style={styles.price}>
                   Preço/hora {'   '}
                   <Text style={styles.priceValue}>{teacher.cost}</Text> 
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton 
                      onPress={handleToggleFavotite}
                      style={[
                           styles.favoriteButton,
                           isFavorite ? styles.favorited : {},
                           ]}>
                        { isFavorite 
                            ?   <Image source={unfavoriteIcon} />
                            :   <Image source={heartOutlineIcon}/> 
                         }
                       
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
           </View>
       </View>
    );
}

export default TeacherItem;