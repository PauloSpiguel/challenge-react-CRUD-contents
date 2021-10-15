
import { IPost } from "../../types/IPost"

import { format } from "date-fns";
import { pt } from 'date-fns/locale';


import "./styles.css"

interface PostProps {
  data: IPost;
  onDelete: (id: string) => void;
  onClickUpdate: (id: string) => void;
}

const Post = ({ data, onDelete, onClickUpdate }: PostProps) => {

  const formattedDate = (date: string | undefined) => {

    if (!date) return null

    const dateObj = new Date(date);
    return format(dateObj, "PP", { locale: pt });
  };

  return (
    <tr className="container" onClick={() => onClickUpdate(data.id)}>
      <td>{data.title}</td>
      <td>{data.author}</td>
      <td>{data.relationship_content}</td>
      <td>{formattedDate(data?.created_at)}</td>
      <td>
        <button type="button" onClick={() => onClickUpdate(data.id)}>Editar</button>
        <button type="button" style={{ marginLeft: "5px" }} onClick={() => onDelete(data?.id)}>Excluir</button>
      </td>
    </tr>
  )
}

export default Post


/*  <li className="container">
      <p>{data.title}</p>
      <p>{data.relationchip_content}</p>
      <p>{data.author}</p>
      <button type='button' onClick={() => onDelete(data.id)}>Delete</button>
    </li> */