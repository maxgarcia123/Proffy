import React from 'react';

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
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
}

 const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function createNewConnetion(){
      api.post('connections',{
        user_id: teacher.id,
      })
    }

    return(
        <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name}/>
         <div>
        <strong>{teacher.name}</strong>
           <span>{teacher.subject}</span>
         </div>
        </header>
        <br/>
         <p>
           {teacher.bio}
         </p>
         <footer>
           <p>
             Preço/Hora
            <strong>R$ {teacher.cost}</strong>
           </p>
            <a target="blank" onClick={createNewConnetion} href={` https://wa.me/${teacher.whatsapp}`}><img src={whatsappIcon} alt="contato"/> Entrar em contato</a>
         </footer>
     </article>
    )
}

export default TeacherItem